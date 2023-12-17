#include <stdio.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/key_codes.h>
#include <yutovo_editor/document.h>
#include "web_window.h"
#include "command_map.h"

using emscripten::val;
using namespace yutovo;

yutovo::DocumentPtr document;
std::atomic_bool set_document_point;
yutovo::Point document_point{false};
yutovo::Size last_document_size;
yutovo::Point last_document_point;
yutovo::Point left_click_pos;

std::u32string clipboard_json, clipboard_text;
std::string clipboard_image;

std::u32string document_text;

std::u32string save_json;

SDL_Window *canvas_window = nullptr;
SDL_Renderer* renderer = nullptr;
SDL_Surface* surface = nullptr;

std::queue<yutovo::ElementId> translate_tasks;

extern "C" EMSCRIPTEN_KEEPALIVE bool CanCopy();
extern "C" EMSCRIPTEN_KEEPALIVE bool CanPaste();
extern "C" EMSCRIPTEN_KEEPALIVE bool CanCut();

EM_JS(void, UpdateScrollBars, (int h_size, int v_size, int h_value, int v_value), 
    {
        var scroll_space = document.getElementById('scroll-space');
        scroll_space.style.width = h_size + "px";
        scroll_space.style.height = "calc(" + v_size + "px + 2em)";
        var scroll_container = document.getElementById('scroll-container');
        scroll_container.scrollLeft = h_value;
        scroll_container.scrollTop = v_value;
    });

EM_JS(void, UpdateStantardToolbar, (const char* paragraph_format, size_t paragraph_format_size, const char* font_family, size_t font_family_size, 
    unsigned int font_size, int bold, int italic, int underline, const char* text_color, size_t text_color_size, 
    const char* text_bg_color, size_t text_bg_color_size),
    {
        window.dispatchEvent(new CustomEvent('setStandardToolbar', 
            {
                'detail': 
                {
                    'paragraph_format': UTF8ToString(paragraph_format, paragraph_format_size),
                    'font_family': UTF8ToString(font_family, font_family_size),
                    'font_size': font_size,
                    'bold': bold, 
                    'italic': italic, 
                    'underline': underline,
                    'text_color': UTF8ToString(text_color, text_color),
                    'text_bg_color': UTF8ToString(text_bg_color, text_bg_color),
                }
            }));
    });

EM_JS(void, UpdateIdentifiersTree, (unsigned int code_id, const char* solver_guid, size_t solver_guid_size),
    {
        window.dispatchEvent(new CustomEvent('updateIdentifiersTree', 
            {
                'detail': 
                {
                    'code_id': code_id,
                    'solver_guid': solver_guid == 0 ? "" : UTF8ToString(solver_guid, solver_guid_size)
                }
            }));
    });

EM_JS(void, SaveDocument, (const char* json, size_t json_size),
    {
        window.dispatchEvent(new CustomEvent('saveDocument', 
            {
                'detail': 
                {
                    'json': UTF8ToString(json, json_size)
                }
            }));
    });

EM_JS(void, TranslateString, (const char* str, size_t str_size),
    {
        window.dispatchEvent(new CustomEvent('translateString', 
            {
                'detail': 
                {
                    'str': UTF8ToString(str, str_size)
                }
            }));
    });

EM_JS(void, UpdateLanguage, (),
    {
        window.dispatchEvent(new CustomEvent('updateLanguage', 
            {
                'detail': 
                {
                }
            }));
    });

void MainLoop(void* arg)
{
    yutovo_web::WebWindow* window = (yutovo_web::WebWindow*)arg;
    if (set_document_point)
    {
        window->document_point = document_point;
        set_document_point = false;
    }

    if (window->update_toolbar)
    {
        window->update_toolbar = false;

        const CaretState& c = window->current_editor_state.caret_state;
        const SelectionState& s = window->current_editor_state.selection_state;
        StringFormat format;
        ParagraphFormat paragraph_format;

        //find common paragraph format
        document->GetParagraphFormat(c.id, paragraph_format);
        for (auto& state : s.state)
        {
            ParagraphFormat p;
            if (document->GetParagraphFormat(c.id, p))
            {
                if (p.name != paragraph_format.name)
                {
                    paragraph_format.name = "";
                    break;
                }
            }
        }

        //find common string format
        if (c.id.empty() || (c.id.size() == 1))
            return;
        ElementId _id = GetParent(c.id);
        if (!document->IsString(document->GetElement(_id)) && !document->IsRow(document->GetElement(_id)))
        {
            format.Reset();

            UpdateStantardToolbar(paragraph_format.name.c_str(), paragraph_format.name.size(), format.family.c_str(), format.family.size(), 
                format.size, -1, -1, -1, "", 0, "", 0);
        }
        else if (document->GetStringFormat(_id, format))
        {
            auto text_color = format.text_color.ToHex();
            auto text_bg_color = format.text_bg_color.ToHex();
            for (auto& state : s.state)
            {
                for (int i = state.start; i < state.start + state.size; ++i)
                {
                    ElementId _id = GetChild(state.id, i);
                    StringFormat f;
                    document->GetStringFormat(_id, f);
                    if (format.family != "" && format.family != f.family)
                        format.family = "";
                    if (format.size != 0 && format.size != f.size)
                        format.size = 0;
                    if (format.bold != false && format.bold != f.bold)
                        format.bold = false;
                    if (format.italic != false && format.italic != f.italic)
                        format.italic = false;
                    if (format.underline != false && format.underline != f.underline)
                        format.underline = false;
                }
            }

            UpdateStantardToolbar(paragraph_format.name.c_str(), paragraph_format.name.size(), format.family.c_str(), format.family.size(), 
                format.size, format.bold, format.italic, format.underline, text_color.c_str(), text_color.size(), 
                text_bg_color.c_str(), text_bg_color.size());
        }
        
        static uint last_code_id = 0;
        uint code_id = document->FindCodeBlock(_id);
        if (code_id == 0)
        {
            UpdateIdentifiersTree(0, NULL, 0);
        }
        else if (last_code_id != code_id)
        {
            std::string guid;
            document->GetSolverGuid(guid);
            UpdateIdentifiersTree(code_id, guid.c_str(), guid.size());
        }
        last_code_id = code_id;
    }

    if (window->needs_render)
    {
        //document was updated
        window->Render(renderer, surface);

        //update scrollbars
        yutovo::Rect r = window->GetViewPort(0);
        yutovo::Size s = window->document_size;
        s.height += 1;
        yutovo::Point p = window->document_point;
        if ((last_document_size != s) || (last_document_point != p))
        {
            UpdateScrollBars(s.width + r.left, s.height + r.top, p.x, p.y);
            last_document_size = s;
            last_document_point = p;
        }
    }

    if (window->save_ready)
    {
        std::string s = ToBasicString(save_json);
        SaveDocument(s.c_str(), s.size());
        window->save_ready = false;
    }

    if (window->needs_translate)
    {
        std::vector<std::pair<yutovo::ElementId, std::string>> t;
        window->GetTranslateTasks(t);
        for (auto& p : t)
        {
            translate_tasks.push(p.first);
            TranslateString(p.second.c_str(), p.second.size());
        }
        window->needs_translate = false;
    }

    if (window->update_language)
    {
        UpdateLanguage();
        window->update_language = false;
    }

    window->SocketTasks();
}

struct EventArgs
{
    yutovo_web::ShortcutsMap* shortcuts_map;
    yutovo::Document* document;
    yutovo_web::WebWindow* window;
};

int CharsNumber(const char *str)
{
    if (!str)
        return 0;
    int num_chars = 0;
    while(*str)
    {
        if ((*str++ & 0xC0) != 0x80)
            ++num_chars; // Skip all continuation bytes
    }
    return num_chars;
}

EM_BOOL OnKeyDown(int event_type, const EmscriptenKeyboardEvent* key_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    yutovo_web::KeySequence s(key_event->keyCode, key_event->ctrlKey, key_event->shiftKey, key_event->altKey);
    char32_t ch = 0;
    if (CharsNumber(key_event->key) == 1)
        ch = key_event->key[0];
    if (args->shortcuts_map->Call(s, ch, args->window->current_editor_state))
        return true;
    if (ch != 0)
    {
        args->document->InsertString(key_event->key, true);
        return true;
    }
    return false;
}

EM_JS(void, SetCursor, (int type), 
    {
        var scroll_container = document.getElementById('scroll-container');
        scroll_container.style.cursor = (type == 1 ? 'text' : 'default');
    });

EM_BOOL OnMouseMove(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    auto p = args->window->GetDocumentPoint();
    yutovo_web::ElementId id;
    args->document->GetElementAtCoords(mouse_event->targetX + p.x, mouse_event->targetY + p.y, id);
    if (args->document->IsString(id))
        SetCursor(1);
    else
        SetCursor(0);
    if (mouse_event->buttons == 1)
    {
        //selection with mouse
        args->document->Select(left_click_pos.x, left_click_pos.y, mouse_event->targetX + p.x, mouse_event->targetY + p.y);
    }
    return false;
}

EM_BOOL OnMouseDown(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    EditorState s = args->document->GetEditorState();
    auto p = args->window->GetDocumentPoint();
    if (mouse_event->button == 0 || (mouse_event->button == 2 && s.selection_state.IsEmpty()))
    {
        args->document->MoveCaret(mouse_event->targetX + p.x, mouse_event->targetY + p.y);
    }
    if (mouse_event->button == 0)
    {
        //start selection with mouse
        left_click_pos = Point{mouse_event->targetX + p.x, mouse_event->targetY + p.y};
    }
    return false;
}

EM_BOOL OnResize(int event_type, const EmscriptenUiEvent* ui_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;

    int width = 0, height = 0, f = 0;
    emscripten_get_canvas_size(&width, &height, &f);

    if (surface)
        SDL_FreeSurface(surface);
    surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    if (!surface)
    {
        printf("SDL_CreateRGBSurface error: %s\n", TTF_GetError());
        return 0;
    }

    args->document->Resize(width, height);
    return true;
}

extern "C" EMSCRIPTEN_KEEPALIVE int OnScroll(int x_pos, int y_pos)
{
    if (document)
    {
        document_point = yutovo::Point{x_pos, y_pos};
        set_document_point = true;
        document->Redraw();
    }
    return 0;
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFocusIn()
{
    if (document)
        document->SetCaretVisible(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFocusOut()
{
    if (document)
        document->SetCaretVisible(false);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnNew()
{
    if (document)
        document->New();
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnOpen(const char* json)
{
    if (document)
        document->LoadJson(ToUtfString(std::string(json)));
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSave()
{
    if (document)
    {
        save_json = U"";
        document->SaveJson(save_json);
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnUndo()
{
    if (document)
        document->Undo();
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnRedo()
{
    if (document)
        document->Redo();
}

EM_JS(void, CopyJs, (), 
    {
        window.dispatchEvent(new CustomEvent('onCopy', {}));
    });

EM_JS(void, PasteJs, (), 
    {
        window.dispatchEvent(new CustomEvent('onPaste', {}));
    });

EM_JS(void, CutJs, (), 
    {
        window.dispatchEvent(new CustomEvent('onCut', {}));
    });

void Copy()
{
    if (CanCopy())
        CopyJs();
}

void Paste()
{
    if (CanPaste())
        PasteJs();
}

void Cut()
{
    if (CanCut())
        CutJs();
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnCut()
{
    if (!document)
        return;
    uint t = document->Cut(clipboard_json, clipboard_text);
    document->WaitTask(t);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnCopy()
{
    if (!document)
        return;
    uint t = document->Copy(clipboard_json, clipboard_text);
    document->WaitTask(t);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPaste()
{
    if (!document)
        return;
    if (!clipboard_json.empty())
    {
        document->Paste(clipboard_json);
        clipboard_json = U"";
    }
    else if (!clipboard_text.empty())
    {
        document->PasteText(std::move(clipboard_text));
        clipboard_text = U"";
    }
    else if (!clipboard_image.empty())
    {
        document->PasteImage(clipboard_image, 0, 0);
        clipboard_image = "";
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE char* GetClipboardText()
{
    return (char*)clipboard_text.c_str();
}

extern "C" EMSCRIPTEN_KEEPALIVE char* GetClipboardJson()
{
    return (char*)clipboard_json.c_str();
}

extern "C" EMSCRIPTEN_KEEPALIVE void SetClipboardText(const char* value)
{
    clipboard_text = ToUtfString(value);
}

extern "C" EMSCRIPTEN_KEEPALIVE void SetClipboardJson(const char* value)
{
    clipboard_json = ToUtfString(value);
}

extern "C" EMSCRIPTEN_KEEPALIVE void SetClipboardImage(const char* value)
{
    clipboard_image = value;
    size_t p = clipboard_image.find("base64,");
    clipboard_image = clipboard_image.substr(p + 7);
}

extern "C" EMSCRIPTEN_KEEPALIVE void InsertFunction(const char* str)
{
    document->InsertFunction(str, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void InsertString(const char* str)
{
    document->InsertString(str, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE bool CanUndo()
{
    return document->CanUndo();
}

extern "C" EMSCRIPTEN_KEEPALIVE bool CanRedo()
{
    return document->CanRedo();
}

extern "C" EMSCRIPTEN_KEEPALIVE bool CanCopy()
{
    EditorState s = document->GetEditorState();
    return !s.selection_state.IsEmpty();
}

extern "C" EMSCRIPTEN_KEEPALIVE bool CanPaste()
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty() || s.caret_state.id.size() == 1)
        return false;
    return document->IsEditable(yutovo::GetParent(s.caret_state.id));
}

extern "C" EMSCRIPTEN_KEEPALIVE bool CanCut()
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty() || s.caret_state.id.size() == 1)
        return false;
    return document->IsEditable(yutovo::GetParent(s.caret_state.id));
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnCode()
{
    if (!document)
        return;
    document->InsertCode(false, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPlus()
{
    if (!document)
        return;
    document->InsertPlus(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnMinus()
{
    if (!document)
        return;
    document->InsertMinus(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnMultiply()
{
    if (!document)
        return;
    document->InsertMultiply(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnDivision()
{
    if (!document)
        return;
    document->InsertDivision(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPower()
{
    if (!document)
        return;
    document->InsertPower(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSqrt()
{
    if (!document)
        return;
    document->InsertSquareRoot(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnNthRoot()
{
    if (!document)
        return;
    document->InsertNthRoot(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSubscript()
{
    if (!document)
        return;
    document->InsertSubscript(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFences()
{
    if (!document)
        return;
    document->InsertFences(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnAssignment()
{
    if (!document)
        return;
    document->InsertAssignment(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnEquation()
{
    if (!document)
        return;
    document->InsertEquation(ResultType::AUTO, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnParagraphFormat(const char* paragraph_format)
{
    if (!document)
        return;
    document->SetCurrentParagraphFormat(paragraph_format);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFontFamily(const char* font_family)
{
    if (!document)
        return;
    document->SetFontFamily(font_family);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFontSize(const char* font_size)
{
    if (!document)
        return;
    int s;
    try
    {
        s = std::stoi(font_size);
    }
    catch (...)
    {
        return;
    }
    document->SetFontSize(s);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnBold(int checked)
{
    if (!document)
        return;
    document->SetBold(checked);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnItalic(int checked)
{
    if (!document)
        return;
    document->SetItalic(checked);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnUnderline(int checked)
{
    if (!document)
        return;
    document->SetUnderline(checked);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTextColor(const char* color)
{
    if (!document)
        return;
    document->SetColor(yutovo::Color::FromHex(color));
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTextBgColor(const char* color)
{
    if (!document)
        return;
    document->SetBgColor(yutovo::Color::FromHex(color));
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTaskFile(const char* file_name)
{
    auto s = ToUtfString(file_name);
    document->LoadJson(s);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnLanguage(const char* language)
{
    auto s = ToUtfString(language);
    if (s == U"\"en\"")
        document->SetLanguage(yutovo_calculator::Language::English);
    else if (s == U"\"ru\"")
        document->SetLanguage(yutovo_calculator::Language::Russian);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTranslate(const char* str)
{
    assert(translate_tasks.size() > 0);
    document->InsertString(str, translate_tasks.front(), false);
    translate_tasks.pop();
}

extern "C" EMSCRIPTEN_KEEPALIVE char* GetText()
{
    document_text = document->ToText();
    return (char*)document_text.c_str();
}

int main(int argc, char* argv[])
{
    printf("Start\n");

    SDL_Init(SDL_INIT_EVERYTHING);

    val doc = val::global("document");
    val canvas = doc.call<val>("getElementById", std::string("canvas"));
    int width = 0, height = 0, f = 0;
    emscripten_get_canvas_size(&width, &height, &f);
    
    SDL_SetHint(SDL_HINT_EMSCRIPTEN_KEYBOARD_ELEMENT, "#canvas");

    SDL_Window *w = SDL_CreateWindow("", 0, 0, width, height, 
        SDL_WINDOW_INPUT_FOCUS | SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE | SDL_WINDOW_MOUSE_FOCUS);
    if (!w)
    {
        printf("SDL_CreateWindow error: %s\n", TTF_GetError());
        return 0;
    }
    renderer = SDL_CreateRenderer(w, -1, SDL_RENDERER_ACCELERATED);
    if (!renderer)
    {
        printf("SDL_CreateRGBSurface error: %s\n", TTF_GetError());
        return 0;
    }
    emscripten_get_canvas_size(&width, &height, &f);
    surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    if (!surface)
    {
        printf("SDL_CreateRGBSurface error: %s\n", TTF_GetError());
        return 0;
    }

    canvas.call<void>("focus");

    yutovo_web::WebWindow window;
    document.reset(new yutovo::Document(&window));
    yutovo::Config config;
    document->Start(config);

    document->SetDefaultPageFormat(2, 2, 22, 22, 10);

    yutovo_web::ShortcutsMap shortcuts_map;
    shortcuts_map.Init(document);

    EventArgs args{&shortcuts_map, document.get(), &window};
    emscripten_set_keydown_callback("#canvas", &args, true, OnKeyDown);
    emscripten_set_mousemove_callback("#scroll-container", &args, true, OnMouseMove);
    emscripten_set_mousedown_callback("#scroll-container", &args, true, OnMouseDown);
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, &args, true, OnResize);

    emscripten_set_main_loop_arg(&MainLoop, &window, 0, true);

    printf("Finish\n");
    return 0;
}

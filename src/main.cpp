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

SDL_Window *canvas_window = nullptr;
SDL_Renderer* renderer = nullptr;
SDL_Surface* surface = nullptr;

EM_JS(void, UpdateScrollBars, (int v_size, int h_size, int v_value, int h_value), 
    {
        var scroll_space = document.getElementById('scroll-space');
        scroll_space.style.width = h_size + "px";
        scroll_space.style.height = v_size + "px";
        var scroll_container = document.getElementById('scroll-container');
        scroll_container.scrollLeft = h_value;
        scroll_container.scrollTop = v_value;
    });

EM_JS(void, UpdateStantardToolbar, (const char* paragraph_format, size_t paragraph_format_size, const char* font_family, size_t font_family_size, 
    unsigned int font_size, bool bold, bool italic, bool underline),
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
                    'underline': underline
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
        if (c.id.empty() || c.id.size() == 1)
            return;
        ElementId _id = GetParent(c.id);
        auto t = document->GetElementType(_id);
        if (!document->IsString(document->GetElement(_id)) && !document->IsRow(document->GetElement(_id)))
        {
            format.Reset();
        }
        else if (document->GetStringFormat(_id, format))
        {
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
        }

        UpdateStantardToolbar(paragraph_format.name.c_str(), paragraph_format.name.size(), format.family.c_str(), format.family.size(), 
            format.size, format.bold, format.italic, format.underline);
    }

    if (window->needs_render)
    {
        //document was updated
        window->Render(renderer, surface);

        //update scrollbars
        yutovo::Rect r = window->GetViewPort(0);
        yutovo::Size s = window->document_size;
        yutovo::Point p = window->document_point;
        if (last_document_size != s && last_document_point != p)
        {
            UpdateScrollBars(s.height + r.top, s.width + r.left, p.y, p.x);
            last_document_size = s;
            last_document_point = p;
        }
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
    return false;
}

EM_BOOL OnMouseDown(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    if (mouse_event->button == 0)
    {
        EventArgs* args = (EventArgs*)user_data;
        auto p = args->window->GetDocumentPoint();
        args->document->MoveCaret(mouse_event->targetX + p.x, mouse_event->targetY + p.y);
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

extern "C" EMSCRIPTEN_KEEPALIVE void OnCut()
{
    if (!document)
        return;
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnCopy()
{
    if (!document)
        return;
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPaste()
{
    if (!document)
        return;
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

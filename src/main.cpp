/*
 * Yutovo Web
 * Copyright (C) 2022-2025 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#include <stdio.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/key_codes.h>
#include <yutovo-editor/document.h>
#include "web_window.h"
#include "command_map.h"
#include "web_utils.h"

using emscripten::val;
using namespace yutovo;

yutovo::DocumentPtr document;
yutovo_web::WebWindow window;
yutovo::Config config;
yutovo_web::ShortcutsMap shortcuts_map;

std::atomic_bool set_document_point;
yutovo::Point document_point{false};
yutovo::Size last_document_size;
yutovo::Point last_document_point;
yutovo::Point left_click_pos;

std::u32string clipboard_json, clipboard_text;
std::string clipboard_image;

std::string save_json;

std::string user_settings = "{}";

ElementId cast_unit_id;
std::atomic_bool cast_units_ready{false};
std::thread cast_units_thread;
std::atomic_bool stop_cast_units_thread{false};
std::mutex cast_units_mutex;
std::vector<Unit> cast_units;
std::vector<std::string> cast_units_images;
const std::string base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
yutovo_web::WebWindow cast_units_window;
DocumentPtr cast_units_document;
std::u32string cast_unit_system;
std::string res_json;
ElementId mouse_capture_id;

std::atomic_bool create_document{false};
std::string load_json;
int load_document_id = 0;

typedef std::shared_ptr<yutovo_web::WebWindow> WebWindowPtr;
std::vector<WebWindowPtr> include_windows;

SDL_Renderer* renderer = nullptr;
SDL_Surface* surface = nullptr;

std::queue<yutovo::ElementId> translate_tasks;

extern "C" EMSCRIPTEN_KEEPALIVE bool CanCopy();
extern "C" EMSCRIPTEN_KEEPALIVE bool CanPaste();
extern "C" EMSCRIPTEN_KEEPALIVE bool CanCut();

void FillUnits(const std::string system);
ElementId GetRealResultId();
void CreateDocument();

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
    unsigned int font_size, int bold, int italic, int underline, int strikethrough, int subscript, int superscript, const char* text_color, size_t text_color_size, 
    const char* text_bg_color, size_t text_bg_color_size, int left_align, int center_align, int right_align, int justify_align, int code_block),
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
                    'strikethrough': strikethrough,
                    'subscript': subscript,
                    'superscript': superscript,
                    'text_color': UTF8ToString(text_color, text_color_size),
                    'text_bg_color': UTF8ToString(text_bg_color, text_bg_color_size),
                    'left_align': left_align,
                    'center_align': center_align,
                    'right_align': right_align,
                    'justify_align': justify_align,
                    'code_block': code_block,
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

EM_JS(void, ListIdentifiersTree, (const char* json, size_t json_size),
    {
        window.dispatchEvent(new CustomEvent('listIdentifiersTree', 
            {
                'detail': 
                {
                    'json': json == 0 ? "" : UTF8ToString(json, json_size)
                }
            }));
    });

EM_JS(void, SaveDocument, (const char* json, size_t json_size),
    {
        window.dispatchEvent(new CustomEvent('saveDocument', 
            {
                'detail': 
                {
                    'json': new Uint8Array(Module['HEAPU8'].buffer, json, json_size)
                }
            }));
    });

EM_JS(void, LoadResult, (const int result, const int document_id, const char* config, size_t config_size),
    {
        window.dispatchEvent(new CustomEvent('loadResult', 
            {
                'detail': 
                {
                    'result': result,
                    'document_id': document_id, 
                    'config': UTF8ToString(config, config_size)
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

EM_JS(void, AddCastUnitSystem, (const char* system, size_t system_size),
    {
        window.dispatchEvent(new CustomEvent('addUnitSystem', 
            {
                'detail': 
                {
                    'system': UTF8ToString(system, system_size)
                }
            }));
    });

EM_JS(void, AddCastUnit, (const char* unit, size_t unit_size),
    {
        window.dispatchEvent(new CustomEvent('addUnit', 
            {
                'detail': 
                {
                    'unit': UTF8ToString(unit, unit_size)
                }
            }));
    });

EM_JS(void, OpenLink, (const char* url, size_t url_size),
    {
        var _url = UTF8ToString(url, url_size);
        //check if this link is internal or no
        try
        {
            var r = URL.parse(_url);
            if (r.host == 'yutovo.ru' || r.host == 'yutovo.com')
                window.open(_url, '_self').focus();
            else
                window.open(_url, '_blank').focus();
        }
        catch (err)
        {
            if (_url.startsWith('/document') || _url.startsWith('/library'))
                window.open(_url, '_self').focus();
            else
            {
                if (typeof window.library_document !== 'undefined' && window.library_document != "")
                {
                    //open a relative library link
                    var p = window.library_document.lastIndexOf('/');
                    if (p == -1)
                        return;
                    var path = window.library_document.substring(0, p + 1);
                    path = '/library/' + window.language + path + _url;
                    window.open(path, '_self').focus();
                }
                else
                {
                    //open a relative user document link
                    window.dispatchEvent(new CustomEvent('loadDocument', {detail: {name: _url}}));
                }
            }
        }
    });

EM_JS(void, SolverAction, (const char* json, size_t json_size),
    {
        window.dispatchEvent(new CustomEvent('solverAction', 
            {
                'detail': 
                {
                    'json': json == 0 ? "" : UTF8ToString(json, json_size)
                }
            }));
    });

EM_JS(void, IncludeDocument, (const char* filename, size_t filename_size, const int document_id),
    {
        window.dispatchEvent(new CustomEvent('includeDocument', 
            {
                'detail': 
                {
                    'name': UTF8ToString(filename, filename_size),
                    'document_id': document_id
                }
            }));
    });

EM_JS(void, PlotFormatDialog, (const char* color, size_t color_size, const int width),
    {
        window.dispatchEvent(new CustomEvent('plotFormatDialog', 
            {
                'detail': 
                {
                    'color': UTF8ToString(color, color_size),
                    'width': width
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

        const CaretState c = window->current_editor_state.caret_state;
        const SelectionState s = window->current_editor_state.selection_state;
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
        int code_block = document->GetParentId(c.id, ElementType::CODE_BLOCK) != ElementId{};
        if (!document->IsString(document->GetElement(_id)) && !document->IsRow(document->GetElement(_id)))
        {
            format.Reset();

            UpdateStantardToolbar(paragraph_format.name.c_str(), paragraph_format.name.size(), format.family.c_str(), format.family.size(), 
                format.size, -1, -1, -1, -1, -1, -1, "", 0, "", 0, -1, -1, -1, -1, code_block);
        }
        else if (document->GetStringFormat(_id, format))
        {
            auto text_color = format.text_color.ToHex();
            auto text_bg_color = format.text_bg_color.ToHex();
            for (auto& state : s.state)
            {
                for (int i = state.start; i < state.start + state.size; ++i)
                {
                    ElementId s_id = GetChild(state.id, i);
                    StringFormat f;
                    document->GetStringFormat(s_id, f);
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
                    if (format.strikethrough != false && format.strikethrough != f.strikethrough)
                        format.strikethrough = false;
                }
            }

            UpdateStantardToolbar(paragraph_format.name.c_str(), paragraph_format.name.size(), format.family.c_str(), format.family.size(), 
                format.size, format.bold, format.italic, format.underline, format.strikethrough, format.subscript, format.superscript, text_color.c_str(), 
                text_color.size(), text_bg_color.c_str(), text_bg_color.size(), paragraph_format.alignment == ParagraphFormat::Alignment::Left, 
                paragraph_format.alignment == ParagraphFormat::Alignment::Center, paragraph_format.alignment == ParagraphFormat::Alignment::Right, 
                paragraph_format.alignment == ParagraphFormat::Alignment::Justify, code_block);
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

    if (window->update_identifiers)
    {
        window->update_identifiers = false;
        const CaretState c = window->current_editor_state.caret_state;
        uint code_id = document->FindCodeBlock(c.id);
        if (code_id == 0)
        {
            UpdateIdentifiersTree(0, NULL, 0);
        }
        else
        {
            std::string guid;
            document->GetSolverGuid(guid);
            UpdateIdentifiersTree(code_id, guid.c_str(), guid.size());
        }
    }

    if (window->identifiers_ready)
    {
        window->identifiers_ready = false;
        ListIdentifiersTree(window->identifers_json.c_str(), window->identifers_json.size());
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
        SaveDocument(save_json.c_str(), save_json.size());
        window->save_ready = false;
    }

    if (window->load_ready)
    {
        IOResult result;
        int document_id = 0;
        if (window->GetLoadResult(result, document_id))
        {
            document->WaitTask(document->SetConfig(user_settings, false));
            Config config;
            document->GetConfig(config);
            std::string s;
            config.ToJson(s);
            LoadResult((int)result, document_id, s.c_str(), s.size());
        }
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

    if (window->fill_cache)
    {
        window->CacheTasks();
    }

    window->SocketTasks();

    if (cast_units_ready)
    {
        std::lock_guard<std::mutex> lock(cast_units_mutex);
        for (auto& u : cast_units_images)
            AddCastUnit(u.c_str(), u.size());
        cast_units_images.clear();
        cast_units_ready = false;
    }

    if (window->link_ready)
    {
        window->link_ready = false;
        std::string url;
        window->GetClickedLink(url);
        OpenLink(url.c_str(), url.size());
    }

    if (window->solver_action_ready)
    {
        std::vector<std::string> solver_actions;
        window->GetSolverActions(solver_actions);
        for (auto& s : solver_actions)
            SolverAction(s.c_str(), s.size());
    }

    if (window->include_documents_ready)
    {
        window->include_documents_ready = false;
        std::vector<std::pair<std::string, int>> files;
        window->GetIncludeDocuments(files);
        for (auto& f : files)
            IncludeDocument(f.first.c_str(), f.first.size(), f.second);
    }

    if (create_document)
    {
        CreateDocument();
        create_document = false;
        load_json = "";
    }
}

struct EventArgs
{
    yutovo_web::ShortcutsMap* shortcuts_map;
    yutovo::Document* document;
    yutovo_web::WebWindow* window;
};

EventArgs args;

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
        if (type == 1)
            scroll_container.style.cursor = 'text';
        else if (type == 2)
            scroll_container.style.cursor = 'pointer';
        else if (type == 3)
            scroll_container.style.cursor = 'ew-resize';
        else if (type == 4)
            scroll_container.style.cursor = 'ns-resize';
        else if (type == 5)
            scroll_container.style.cursor = 'nwse-resize';
        else if (type == 6)
            scroll_container.style.cursor = 'nesw-resize';
        else if (type == 0)
            scroll_container.style.cursor = 'default';
    });

EM_BOOL OnMouseMove(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    auto p = args->window->GetDocumentPoint();
    int x = mouse_event->targetX + p.x;
    int y = mouse_event->targetY + p.y;
    int m = document->config.resize_margin_width;

    yutovo_web::ElementId id;
    if (args->document->GetElementAtCoords(x, y, m, id))
    {
        if (args->document->IsResizable(id))
        {
            Rect rect;
            if (args->document->GetElementRect(id, rect))
            {
                if ((x <= rect.left + m && y <= rect.top + m) || (x >= rect.GetRight() - m && y >= rect.GetBottom() - m))
                {
                    if (mouse_capture_id == ElementId{})
                        SetCursor(5);
                    args->document->MouseMove(x, y);
                    return true;
                }
                if ((x >= rect.GetRight() - m && y <= rect.top + m) || (x <= rect.left + m && y >= rect.GetBottom() - m))
                {
                    if (mouse_capture_id == ElementId{})
                        SetCursor(6);
                    args->document->MouseMove(x, y);
                    return true;
                }
                if (x <= rect.left + m || (x <= rect.GetRight() + m && x >= rect.GetRight() - m))
                {
                    if (mouse_capture_id == ElementId{})
                        SetCursor(3);
                    args->document->MouseMove(x, y);
                    return true;
                }
                if (y <= rect.top + m || (y <= rect.GetBottom() + m && y >= rect.GetBottom() - m))
                {
                    if (mouse_capture_id == ElementId{})
                        SetCursor(4);
                    args->document->MouseMove(x, y);
                    return true;
                }
            }
        }
    }

    if (!args->document->GetElementAtCoords(x, y, 0, id))
    {
        if (mouse_capture_id == ElementId{})
            SetCursor(0);
        return true;
    }

    if (args->document->MouseMove(x, y))
        return true;
    
    if (args->document->GetElementAtCoords(x, y, 0, id))
    {
        if (args->document->IsString(id))
        {
            if (args->document->GetElementType(id) == ElementType::LINK && !mouse_event->ctrlKey)
                SetCursor(2);
            else
                SetCursor(1);
        }
        else
            SetCursor(0);
    }

    if (mouse_event->buttons == 1)
    {
        //selection with mouse
        args->document->Select(left_click_pos.x, left_click_pos.y, x, y);
    }
    return false;
}

EM_BOOL OnMouseDown(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    auto p = args->window->GetDocumentPoint();
    int x = mouse_event->targetX + p.x;
    int y = mouse_event->targetY + p.y;
    int m = document->config.resize_margin_width;

    yutovo_web::ElementId id;
    if (args->document->GetElementAtCoords(x, y, m, id))
    {
        if (args->document->IsResizable(id))
        {
            Rect rect;
            if (args->document->GetElementRect(id, rect))
            {
                if ((x <= rect.left + m && y <= rect.top + m) || (x >= rect.GetRight() - m && y >= rect.GetBottom() - m))
                {
                    mouse_capture_id = id;
                }
                else if ((x >= rect.GetRight() - m && y <= rect.top + m) || (x <= rect.left + m && y >= rect.GetBottom() - m))
                {
                    mouse_capture_id = id;
                }
                else if (x <= rect.left + m || (x <= rect.GetRight() + m && x >= rect.GetRight() - m))
                {
                    mouse_capture_id = id;
                }
                else if (y <= rect.top + m || (y <= rect.GetBottom() + m && y >= rect.GetBottom() - m))
                {
                    mouse_capture_id = id;
                }
            }
        }
    }

    if (mouse_event->button == 0)
    {
        MouseHoldType hold_type;
        ElementId hold_id;
        if (document->MouseLButtonDown(x, y, hold_type, hold_id))
        {
            switch (hold_type)
            {
            case MouseHoldType::PLOT_FORMAT_DIALOG:
                {
                    yutovo::PlotFormat f;
                    if (!document->GetPlotFormat(hold_id, f))
                        return true;
                    std::string color = f.color.ToHex();
                    PlotFormatDialog(color.c_str(), color.size(), f.width);
                }
                return true;
            default:
                return true;
            }
        }
    }

    EditorState s = args->document->GetEditorState();
    if (mouse_event->button == 0 || (mouse_event->button == 2 && s.selection_state.IsEmpty()))
    {
        args->document->MoveCaret(x, y, !mouse_event->ctrlKey);
    }
    if (mouse_event->button == 0)
    {
        //start selection with mouse
        left_click_pos = Point{x, y};
    }
    return true;
}

EM_BOOL OnMouseUp(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    bool r = !(mouse_capture_id == ElementId{});
    mouse_capture_id = ElementId{};
    EventArgs* args = (EventArgs*)user_data;
    auto p = args->window->GetDocumentPoint();
    if (mouse_event->button == 0)
        document->MouseLButtonUp(mouse_event->targetX + p.x, mouse_event->targetY + p.y);
    return r;
}

EM_BOOL OnMouseDoubleClick(int event_type, const EmscriptenMouseEvent* mouse_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    if (mouse_event->button == 0)
        args->document->SelectOut();
    return false;
}

EM_BOOL OnMouseWheel(int event_type, const EmscriptenWheelEvent* wheel_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;
    auto p = args->window->GetDocumentPoint();
    if (document->MouseWheel(wheel_event->mouse.targetX + p.x, wheel_event->mouse.targetY + p.y, 
        yutovo::Point{int(-wheel_event->deltaX / 8), int(-wheel_event->deltaY / 8)}, 
        yutovo::Point{int(-wheel_event->deltaX / 8), int(-wheel_event->deltaY / 8)}))
    {
        return true;
    }
    return false;
}

EM_BOOL OnResize(int event_type, const EmscriptenUiEvent* ui_event, void* user_data)
{
    EventArgs* args = (EventArgs*)user_data;

    double css_w = 0, css_h = 0;
    emscripten_get_element_css_size("#canvas", &css_w, &css_h);
    int width = (int)css_w;
    int height = (int)css_h;
    emscripten_set_canvas_element_size("#canvas", width, height);

    if (surface)
        SDL_FreeSurface(surface);
    surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    if (!surface)
    {
        printf("SDL_CreateRGBSurface error: %s\n", TTF_GetError());
        return 0;
    }

    args->document->Resize(width, height);
    args->document->Redraw();
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
    {
        load_document_id = 0;
        create_document = true;
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnOpen(const char* json, const int document_id)
{
    if (document)
    {
        load_json = json;
        load_document_id = document_id;
        create_document = true;
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnOpenInclude(const char* json, const int document_id)
{
    if (document)
    {
        WebWindowPtr w(new yutovo_web::WebWindow());
        include_windows.push_back(w);
        document->LoadJsonInclude(std::string(json), document_id, w.get());
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSave(const int document_id)
{
    if (document)
    {
        save_json = "";
        document->SaveJson(save_json, document_id, false);
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnDownload(const int document_id)
{
    if (document)
    {
        save_json = "";
        document->SaveJson(save_json, document_id, true);
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
        document->PasteImage(clipboard_image);
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
    clipboard_text = yutovo::ToUtfString(value);
}

extern "C" EMSCRIPTEN_KEEPALIVE void SetClipboardJson(const char* value)
{
    clipboard_json = yutovo::ToUtfString(value);
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
    return !s.selection_state.IsEmpty();
}

extern "C" EMSCRIPTEN_KEEPALIVE bool IsChanged()
{
    return document->IsChanged();
}

extern "C" EMSCRIPTEN_KEEPALIVE bool IsEmpty()
{
    return document->IsEmpty();
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetPresentAsMenu()
{
    ElementId id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (!id.empty())
        return 1;
    id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (!id.empty())
        return 2;
    id = document->FindCurrentParentByType(ElementType::INTEGER_RESULT);
    if (!id.empty())
        return 3;
    id = document->FindCurrentParentByType(ElementType::RATIONAL_RESULT);
    if (!id.empty())
        return 4;
    id = document->FindCurrentParentByType(ElementType::COMPLEX_RESULT);
    if (!id.empty())
        return 5;
    return 0;
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetPrecision()
{
    ElementId id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::COMPLEX_RESULT);
    if (id.empty())
        return -1;
    return document->GetPrecision(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetExp()
{
    ElementId id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::COMPLEX_RESULT);
    if (id.empty())
        return -1;
    return document->GetExp(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetDefaultAngleMeasure()
{
    ElementId id = GetRealResultId();
    if (id.empty())
        return -1;
    return (int)document->GetDefaultAngleMeasure(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetResultAngleMeasure()
{
    ElementId id = GetRealResultId();
    if (id.empty())
        return -1;
    return (int)document->GetResultAngleMeasure(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetDefaultNotation()
{
    ElementId id = document->FindCurrentParentByType(ElementType::INTEGER_RESULT);
    if (id.empty())
        return -1;
    return (int)document->GetDefaultNotation(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetResultNotation()
{
    ElementId id = document->FindCurrentParentByType(ElementType::INTEGER_RESULT);
    if (id.empty())
        return -1;
    return (int)document->GetResultNotation(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetFractionForm()
{
    ElementId id = document->FindCurrentParentByType(ElementType::RATIONAL_RESULT);
    if (id.empty())
        return -1;
    return (int)document->GetFractionForm(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int GetComplexForm()
{
    ElementId id = document->FindCurrentParentByType(ElementType::COMPLEX_RESULT);
    if (id.empty())
        return -1;
    return (int)document->GetComplexForm(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int HasUnit()
{
    ElementId id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::RATIONAL_RESULT);
    if (id.empty())
        return 0;
    return document->HasUnit(id);
}

extern "C" EMSCRIPTEN_KEEPALIVE int IsGraph()
{
    if (document->GetCurrentElementType() == ElementType::GRAPH_LINE)
        return 1;
    return document->FindCurrentParentByType(ElementType::GRAPH_LINE) != ElementId{};
}

extern "C" EMSCRIPTEN_KEEPALIVE char* GetLink()
{
    res_json = "";
    EditorState s = document->GetEditorState();
    std::u32string link_str, link_url;
    if (document->GetLink(s.caret_state.id, link_str, link_url))
        res_json = "{\"text\":\"" + ToBasicString(link_str) + "\",\"url\":\"" + ToBasicString(link_url) + "\"}";
    else
    {
        if (s.selection_state.state.size() == 1)
        {
            auto t = document->GetElementType(s.caret_state.id);
            if (t == ElementType::STRING)
            {
                std::u32string str = document->ToText(s.caret_state.id);
                ElementSelectionState& el_s = s.selection_state.state[0];
                if (str.length() >= el_s.start + el_s.size)
                {
                    str = str.substr(el_s.start, el_s.size);
                    res_json = "{\"text\":\"" + ToBasicString(str) + "\",\"url\":\"\"}";
                }
            }
        }
    }
    return (char*)res_json.c_str();
}

extern "C" EMSCRIPTEN_KEEPALIVE char* GetGraphFormat()
{
    res_json = "";
    EditorState s = document->GetEditorState();
    GraphFormat f;
    if (document->GetGraphFormat(yutovo::GetParent(s.caret_state.id), f))
    {
        res_json = "{\"width\":" + std::to_string(f.size.width) + ",\"height\":" + std::to_string(f.size.height) + 
            ",\"color\":\"" + f.color.ToHex() + "\",\"grid_width\":" + std::to_string(f.grid_width) + "}";
    }
    return (char*)res_json.c_str();
}

extern "C" EMSCRIPTEN_KEEPALIVE void GetCastUnitsSystems()
{
    cast_unit_id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (cast_unit_id.empty())
        cast_unit_id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (cast_unit_id.empty())
        cast_unit_id = document->FindCurrentParentByType(ElementType::RATIONAL_RESULT);
    if (cast_unit_id.empty())
        return;

    std::vector<std::u32string> systems;
    cast_units.clear();
    document->GetCastUnits(cast_unit_id, cast_units);
    for (auto& u : cast_units)
    {
        if (std::find(systems.begin(), systems.end(), u.system) == systems.end())
            systems.push_back(u.system);
    }

    for (auto& s : systems)
    {
        std::string _s = yutovo::ToBasicString(s);
        AddCastUnitSystem(_s.c_str(), _s.size());
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void GetCastUnits(const char* system)
{
    if (cast_unit_id.empty())
        return;
    
    cast_unit_system = yutovo::ToUtfString(system);

    stop_cast_units_thread = true;
    if (cast_units_thread.joinable())
        cast_units_thread.join();
    
    stop_cast_units_thread = false;

    {
        std::lock_guard<std::mutex> lock(cast_units_mutex);
        cast_units_images.clear();
    }

    cast_units_thread = std::thread(&FillUnits, system);
}

extern "C" EMSCRIPTEN_KEEPALIVE void ChooseCastUnit(int pos)
{
    stop_cast_units_thread = true;

    for (size_t i = 0, j = 0; i < cast_units.size(); ++i)
    {
        auto& c = cast_units[i];
        if (c.system == cast_unit_system)
        {
            if (pos == j)
            {
                document->SetUnit(cast_unit_id, c, true);
                break;
            }
            ++j;
        }
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void StopCastUnits()
{
    stop_cast_units_thread = true;
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnInsertCalculator()
{
    if (!document)
        return;
    document->InsertCode(false, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnRecalculate()
{
    if (!document)
        return;
    document->ReSolve(ElementId{});
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
    document->InsertRoundBrackets(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSum()
{
    if (!document)
        return;
    document->InsertSum(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnProduct()
{
    if (!document)
        return;
    document->InsertProduct(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnAssignment()
{
    if (!document)
        return;
    document->InsertAssignment(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnUnit()
{
    if (!document)
        return;
    document->InsertUnit(true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnEquation()
{
    if (!document)
        return;
    document->InsertEquation(ResultType::AUTO, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnGraphLine()
{
    if (!document)
        return;
    document->InsertGraph(true);
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

extern "C" EMSCRIPTEN_KEEPALIVE void OnStrikethrough(int checked)
{
    if (!document)
        return;
    document->SetStrikethrough(checked);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTextSubscript(int checked)
{
    if (!document)
        return;
    document->SetSubscript(checked);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTextSuperscript(int checked)
{
    if (!document)
        return;
    document->SetSuperscript(checked);
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

extern "C" EMSCRIPTEN_KEEPALIVE void OnLink(const char* text, const char* url)
{
    if (!document)
        return;
    document->InsertLink(ToUtfString(text), ToUtfString(url), true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnLeftAlign(int checked)
{
    if (!document)
        return;
    document->ChangeParagraphFormat(ParagraphFormat::Alignment::Left, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnRightAlign(int checked)
{
    if (!document)
        return;
    document->ChangeParagraphFormat(ParagraphFormat::Alignment::Right, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnCenterAlign(int checked)
{
    if (!document)
        return;
    document->ChangeParagraphFormat(ParagraphFormat::Alignment::Center, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnJustifyAlign(int checked)
{
    if (!document)
        return;
    document->ChangeParagraphFormat(ParagraphFormat::Alignment::Justify, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnLibraryFilePart(const char* part_file, const int document_id, const int finish)
{
    static std::string file;
    file += part_file;
    if (finish)
    {
        load_json = std::string(file);
        file = "";
        load_document_id = document_id;
        create_document = true;
    }
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnLanguage(const char* language)
{
    auto s = yutovo::ToUtfString(language);
    if (s == U"\"en\"")
        document->SetLocale(yutovo_calculator::Language::English, true);
    else if (s == U"\"ru\"")
        document->SetLocale(yutovo_calculator::Language::Russian, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSettings(const char* settings)
{
    user_settings = settings;
    document->SetConfig(user_settings, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnConfig(const char* config, bool with_undo)
{
    document->SetConfig(std::string(config), with_undo);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnTranslate(const char* str)
{
    assert(translate_tasks.size() > 0);
    document->InsertString(str, translate_tasks.front(), false);
    translate_tasks.pop();
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPresentAsAuto()
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetResultType(s.caret_state.id, ResultType::AUTO, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPresentAsReal()
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetResultType(s.caret_state.id, ResultType::REAL, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPresentAsInteger()
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetResultType(s.caret_state.id, ResultType::INTEGER, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPresentAsRational()
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetResultType(s.caret_state.id, ResultType::RATIONAL, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPresentAsComplex()
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetResultType(s.caret_state.id, ResultType::COMPLEX, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSetPrecision(int precision)
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetPrecision(s.caret_state.id, precision, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnSetExp(int exp)
{
    EditorState s = document->GetEditorState();
    if (!s.caret_state.IsEmpty())
        document->SetExp(s.caret_state.id, exp, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnDefaultAngleMeasure(int angle_measure)
{
    ElementId id = GetRealResultId();
    if (id.empty())
        return;
    AngleMeasure m = document->GetDefaultAngleMeasure(id);
    document->SetAngleMeasure(id, (AngleMeasure)angle_measure, m, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnResultAngleMeasure(int angle_measure)
{
    ElementId id = GetRealResultId();
    if (id.empty())
        return;
    AngleMeasure m = document->GetResultAngleMeasure(id);
    document->SetAngleMeasure(id, m, (AngleMeasure)angle_measure, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnDefaultNotation(int notation)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    auto _id = document->GetParentId(s.caret_state.id, ElementType::INTEGER_RESULT);
    if (!_id.empty())
        document->SetNotation(_id, (Notation)notation, document->GetResultNotation(_id), true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnResultNotation(int notation)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    auto _id = document->GetParentId(s.caret_state.id, ElementType::INTEGER_RESULT);
    if (!_id.empty())
        document->SetNotation(_id, document->GetDefaultNotation(_id), (Notation)notation, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnFractionForm(int fraction_form)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    auto _id = document->GetParentId(s.caret_state.id, ElementType::RATIONAL_RESULT);
    if (!_id.empty())
        document->SetFractionForm(_id, (FractionForm)fraction_form, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnComplexForm(int complex_form)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    auto _id = document->GetParentId(s.caret_state.id, ElementType::COMPLEX_RESULT);
    if (!_id.empty())
        document->SetComplexForm(_id, (ComplexForm)complex_form, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnGraphFormat(const int width, const int height, const char* color, const int grid_width)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    document->SetGraphFormat(yutovo::GetParent(s.caret_state.id), GraphFormat{Size{width, height}, Color::FromHex(color), (uint)grid_width}, true);
}

extern "C" EMSCRIPTEN_KEEPALIVE void OnPlotFormat(const char* color, const int width)
{
    EditorState s = document->GetEditorState();
    if (s.caret_state.IsEmpty())
        return;
    yutovo::PlotFormat f{Color::FromHex(color), (uint)width};
    document->SetPlotFormat(yutovo::GetParent(s.caret_state.id), f, true);
}

std::u32string document_text;

extern "C" EMSCRIPTEN_KEEPALIVE char* GetText()
{
    document_text = document->ToText();
    return (char*)document_text.c_str();
}

extern "C" EMSCRIPTEN_KEEPALIVE void ListIdentifiers(int code_id)
{
    document->ListIdentifiers(code_id);
}

void FillUnits(const std::string system)
{
    DocumentPtr d = cast_units_document;
    d->WaitTask(d->Resize(1, 1));
    std::u32string s = yutovo::ToUtfString(system);

    for (size_t i = 0; i < cast_units.size(); ++i)
    {
        if (stop_cast_units_thread)
        {
            cast_units_ready = true;
            break;
        }
        
        Unit& unit = cast_units[i];
        if (unit.system != s)
            continue;
        
        //draw this unit
        d->WaitTask(d->MoveCaretToDocumentBegin(false));
        d->WaitTask(d->DeleteElements(false, false));
        d->WaitTask(d->InsertUnit(unit, false));
        ElementPtr t = d->GetElement({0, 0});
        d->WaitTask(d->Resize(t->rect.width, t->rect.height));
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        d->WaitTask(d->Redraw(ElementId{0}, false));

        while (!cast_units_window.needs_render)
        {
            if (stop_cast_units_thread)
            {
                cast_units_ready = true;
                return;
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }

        std::vector<unsigned char> picture;
        cast_units_window.Render(picture); //get unit's picture

        //convert the picture to base64 and send it to JS
        std::string image_base64;

        int val = 0, valb = -6;
        for (unsigned char c : picture)
        {
            val = (val << 8) + c;
            valb += 8;
            while (valb >= 0)
            {
                image_base64.push_back(base[(val >> valb) & 0x3F]);
                valb -= 6;
            }
        }
        if (valb > -6)
            image_base64.push_back(base[((val << 8) >> (valb + 8)) & 0x3F]);
        while (image_base64.size() % 4)
            image_base64.push_back('=');

        std::lock_guard<std::mutex> lock(cast_units_mutex);
        cast_units_images.push_back(image_base64);
        cast_units_ready = true;
    }
}

ElementId GetRealResultId()
{
    ElementId id = document->FindCurrentParentByType(ElementType::AUTO_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::REAL_RESULT);
    if (id.empty())
        id = document->FindCurrentParentByType(ElementType::COMPLEX_RESULT);
    return id;
}

void CreateDocument()
{
    document.reset(new yutovo::Document(&window, config));

    shortcuts_map.Init(document);

    args = EventArgs{&shortcuts_map, document.get(), &window};
    emscripten_set_keydown_callback("#canvas", nullptr, true, nullptr);
    emscripten_set_keydown_callback("#canvas", &args, true, OnKeyDown);
    emscripten_set_mousemove_callback("#scroll-container", nullptr, true, nullptr);
    emscripten_set_mousemove_callback("#scroll-container", &args, true, OnMouseMove);
    emscripten_set_mousedown_callback("#scroll-container", nullptr, true, nullptr);
    emscripten_set_mousedown_callback("#scroll-container", &args, true, OnMouseDown);
    emscripten_set_mouseup_callback("#scroll-container", &args, true, OnMouseUp);
    emscripten_set_dblclick_callback("#scroll-container", nullptr, true, nullptr);
    emscripten_set_dblclick_callback("#scroll-container", &args, true, OnMouseDoubleClick);
    emscripten_set_wheel_callback("#scroll-container", nullptr, true, nullptr);
    emscripten_set_wheel_callback("#scroll-container", &args, true, OnMouseWheel);
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, nullptr, true, nullptr);
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, &args, true, OnResize);

    document->Start();
    document->SetDefaultPageFormat(2, 2, 22, 22, 10);
    double w = 0, h = 0;
    emscripten_get_element_css_size("#canvas", &w, &h);
    document->Resize((int)w, (int)h);
    if (!load_json.empty())
        document->LoadJson(load_json, load_document_id);
    else
        document->InsertCode(false, false);
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

    config.service_ip = "yutovo.ru";
    config.service_port = 9002;

    yutovo::Config cast_config;
    cast_units_document.reset(new Document(&cast_units_window, cast_config));
    cast_units_document->GetConfig(cast_config);
    cast_config.with_border = false;
    cast_config.caret_visible = false;
    cast_config.formula_border = false;
    cast_config.solve_delay = 0;
    cast_units_document->Start();
    cast_units_document->WaitTask(cast_units_document->SetConfig(cast_config, false));

    create_document = true; //create the first document after the main loop starts

    emscripten_set_main_loop_arg(&MainLoop, &window, 0, true);

    printf("Finish\n");
    return 0;
}

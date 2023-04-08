#include <stdio.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/key_codes.h>
#include <yutovo_editor/document.h>
#include "web_window.h"
#include "command_map.h"

using emscripten::val;

yutovo::DocumentPtr document;
std::atomic_bool set_document_point;
yutovo::Point document_point{false};

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

void MainLoop(void* arg)
{
    yutovo_web::WebWindow* window = (yutovo_web::WebWindow*)arg;
    if (set_document_point)
    {
        window->document_point = document_point;
        set_document_point = false;
    }
    if (window->needs_render)
    {
        //document was updated
        window->Render(renderer, surface);

        //update scrollbars
        yutovo::Rect r = window->GetViewPort(0);
        yutovo::Size s = window->document_size;
        yutovo::Point p = window->document_point;
        UpdateScrollBars(s.height + r.top, s.width + r.left, p.y, p.x);
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

int main(int argc, char* argv[])
{
    printf("Start\n");

    SDL_Init(SDL_INIT_EVERYTHING);

    val doc = val::global("document");
    val canvas = doc.call<val>("getElementById", std::string("canvas"));
    int width = 0, height = 0, f = 0;
    emscripten_get_canvas_size(&width, &height, &f);

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

    yutovo_web::ShortcutsMap shortcuts_map;
    shortcuts_map.Init(document);

    EventArgs args{&shortcuts_map, document.get(), &window};
    emscripten_set_keydown_callback("#canvas", &args, true, OnKeyDown);
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, &args, true, OnResize);

    document->SetFontSize(34);
    document->InsertString("Text", true);

    emscripten_set_main_loop_arg(&MainLoop, &window, 0, true);

    printf("Finish\n");
    return 0;
}

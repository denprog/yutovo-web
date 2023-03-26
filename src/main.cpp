#include <stdio.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/key_codes.h>
#include <yutovo_editor/document.h>
#include "web_window.h"
#include "command_map.h"

using emscripten::val;

SDL_Renderer* renderer = nullptr;
SDL_Surface* surface = nullptr;

void MainLoop(void* arg)
{
    yutovo_web::WebWindow* window = (yutovo_web::WebWindow*)arg;
    if (window->needs_update)
        window->Draw(renderer, surface);
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
    printf("OnResize w=%d, h=%d\n", width, height);

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

yutovo::DocumentPtr document;

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
    renderer = SDL_CreateRenderer(w, -1, SDL_RENDERER_SOFTWARE);
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

    document->SetBold(true);
    document->SetFontSize(14);
    document->SetFontFamily("Courier New");
    document->InsertString("Courier", true);

    emscripten_set_main_loop_arg(&MainLoop, &window, 0, true);

    printf("Finish\n");
    return 0;
}

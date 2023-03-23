#include <stdio.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/html5.h>
#include <emscripten/key_codes.h>
#include <yutovo_editor/document.h>
#include "web_window.h"
#include "command_map.h"

using emscripten::val;

void MainLoop(void* arg)
{
    yutovo_web::WebWindow* window = (yutovo_web::WebWindow*)arg;
    if (window->run_draw_tasks)
        window->RunDrawTasks();
    if (window->run_help_tasks)
        window->RunHelpTasks();
}

struct OnKeyDownArgs
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
    //printf("Keydown %d %lu\n", event_type, key_event->keyCode);
    OnKeyDownArgs* args = (OnKeyDownArgs*)user_data;
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

yutovo::DocumentPtr document;

int main(int argc, char* argv[])
{
    printf("Start\n");
    int w, h, f;
    emscripten_get_canvas_size(&w, &h, &f);
    val doc = val::global("document");
    val canvas = doc.call<val>("getElementById", std::string("canvas"));
    canvas.call<void>("focus");

    yutovo_web::WebWindow window(canvas);
    document.reset(new yutovo::Document(&window));
    yutovo::Config config;
    document->Start(config);

    yutovo_web::ShortcutsMap shortcuts_map;
    shortcuts_map.Init(document);

    OnKeyDownArgs args{&shortcuts_map, document.get(), &window};
    emscripten_set_keydown_callback("#canvas", &args, true, OnKeyDown);

    document->SetFontSize(24);
    document->InsertString("Text", true);

    //Args args{document.get(), &window};
    emscripten_set_main_loop_arg(&MainLoop, &window, 0, true);

    printf("Finish\n");
    return 0;
}

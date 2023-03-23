#ifndef __TASK_H__
#define __TASK_H__

#include <memory>
#include <yutovo_editor/window.h>
#include <emscripten.h>
#include <emscripten/val.h>

namespace yutovo_web
{

using namespace yutovo;

struct Task
{
    Task(emscripten::val& _context);
    Task(emscripten::val& _context, bool _draw_doc, Rect& _view_port);

    virtual void Execute() = 0;

    emscripten::val& context;
    bool draw_doc = false;
    Rect view_port;
};

// struct InitTask : Task
// {
//     InitTask(int _width, int _height, SDL_Window** _window, SDL_Renderer** _renderer, SDL_Surface** _surface);

//     virtual void Execute();

//     int width = 0;
//     int height = 0;
//     SDL_Window** window = nullptr;
//     SDL_Renderer** renderer = nullptr;
//     SDL_Surface** surface = nullptr;
// };

struct DrawLineTask : Task
{
    DrawLineTask(emscripten::val& _context, const int _x1, const int _y1, const int _x2, const int _y2, const Color _color, bool _draw_doc, Rect& _view_port);

    virtual void Execute();

    int x1, y1, x2, y2;
    Color color;
};

struct DrawRectTask : Task
{
    DrawRectTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
        const Color _color, bool _draw_doc, Rect& _view_port);

    virtual void Execute();

    int x1, y1, width, height;
    Color color;
};

struct DrawFillRectTask : DrawRectTask
{
    DrawFillRectTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
        const Color _color, bool _draw_doc, Rect& _view_port);

    virtual void Execute();
};

struct DrawTextTask : Task
{
    DrawTextTask(emscripten::val& _context, const std::string& _text, const StringFormatPtr _format, const Rect& _rect, 
        const Color _color, bool _draw_doc, Rect& _view_port);

    virtual void Execute();

    std::string text;
    StringFormatPtr format;
    Rect rect;
    Color color;
};

struct TextMetricsTask : Task
{
    TextMetricsTask(emscripten::val& _context, const std::string& _text, const StringFormatPtr _format, Size& _size, std::atomic<bool>& _size_ready);

    virtual void Execute();

    std::string text;
    StringFormatPtr format;
    Size& size;
    std::atomic<bool>& size_ready;
};

struct StoreRectTask : Task
{
    StoreRectTask(emscripten::val& _context, const Rect& _rect, emscripten::val& _store_image);

    virtual void Execute();

    Rect rect;
    emscripten::val& store_image;
};

struct RestoreRectTask : Task
{
    RestoreRectTask(emscripten::val& _context, const int _left, const int _top, emscripten::val& _store_image);

    virtual void Execute();

    int left;
    int top;
    emscripten::val& store_image;
};

struct ClearTask : Task
{
    ClearTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
        bool _draw_doc, Rect& _view_port);

    virtual void Execute();

    int x1, y1, width, height;
};

struct RenderTask : Task
{
    RenderTask(emscripten::val& _context);

    virtual void Execute();
};

typedef std::shared_ptr<Task> TaskPtr;

}

#endif

#include "task.h"
#include "utils.h"

namespace yutovo_web
{

//Task

Task::Task(emscripten::val& _context) :
    context(_context)
{
}

Task::Task(emscripten::val& _context, bool _draw_doc, Rect& _view_port) : 
    context(_context),
    draw_doc(_draw_doc),
    view_port(_view_port)
{
}

// //InitTask

// InitTask::InitTask(int _width, int _height, SDL_Window** _window, SDL_Renderer** _renderer, SDL_Surface** _surface) :
//     width(_width),
//     height(_height),
//     window(_window),
//     renderer(_renderer),
//     surface(_surface)
// {
// }

// void InitTask::Execute()
// {
//     printf("InitTask");
//     SDL_Init(SDL_INIT_EVERYTHING);
//     int r = TTF_Init();
//     if (r < 0)
//     {
//         printf("TTF_Init error: %s\n", TTF_GetError());
//         return;
//     }
//     SDL_CreateWindowAndRenderer(width, height, 0, window, renderer);
//     *surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
// }

//DrawLineTask

DrawLineTask::DrawLineTask(emscripten::val& _context, const int _x1, const int _y1, const int _x2, const int _y2, 
    const Color _color, bool _draw_doc, Rect& _view_port) :
    Task(_context, _draw_doc, _view_port),
    x1(_x1),
    y1(_y1),
    x2(_x2),
    y2(_y2),
    color(_color)
{
}

void DrawLineTask::Execute()
{
    //printf("DrawLineTask x1=%d, y1=%d, x2=%d, y2=%d\n", x1, y1, x2, y2);
    context.set("strokeStyle", GetRectColor(color));
    context.set("lineWidth", 1);
    context.call<void>("beginPath");
    context.call<void>("moveTo", x1, y1);
    context.call<void>("lineTo", x2, y2);
    context.call<void>("stroke");
}

//DrawRectTask

DrawRectTask::DrawRectTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
    const Color _color, bool _draw_doc, Rect& _view_port) :
    Task(_context, _draw_doc, _view_port),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height),
    color(_color)
{
}

void DrawRectTask::Execute()
{
    printf("DrawRectTask x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    context.call<emscripten::val>("beginPath");
    context.set("strokeStyle", GetRectColor(color));
    context.call<emscripten::val>("rect", x1, y1, width, height);
    context.call<emscripten::val>("closePath");
    context.call<emscripten::val>("stroke");
}

//DrawFillRectTask

DrawFillRectTask::DrawFillRectTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
    const Color _color, bool _draw_doc, Rect& _view_port) :
    DrawRectTask(_context, _x1, _y1, _width, _height, _color, _draw_doc, _view_port)
{
}

void DrawFillRectTask::Execute()
{
    printf("DrawFillRectTask x1=%d, y1=%d, width=%d, height=%d, color=%d,%d,%d,%d\n", x1, y1, width, height, color.r, color.g, color.b, color.a);
    context.set("fillStyle", GetRectColor(color));
    context.call<emscripten::val>("fillRect", x1, y1, width, height);
}

//DrawTextTask

DrawTextTask::DrawTextTask(emscripten::val& _context, const std::string& _text, const StringFormatPtr _format, const Rect& _rect, 
    const Color _color, bool _draw_doc, Rect& _view_port) : 
    Task(_context, _draw_doc, _view_port),
    text(_text),
    format(_format),
    rect(_rect),
    color(_color)
{
}

void DrawTextTask::Execute()
{
    printf("DrawTextTask %s\n", text.c_str());
    context.set("font", GetTextFont(format));
    context.set("fillStyle", GetTextColor(color));
    context.set("textBaseline", "top");
    context.call<emscripten::val>("fillText", text, rect.left, rect.top);
}

//TextMetricsTask

TextMetricsTask::TextMetricsTask(emscripten::val& _context, const std::string& _text, const StringFormatPtr _format, Size& _size, std::atomic<bool>& _size_ready) : 
    Task(_context),
    text(_text),
    size(_size),
    size_ready(_size_ready)
{
}

void TextMetricsTask::Execute()
{
    context.set("font", GetTextFont(format));
    //context.set("textBaseline", "top");
    emscripten::val metrics = context.call<emscripten::val>("measureText", text);
    double w = metrics["width"].as<double>();
    double h = metrics["fontBoundingBoxAscent"].as<double>() + metrics["fontBoundingBoxDescent"].as<double>();
    size = Size{(int)w, (int)h};
    //printf("TextMetricsTask %f %f\n", w, h);
    size_ready = true;
}

//StoreRectTask

StoreRectTask::StoreRectTask(emscripten::val& _context, const Rect& _rect, emscripten::val& _store_image) :
    Task(_context),
    rect(_rect),
    store_image(_store_image)
{
}

void StoreRectTask::Execute()
{
    if (rect.width == 0 || rect.height == 0)
        return;
    //printf("StoreRectTask left=%d, top=%d\n", rect.left, rect.top);
    store_image = context.call<emscripten::val>("getImageData", rect.left, rect.top, rect.width, rect.height);
}

//RestoreRectTask

RestoreRectTask::RestoreRectTask(emscripten::val& _context, const int _left, const int _top, emscripten::val& _store_image) :
    Task(_context),
    left(_left),
    top(_top),
    store_image(_store_image)
{
}

void RestoreRectTask::Execute()
{
    if (store_image != emscripten::val::null())
    {
        //printf("RestoreRectTask left=%d, top=%d\n", left, top);
        context.call<void>("putImageData", store_image, left, top);
    }
}

//ClearTask

ClearTask::ClearTask(emscripten::val& _context, const int _x1, const int _y1, const int _width, const int _height, 
    bool _draw_doc, Rect& _view_port) :
    Task(_context, _draw_doc, _view_port),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height)
{
}

void ClearTask::Execute()
{
    printf("ClearTask x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    context.call<void>("clearRect", x1, y1, width, height);
}

//RenderTask

RenderTask::RenderTask(emscripten::val& _context) :
    Task(_context)
{
}

void RenderTask::Execute()
{
    //printf("RenderTask\n");
}

}

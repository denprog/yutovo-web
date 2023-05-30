#ifndef __TASK_H__
#define __TASK_H__

#include <yutovo_editor/window.h>
#include "fonts.h"

namespace yutovo_web
{

using namespace yutovo;
class WebWindow;

struct Task
{
    Task() = default;
    Task(WebWindow* _web_window, bool _draw_doc);

    virtual void Execute() = 0;

    void DrawPixelWeight(const int x, const int y, const Color& color, const int weight);
    void DrawPixel(const int x, const int y, const Color& color);
    void DrawHLine(const int x1, const int x2, const int y, const Color& color);
    void DrawVLine(const int x, const int y1, const int y2, const Color& color);
    void DrawLine(const int x1, const int y1, const int x2, const int y2, const Color& color);
    void DrawLine(int x1, int y1, int x2, int y2, const Color& color, bool draw_endpoint);

    WebWindow* web_window;
    bool draw_doc;
};

struct DrawLineTask : Task
{
    DrawLineTask(const int _x1, const int _y1, const int _x2, const int _y2, const Color _color, WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    int x1, y1, x2, y2;
    Color color;
};

struct DrawRectTask : Task
{
    DrawRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, 
        WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    int x1, y1, width, height;
    Color color;
};

struct DrawFillRectTask : Task
{
    DrawFillRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, 
        WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    int x1, y1, width, height;
    Color color;
};

struct DrawTextTask : Task
{
    DrawTextTask(const std::string& _text, const StringFormatPtr _format, const Rect& _rect, const Color _color, Fonts& _fonts, 
        WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    std::string text;
    StringFormatPtr format;
    Rect rect;
    Color color;
    Fonts& fonts;
};

struct DrawWavyLineTask : Task
{
    DrawWavyLineTask(const int _x1, const int _y1, const int _width, const int _radius, const Color _color, 
        WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    void DrawArc(const int x, const int y, const int radius, int start, int end);

    int x1, y1, width, radius;
    Color color;
};

struct DrawFillPathTask : Task
{
    DrawFillPathTask(const std::list<Point>& _path, const Color _color, WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    std::list<Point> path;
    Color color;
};

struct StoreRectTask : Task
{
    StoreRectTask(const Rect& _rect, WebWindow* _web_window);

    virtual void Execute();

    Rect rect;
};

struct RestoreRectTask : Task
{
    RestoreRectTask(WebWindow* _web_window);

    virtual void Execute();
};

struct ClearTask : Task
{
    ClearTask(WebWindow* _web_window);

    virtual void Execute();
};

struct ConnectTask : Task
{
    ConnectTask(const std::string& _addr, std::atomic_int32_t& _socket_id);

    virtual void Execute();

    std::string addr;
    std::atomic_int32_t& socket_id;
};

struct IsOpenTask : Task
{
    IsOpenTask(const int _socket_id, std::atomic_int8_t& _is_open);

    virtual void Execute();

    const int socket_id;
    std::atomic_int8_t& is_open;
};

struct SendTask : Task
{
    SendTask(const int _socket_id, const std::string& _message, std::atomic_int8_t& _res);

    virtual void Execute();

    const int socket_id;
    const std::string message;
    std::atomic_int8_t& res;
};

struct ReceiveTask : Task
{
    ReceiveTask(const int _socket_id, std::string& _message, std::atomic_int8_t& _res);

    virtual void Execute();

    const int socket_id;
    std::string& message;
    std::atomic_int8_t& res;
};

struct CloseTask : Task
{
    CloseTask(const int _socket_id, std::atomic_int8_t& _res);

    virtual void Execute();

    const int socket_id;
    std::atomic_int8_t& res;
};

typedef std::shared_ptr<Task> TaskPtr;

}

#endif

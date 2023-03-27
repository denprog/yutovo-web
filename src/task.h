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

typedef std::shared_ptr<Task> TaskPtr;

}

#endif

/*
 * Yutovo Web
 * Copyright (C) 2022-2026 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#ifndef __TASK_H__
#define __TASK_H__

#include <yutovo-editor/window.h>
#include "fonts.h"

namespace yutovo_web
{

using namespace yutovo;
class WebWindow;

struct Task
{
    Task() = default;
    Task(WebWindow* _web_window, bool _draw_doc);
    virtual ~Task() = default;

    virtual void Execute() = 0;

    void DrawPixelWeight(const int x, const int y, const Color& color, const int weight);
    void DrawPixel(const int x, const int y, const Color& color);
    void DrawHLine(const int x1, const int x2, const int y, const Color& color);
    void DrawVLine(const int x, const int y1, const int y2, const Color& color);
    void DrawLine(const int x1, const int y1, const int x2, const int y2, const Color& color);
    void DrawLine(int x1, int y1, int x2, int y2, const Color& color, bool draw_endpoint);
    void DrawFillPath(std::vector<Point>& path, const Color& color);

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
    DrawTextTask(const std::string& _text, const StringFormatPtr _format, const Rect& _rect, const Color _color, const Color _bg_color, const bool _transparent, 
        Fonts& _fonts, WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    std::string text;
    StringFormat format;
    Rect rect;
    Color color;
    Color bg_color;
    bool transparent;
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

struct DrawBezierTask : Task
{
    DrawBezierTask(const std::list<Point>& _path, const Color _color, WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    void DrawBezier();
    double EvaluateBezier(std::vector<double>& data, int size, double t);

    std::list<Point> path;
    Color color;
};

struct DrawImageTask : Task
{
    DrawImageTask(const Rect& _rect, std::vector<unsigned char> _picture, WebWindow* _web_window, bool _draw_doc);

    virtual void Execute();

    std::vector<unsigned char> picture;
    Rect rect;
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

struct ResizeTask : Task
{
    ResizeTask(WebWindow* _web_window, uint _width, uint _height);

    virtual void Execute();

    uint width, height;
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

struct ResetTask : Task
{
    ResetTask(const int _socket_id, std::atomic_int8_t& _res);

    virtual void Execute();

    const int socket_id;
    std::atomic_int8_t& res;
};

struct CloseTask : Task
{
    CloseTask(const int _socket_id, std::atomic_int8_t& _res);

    virtual void Execute();

    const int socket_id;
    std::atomic_int8_t& res;
};

struct FillSizesCacheTask : Task
{
    FillSizesCacheTask(WebWindow* _web_window, const char32_t _symbol, const int _height, const std::string& _family_name);

    virtual void Execute();

    char32_t symbol;
    int height;
    std::string family_name;
};

typedef std::shared_ptr<Task> TaskPtr;

}

#endif

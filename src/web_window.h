#ifndef __WEB_WINDOW_H__
#define __WEB_WINDOW_H__

#include <yutovo_editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <vector>
#include "task.h"

namespace yutovo_web
{

using namespace yutovo;

class WebWindow : public Window
{
public:
    WebWindow(emscripten::val& _canvas);

    virtual void Init();

    virtual void DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color);
    virtual void DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color);
    virtual void DrawRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillEllipse(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillPath(const std::list<Point>& path, const Color color);
    virtual void DrawBezierPath(const std::list<Point>& path, const Color color);

    virtual void ClearRect(const int x1, const int y1, const int width, const int height);

    virtual void ClearSurface();

    virtual void StoreRect(const Rect& rect);
    virtual void RestoreRect();

    virtual Size GetTextSize(const std::u32string& text, const StringFormatPtr format);
    virtual int GetCharPos(const std::string& text, const StringFormatPtr format, int pos);
    virtual int GetFontAscent(const StringFormatPtr format);

    virtual void SetViewPort(const Rect _view_port);
    virtual void AddViewPort(const Rect view_port);
    virtual Rect GetViewPort(const int pos);

    virtual void Update(const Rect& rect);

    virtual void Resize(uint width, uint height);

    virtual Rect GetRect();

    virtual void OnCaretMoved(const EditorState editor_state);

    void RunDrawTasks();
    void RunHelpTasks();

public:
    std::atomic<bool> run_draw_tasks = false;
    std::atomic<bool> run_help_tasks = false;

    EditorState current_editor_state;

private:
    emscripten::val& canvas;
    emscripten::val context;

    Rect view_port{0, 0, 0, 0};

    emscripten::val store_image;
    Rect store_rect;

    std::mutex tasks_mutex;
    std::vector<TaskPtr> draw_tasks;
    std::vector<TaskPtr> help_tasks;
};

}

#endif

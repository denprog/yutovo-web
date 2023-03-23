#include "web_window.h"
#include "utils.h"
#include <chrono>
#include <thread>

namespace yutovo_web
{

using emscripten::val;
using namespace std::chrono_literals;

//WebWindow

WebWindow::WebWindow(emscripten::val& _canvas) :
    canvas(_canvas)
{
    printf("Start WebWindow\n");
    context = canvas.call<val>("getContext", std::string("2d"));
}

void WebWindow::Init()
{
}

void WebWindow::DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color)
{
    //printf("WebWindow::DrawText %s\n", text.c_str());
    std::lock_guard<std::mutex> lock(tasks_mutex);
    draw_tasks.emplace_back(new DrawTextTask(context, text, format, rect, color, draw_doc, view_port));
}

void WebWindow::DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color)
{
    //printf("WebWindow::DrawLine\n");
    std::lock_guard<std::mutex> lock(tasks_mutex);
    draw_tasks.emplace_back(new DrawLineTask(context, x1, y1, x2, y2, color, draw_doc, view_port));
}

void WebWindow::DrawRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    //printf("WebWindow::DrawRect\n");
    std::lock_guard<std::mutex> lock(tasks_mutex);
    draw_tasks.emplace_back(new DrawRectTask(context, x1, y1, width, height, color, draw_doc, view_port));
}

void WebWindow::DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    //printf("WebWindow::DrawFillRect\n");
    std::lock_guard<std::mutex> lock(tasks_mutex);
    draw_tasks.emplace_back(new DrawFillRectTask(context, x1, y1, width, height, color, draw_doc, view_port));
}

void WebWindow::DrawFillEllipse(const int x1, const int y1, const int width, const int height, const Color color)
{
}

void WebWindow::DrawFillPath(const std::list<Point>& path, const Color color)
{
}

void WebWindow::DrawBezierPath(const std::list<Point>& path, const Color color)
{
}

void WebWindow::ClearRect(const int x1, const int y1, const int width, const int height)
{
    //printf("WebWindow::ClearRect\n");
    std::lock_guard<std::mutex> lock(tasks_mutex);
    draw_tasks.emplace_back(new ClearTask(context, x1, y1, width, height, draw_doc, view_port));
}

void WebWindow::ClearSurface()
{
    //printf("WebWindow::ClearSurface\n");
}

void WebWindow::StoreRect(const Rect& rect)
{
    //printf("WebWindow::StoreRect\n");
    Rect r{rect.left - 1, rect.top - 1, rect.width + 2, rect.height + 2};
    {
        std::lock_guard<std::mutex> lock(tasks_mutex);
        help_tasks.emplace_back(new StoreRectTask(context, r, store_image));
    }
    run_help_tasks = true;
    store_rect = r;
}

void WebWindow::RestoreRect()
{
    //printf("WebWindow::RestoreRect\n");
    {
        std::lock_guard<std::mutex> lock(tasks_mutex);
        help_tasks.emplace_back(new RestoreRectTask(context, store_rect.left, store_rect.top, store_image));
    }
    run_help_tasks = true;
}

Size WebWindow::GetTextSize(const std::u32string& text, const StringFormatPtr format)
{
    //("WebWindow::GetTextSize\n");
    Size size;
    std::atomic<bool> size_ready = false;
    {
        std::lock_guard<std::mutex> lock(tasks_mutex);
        help_tasks.emplace_back(new TextMetricsTask(context, ToBasicString(text), format, size, size_ready));
        run_help_tasks = true;
    }
    while (!size_ready)
    {
        std::this_thread::sleep_for(1ms);
    }
    return size;
}

int WebWindow::GetCharPos(const std::string& text, const StringFormatPtr format, int pos)
{
    //printf("WebWindow::GetCharPos\n");
    return 0;
}

int WebWindow::GetFontAscent(const StringFormatPtr format)
{
    //printf("WebWindow::GetFontAscent\n");
    return 0;
}

void WebWindow::SetViewPort(const Rect _view_port)
{
    //printf("WebWindow::SetViewPort %d, %d, %d, %d\n", _view_port.left, _view_port.top, _view_port.width, _view_port.height);
    view_port = _view_port;
}

void WebWindow::AddViewPort(const Rect view_port)
{
}

Rect WebWindow::GetViewPort(const int pos)
{
    //printf("WebWindow::GetViewPort\n");
    return view_port;
}

void WebWindow::Update(const Rect& rect)
{
    //printf("WebWindow::Update\n");
    run_draw_tasks = true;
}

void WebWindow::Resize(uint width, uint height)
{
    //printf("WebWindow::Resize\n");
}

Rect WebWindow::GetRect()
{
    //printf("WebWindow::GetRect\n");
    int w, h, f;
    emscripten_get_canvas_size(&w, &h, &f);
    return Rect{0, 0, w, h};
}

void WebWindow::OnCaretMoved(const EditorState editor_state)
{
    std::unique_lock<std::mutex> lock(tasks_mutex);
    current_editor_state = editor_state;
}

void WebWindow::RunDrawTasks()
{
    std::vector<TaskPtr> temp_tasks;
    run_draw_tasks = false;
    {
        std::unique_lock<std::mutex> lock(tasks_mutex);
        temp_tasks = draw_tasks;
        draw_tasks.clear();
    }

    for (auto& t : temp_tasks)
        t->Execute();
}

void WebWindow::RunHelpTasks()
{ 
    std::vector<TaskPtr> temp_tasks;
    run_help_tasks = false;
    {
        std::unique_lock<std::mutex> lock(tasks_mutex);
        temp_tasks = help_tasks;
        help_tasks.clear();
    }

    for (auto& t : temp_tasks)
        t->Execute();
}

}

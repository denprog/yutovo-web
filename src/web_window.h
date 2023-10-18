#ifndef __WEB_WINDOW_H__
#define __WEB_WINDOW_H__

#include <yutovo_editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <vector>
#include "fonts.h"
#include "task.h"

namespace yutovo_web
{

using namespace yutovo;

class WebWindow : public Window
{
public:
    WebWindow();
    ~WebWindow();

    virtual void Init();

    virtual void DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color, const Color bg_color);
    virtual void DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color);
    virtual void DrawRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillEllipse(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillPath(const std::list<Point>& path, const Color color);
    virtual void DrawBezierPath(const std::list<Point>& path, const Color color);
    virtual void DrawWavyLine(const int x1, const int y1, const int width, const int radius, const Color color);
    virtual void DrawImage(const int x1, const int y1, const int width, const int height, const std::vector<unsigned char>& bmp);

    virtual void ClearRect(const int x1, const int y1, const int _width, const int _height);

    virtual void ClearSurface();

    virtual void StoreRect(const Rect& rect);
    virtual void RestoreRect();

    virtual Size GetTextSize(const std::u32string& text, const StringFormatPtr format);
    virtual int GetCharPos(const std::u32string& text, const StringFormatPtr format, int pos);
    virtual int GetFontAscent(const StringFormatPtr format);
    virtual Size GetImageSize(const std::vector<unsigned char>& bmp, const int width, const int height);

    virtual void SetViewPort(const Rect _view_port);
    virtual void AddViewPort(const Rect view_port);
    virtual Rect GetViewPort(const int pos);

    virtual void Update(const Rect& rect);

    virtual void Resize(uint width, uint height);

    virtual Rect GetRect();

    virtual void OnFormatChanged(const EditorState editor_state);

    virtual void OnCaretMoved(const EditorState editor_state);

    virtual void OnSaveResult(const uint task_id, IOResult result);
    virtual void OnLoadResult(const uint task_id, IOResult result);

    virtual int Connect(const std::string& addr);
    virtual bool Send(const int socket_id, const std::string& message);
    virtual bool Receive(const int socket_id, std::string& message);
    virtual bool IsOpen(const int socket_id);
    virtual bool Close(const int socket_id);

    void Render(SDL_Renderer* dest_renderer, SDL_Surface* dest_surface);

    void SocketTasks();

public:
    std::mutex draw_mutex;

    EditorState current_editor_state;

    std::atomic_bool needs_render{false};
    std::atomic_bool update_toolbar{false};
    std::atomic_bool save_ready{false};

    SDL_Renderer* renderer = nullptr;

    SDL_Rect view_port{0, 0, 0, 0};

private:
    friend struct DrawTextTask;
    friend struct DrawLineTask;
    friend struct DrawRectTask;
    friend struct DrawFillRectTask;
    friend struct DrawWavyLineTask;
    friend struct StoreRectTask;
    friend struct RestoreRectTask;
    friend struct ClearTask;
    
    int width = 0, height = 0;
    SDL_Surface* surface = nullptr;

    SDL_Rect store_rect;
    SDL_Texture* stored_texture = nullptr;

    emscripten::val store_image;

    Fonts fonts;

    std::vector<TaskPtr> tasks; //draw tasks to be executed on Update

    std::mutex socket_mutex;
    std::vector<TaskPtr> socket_tasks;
};

}

#endif

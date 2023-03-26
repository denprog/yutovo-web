#ifndef __WEB_WINDOW_H__
#define __WEB_WINDOW_H__

#include <yutovo_editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <vector>
#include "fonts.h"

namespace yutovo_web
{

using namespace yutovo;

class WebWindow : public Window
{
public:
    WebWindow();
    ~WebWindow();

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
    virtual int GetCharPos(const std::u32string& text, const StringFormatPtr format, int pos);
    virtual int GetFontAscent(const StringFormatPtr format);

    virtual void SetViewPort(const Rect _view_port);
    virtual void AddViewPort(const Rect view_port);
    virtual Rect GetViewPort(const int pos);

    virtual void Update(const Rect& rect);

    virtual void Resize(uint width, uint height);

    virtual Rect GetRect();

    virtual void OnCaretMoved(const EditorState editor_state);

    void Draw(SDL_Renderer* _renderer, SDL_Surface* _surface);

public:
    std::mutex draw_mutex;
    std::atomic<bool> needs_update = false;

    EditorState current_editor_state;

private:
    int width = 0, height = 0;
    SDL_Renderer* renderer = nullptr;
    SDL_Surface* surface = nullptr;

    SDL_Rect store_rect;
    SDL_Texture* stored_texture = nullptr;

    SDL_Rect view_port{0, 0, 0, 0};

    emscripten::val store_image;

    Fonts fonts;
};

}

#endif

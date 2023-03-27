#include "web_window.h"
#include "utils.h"
#include <emscripten/em_js.h>
#include <chrono>
#include <thread>

namespace yutovo_web
{

using emscripten::val;

//WebWindow

WebWindow::WebWindow()
{
    printf("Start WebWindow\n");
    int f;
    emscripten_get_canvas_size(&width, &height, &f);
}

WebWindow::~WebWindow()
{
    if (surface)
        SDL_FreeSurface(surface);
    if (renderer)
        SDL_DestroyRenderer(renderer);
}

void WebWindow::Init()
{
    SDL_Init(SDL_INIT_EVERYTHING);
    int r = TTF_Init();
    if (r < 0)
    {
        printf("TTF_Init error: %s\n", TTF_GetError());
        return;
    }

    surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    renderer = SDL_CreateSoftwareRenderer(surface);
    if (!renderer)
    {
        printf("SDL_CreateRenderer error: %s\n", TTF_GetError());
        return;
    }
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
    SDL_RenderClear(renderer);
}

void WebWindow::DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color)
{
    tasks.emplace_back(new DrawTextTask(text, format, rect, color, fonts, this, draw_doc));
}

void WebWindow::DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color)
{
    tasks.emplace_back(new DrawLineTask(x1, y1, x2, y2, color, this, draw_doc));
}

void WebWindow::DrawRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    tasks.emplace_back(new DrawRectTask(x1, y1, width, height, color, this, draw_doc));
}

void WebWindow::DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    tasks.emplace_back(new DrawFillRectTask(x1, y1, width, height, color, this, draw_doc));
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

void WebWindow::ClearRect(const int x1, const int y1, const int _width, const int _height)
{
    if (x1 == 0 && y1 == 0 && _width == width && _height == height)
        ClearSurface(); //more efficient
    else
        DrawFillRect(x1, y1, width, height, Color::White());
}

void WebWindow::ClearSurface()
{
    tasks.emplace_back(new ClearTask(this));
}

void WebWindow::StoreRect(const Rect& rect)
{
    tasks.emplace_back(new StoreRectTask(rect, this));
}

void WebWindow::RestoreRect()
{
    tasks.emplace_back(new RestoreRectTask(this));
}

Size WebWindow::GetTextSize(const std::u32string& text, const StringFormatPtr format)
{
    //printf("WebWindow::GetTextSize\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    TTF_Font* font = fonts.Get(format);
    if (!font)
        return Size{0, 0};

    std::string s = boost::locale::conv::utf_to_utf<char>(text);
    int w, h;
    TTF_SizeText(font, s.c_str(), &w, &h);
    //printf("Text size=%d,%d\n", w, h);
    return Size{w, h};
}

int WebWindow::GetCharPos(const std::u32string& text, const StringFormatPtr format, int pos)
{
    ////printf("WebWindow::GetCharPos\n");
    Size s;
    if (pos == text.length())
        s = GetTextSize(text, format);
    else
    {
        Size s1 = GetTextSize(text.substr(0, pos + 1), format);
        Size s2 = GetTextSize(text.substr(pos, 1), format);
        s.width = s1.width - s2.width;
    }
    return s.width;
}

int WebWindow::GetFontAscent(const StringFormatPtr format)
{
    ////printf("WebWindow::GetFontAscent\n");
    TTF_Font* font = fonts.Get(format);
    if (!font)
        return 0;
    return TTF_FontAscent(font);
}

void WebWindow::SetViewPort(const Rect _view_port)
{
    view_port = yutovo_web::GetRect(_view_port);
}

void WebWindow::AddViewPort(const Rect view_port)
{
}

Rect WebWindow::GetViewPort(const int pos)
{
    return yutovo_web::GetRect(view_port);
}

void WebWindow::Update(const Rect& rect)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    //printf("WebWindow::Update rect={%d, %d, %d, %d}\n", rect.left, rect.top, rect.width, rect.height);
    draw_rects.emplace_back(SDL_Rect{rect.left - document_point.x, rect.top - document_point.y, rect.width, rect.height});
    for (auto& t : tasks) //execute all tasks before Draw
        t->Execute();
    tasks.clear();
}

void WebWindow::Resize(uint _width, uint _height)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    //printf("WebWindow::Resize width=%d height=%d\n", _width, _height);
    width = _width;
    height = _height;
    if (surface)
        SDL_FreeSurface(surface);
    if (renderer)
        SDL_DestroyRenderer(renderer);
    surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    renderer = SDL_CreateSoftwareRenderer(surface);
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
    ClearSurface();
    // SDL_RenderClear(renderer);
    // draw_rects.emplace_back(SDL_Rect{0, 0, width, height});
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
    std::lock_guard<std::mutex> lock(draw_mutex);
    current_editor_state = editor_state;
}

void WebWindow::Draw(SDL_Renderer* dest_renderer, SDL_Surface* dest_surface)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    if (draw_rects.empty())
        return;

    SDL_RenderClear(dest_renderer);

    for (auto& rect : draw_rects) //copy drawn rects on the dest surface
    {
        //printf("WebWindow::Draw rect={%d, %d, %d, %d}\n", rect.x, rect.y, rect.w, rect.h);
        //SDL_RenderClear(dest_renderer);

        if (SDL_MUSTLOCK(surface))
            SDL_LockSurface(surface);
        if (SDL_MUSTLOCK(dest_surface))
            SDL_LockSurface(dest_surface);
        
        //int r = SDL_BlitSurface(surface, &rect, dest_surface, &rect);
        int r = SDL_BlitSurface(surface, nullptr, dest_surface, nullptr);
        if (r < 0)
        {
            printf("SDL_BlitSurface error: %s\n", TTF_GetError());
            return;
        }

        SDL_UnlockSurface(dest_surface);
        SDL_UnlockSurface(surface);

        SDL_Texture *texture = SDL_CreateTextureFromSurface(dest_renderer, dest_surface);
        SDL_RenderCopy(dest_renderer, texture, NULL, NULL);
        SDL_DestroyTexture(texture);
    }

    SDL_RenderPresent(dest_renderer);

    draw_rects.clear();
}

}

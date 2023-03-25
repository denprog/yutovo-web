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
    //printf("Start WebWindow\n");
    int f;
    emscripten_get_canvas_size(&width, &height, &f);
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
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
    SDL_RenderClear(renderer);
}

void WebWindow::DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color)
{
    //printf("WebWindow::DrawText %s\n", text.c_str());
    if (text.length() == 0)
        return;
    std::lock_guard<std::mutex> lock(draw_mutex);
    TTF_Font* font = GetFont(format);
    SDL_SetRenderDrawColor(renderer, color.r, color.g, color.b, color.a);
    SDL_Surface* text_surface = TTF_RenderText_Solid(font, text.c_str(), GetColor(color));
    if (!text_surface)
    {
        printf("TTF_RenderText_Solid error: %s\n", TTF_GetError());
        return;
    }
    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer, text_surface);
    if (!texture)
    {
        printf("SDL_CreateTextureFromSurface error: %s\n", TTF_GetError());
        return;
    }

    int w, h;
    SDL_QueryTexture(texture, nullptr, nullptr, &w, &h);

    if (draw_doc)
        SDL_RenderSetClipRect(renderer, &view_port);
    else
        SDL_RenderSetClipRect(renderer, nullptr);
    SDL_Rect r{rect.left - document_point.x, rect.top - document_point.y, w, h};
    SDL_RenderCopy(renderer, texture, NULL, &r);
    SDL_FreeSurface(text_surface);
    SDL_DestroyTexture(texture);
}

void WebWindow::DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color)
{
    //printf("WebWindow::DrawLine\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    if (draw_doc)
        SDL_RenderSetClipRect(renderer, &view_port);
    else
        SDL_RenderSetClipRect(renderer, nullptr);
    SDL_SetRenderDrawColor(renderer, color.r, color.g, color.b, color.a);
    SDL_RenderDrawLine(renderer, x1 - document_point.x, y1 - document_point.y, x2 - document_point.x, y2 - document_point.y);
}

void WebWindow::DrawRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    //printf("WebWindow::DrawRect\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    if (draw_doc)
        SDL_RenderSetClipRect(renderer, &view_port);
    else
        SDL_RenderSetClipRect(renderer, nullptr);
    SDL_SetRenderDrawColor(renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - document_point.x : x1, draw_doc ? y1 - document_point.y : y1, width, height};
    SDL_RenderDrawRect(renderer, &r);
}

void WebWindow::DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color)
{
    //printf("WebWindow::DrawFillRect\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    if (draw_doc)
        SDL_RenderSetClipRect(renderer, &view_port);
    else
        SDL_RenderSetClipRect(renderer, nullptr);
    SDL_SetRenderDrawColor(renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - document_point.x : x1, draw_doc ? y1 - document_point.y : y1, width, height};
    SDL_RenderFillRect(renderer, &r);
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
    DrawFillRect(x1, y1, width, height, Color::White());
}

void WebWindow::ClearSurface()
{
    DrawFillRect(0, 0, width, height, Color::White());
}

void WebWindow::StoreRect(const Rect& rect)
{
    //printf("WebWindow::StoreRect\n");
    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer, surface);
    Uint32 format;
    int access;
    int w, h;
    SDL_QueryTexture(texture, &format, &access, &w, &h);
    stored_texture = SDL_CreateTexture(renderer, format, SDL_TEXTUREACCESS_TARGET, rect.width, rect.height);
    if (!stored_texture)
    {
        printf("SDL_CreateTexture error: %s\n", TTF_GetError());
        SDL_DestroyTexture(texture);
        return;
    }
    SDL_SetRenderTarget(renderer, stored_texture);
    store_rect = yutovo_web::GetRect(rect);
    store_rect.x -= document_point.x;
    store_rect.y -= document_point.y;
    SDL_RenderCopy(renderer, texture, &store_rect, 0);
    SDL_SetRenderTarget(renderer, 0);
    SDL_DestroyTexture(texture);
}

void WebWindow::RestoreRect()
{
    //printf("WebWindow::RestoreRect\n");
    if (!stored_texture)
        return;
    SDL_RenderCopy(renderer, stored_texture, nullptr, &store_rect);
}

Size WebWindow::GetTextSize(const std::u32string& text, const StringFormatPtr format)
{
    //printf("WebWindow::GetTextSize\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    TTF_Font* font = GetFont(format);
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
    TTF_Font* font = GetFont(format);
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
    //printf("WebWindow::Update\n");
    std::lock_guard<std::mutex> lock(draw_mutex);
    needs_update = true;
}

void WebWindow::Resize(uint width, uint height)
{
    ////printf("WebWindow::Resize\n");
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

void WebWindow::Draw(SDL_Renderer* _renderer, SDL_Surface* _surface)
{
    //printf("WebWindow::Draw\n");
    std::lock_guard<std::mutex> lock(draw_mutex);

    SDL_RenderClear(_renderer);

    if (SDL_MUSTLOCK(surface))
        SDL_LockSurface(surface);
    if (SDL_MUSTLOCK(_surface))
        SDL_LockSurface(_surface);
    
    SDL_Rect rect{0, 0, 400, 400};
    int r = SDL_BlitSurface(surface, &rect, _surface, &rect);
    if (r < 0)
    {
        printf("SDL_BlitSurface error: %s\n", TTF_GetError());
        return;
    }

    SDL_UnlockSurface(_surface);
    SDL_UnlockSurface(surface);

    SDL_Texture *texture = SDL_CreateTextureFromSurface(_renderer, _surface);

    SDL_RenderClear(_renderer);
    SDL_RenderCopy(_renderer, texture, NULL, NULL);
    SDL_RenderPresent(_renderer);

    SDL_DestroyTexture(texture);

    needs_update = false;
}

}

#include "web_window.h"
#include "utils.h"
#include <emscripten/em_js.h>
#include <SDL2/SDL_image.h>
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

    r = IMG_Init(IMG_INIT_PNG);
    if (r < 0)
    {
        printf("IMG_Init error: %s\n", TTF_GetError());
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

void WebWindow::DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color, const Color bg_color)
{
    tasks.emplace_back(new DrawTextTask(text, format, rect, color, bg_color, fonts, this, draw_doc));
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
    tasks.emplace_back(new DrawFillPathTask(path, color, this, draw_doc));
}

void WebWindow::DrawBezierPath(const std::list<Point>& path, const Color color)
{
    tasks.emplace_back(new DrawBezierTask(path, color, this, draw_doc));
}

void WebWindow::DrawWavyLine(const int x1, const int y1, const int width, const int radius, const Color color)
{
    tasks.emplace_back(new DrawWavyLineTask(x1, y1, width, radius, color, this, draw_doc));
}

void WebWindow::DrawImage(const int x1, const int y1, const int width, const int height, const std::vector<unsigned char>& bmp)
{
    tasks.emplace_back(new DrawImageTask(Rect{x1, y1, width, height}, bmp, this, draw_doc));
}

void WebWindow::ClearRect(const int x1, const int y1, const int _width, const int _height)
{
    if (x1 == 0 && y1 == 0 && _width == width && _height == height)
        ClearSurface(); //more efficient
    else
        DrawFillRect(x1, y1, _width, _height, Color::White());
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
    TTF_SizeUTF8(font, s.c_str(), &w, &h);
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

Size WebWindow::GetImageSize(const std::vector<unsigned char>& picture, const int width, const int height)
{
    SDL_RWops* p = SDL_RWFromConstMem(&picture[0], picture.size());
    if (!p)
    {
        printf("SDL_RWFromConstMem error: %s\n", SDL_GetError());
        return Size{};
    }

    SDL_Surface* surface = IMG_LoadTyped_RW(p, 1, "PNG");
    if (!surface)
    {
        //try to load as bmp
        p = SDL_RWFromConstMem(&picture[0], picture.size());
        surface = SDL_LoadBMP_RW(p, 1);
        if (!surface)
        {
            printf("IMG_Load_RW error: %s\n", SDL_GetError());
            return Size{};
        }
    }
    
    Size s{surface->w, surface->h};
    SDL_FreeSurface(surface);
    return s;
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
    //printf("Update %d, %d, %d, %d\n", rect.left, rect.top, rect.width, rect.height);
    std::lock_guard<std::mutex> lock(draw_mutex);
    for (auto& t : tasks) //execute all tasks before Draw
        t->Execute();
    tasks.clear();
    needs_render = true;
}

void WebWindow::Resize(uint _width, uint _height)
{
    tasks.emplace_back(new ResizeTask(this, width, height));
}

Rect WebWindow::GetRect()
{
    int w, h, f;
    emscripten_get_canvas_size(&w, &h, &f);
    return Rect{0, 0, w, h};
}

void WebWindow::OnFormatChanged(const EditorState editor_state)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    current_editor_state = editor_state;
    update_toolbar = true;
}

std::string WebWindow::Translate(ElementId id, const std::string& str)
{
    std::lock_guard<std::mutex> lock(translate_mutex);
    translate_tasks.push_back(std::make_pair(id, str));
    needs_translate = true;
    return "";
}

std::u32string WebWindow::Translate(ElementId id, const std::u32string& str)
{
    std::lock_guard<std::mutex> lock(translate_mutex);
    translate_tasks.push_back(std::make_pair(id, ToBasicString(str)));
    needs_translate = true;
    return U"";
}

void WebWindow::OnCaretMoved(const EditorState editor_state)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    current_editor_state = editor_state;
    update_toolbar = true;
}

void WebWindow::OnLanguageChanged(const yutovo_calculator::Language language)
{
    update_language = true;
}

void WebWindow::OnSaveResult(const uint task_id, IOResult result)
{
    if (result == IOResult::Success)
        save_ready = true;
}

void WebWindow::OnLoadResult(const uint task_id, IOResult result)
{
}

int WebWindow::Connect(const std::string& addr)
{
    std::atomic_int32_t socket_id = -1;
    {
        std::lock_guard<std::mutex> lock(socket_mutex);
        socket_tasks.emplace_back(new ConnectTask("ws://" + addr, socket_id));
    }
    while (socket_id == -1)
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    return socket_id;
}

bool WebWindow::Send(const int socket_id, const std::string& message)
{
    std::atomic_int8_t res{-1};
    {
        std::lock_guard<std::mutex> lock(socket_mutex);
        socket_tasks.emplace_back(new SendTask(socket_id, message, res));
    }
    while (res == -1)
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    return res > 0;
}

bool WebWindow::Receive(const int socket_id, std::string& message)
{
    std::atomic_int8_t res{-1};
    {
        std::lock_guard<std::mutex> lock(socket_mutex);
        socket_tasks.emplace_back(new ReceiveTask(socket_id, message, res));
    }
    while (res == -1)
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    return res > 0;
}

bool WebWindow::IsOpen(const int socket_id)
{
    std::atomic_int8_t is_open{-1};
    {
        std::lock_guard<std::mutex> lock(socket_mutex);
        socket_tasks.emplace_back(new IsOpenTask(socket_id, is_open));
    }
    while (is_open == -1)
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    return is_open > 0;
}

bool WebWindow::Close(const int socket_id)
{
    std::atomic_int8_t res{-1};
    {
        std::lock_guard<std::mutex> lock(socket_mutex);
        socket_tasks.emplace_back(new CloseTask(socket_id, res));
    }
    while (res == -1)
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    return res > 0;
}

void WebWindow::Render(SDL_Renderer* dest_renderer, SDL_Surface* dest_surface)
{
    std::lock_guard<std::mutex> lock(draw_mutex);
    needs_render = false;

    SDL_RenderClear(dest_renderer);

    if (SDL_MUSTLOCK(surface))
        SDL_LockSurface(surface);
    if (SDL_MUSTLOCK(dest_surface))
        SDL_LockSurface(dest_surface);
    
    int r = SDL_BlitSurface(surface, nullptr, dest_surface, nullptr);
    if (r < 0)
    {
        printf("SDL_BlitSurface error: %s\n", TTF_GetError());
        return;
    }

    SDL_UnlockSurface(dest_surface);
    SDL_UnlockSurface(surface);

    SDL_Texture *texture = SDL_CreateTextureFromSurface(dest_renderer, dest_surface);
    SDL_RenderCopyF(dest_renderer, texture, NULL, NULL);
    SDL_DestroyTexture(texture);

    SDL_RenderPresent(dest_renderer);
}

void WebWindow::SocketTasks()
{
    std::lock_guard<std::mutex> lock(socket_mutex);
    for (auto& t : socket_tasks)
    {
        t->Execute();
    }
    socket_tasks.clear();
}

void WebWindow::GetTranslateTasks(std::vector<std::pair<yutovo::ElementId, std::string>>& _translate_tasks)
{
    std::lock_guard<std::mutex> lock(translate_mutex);
    _translate_tasks = translate_tasks;
    translate_tasks.clear();
}

}

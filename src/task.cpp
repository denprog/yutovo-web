#include "task.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include "utils.h"
#include "web_window.h"

namespace yutovo_web
{

//Task

Task::Task(WebWindow* _web_window, bool _draw_doc) :
    web_window(_web_window),
    draw_doc(_draw_doc)
{
}

//DrawLineTask

DrawLineTask::DrawLineTask(const int _x1, const int _y1, const int _x2, const int _y2, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    x2(_x2),
    y2(_y2),
    color(_color)
{
}

void DrawLineTask::Execute()
{
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_RenderDrawLine(web_window->renderer, x1 - web_window->document_point.x, y1 - web_window->document_point.y, 
        x2 - web_window->document_point.x, y2 - web_window->document_point.y);
}

//DrawRectTask

DrawRectTask::DrawRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height),
    color(_color)
{
}

void DrawRectTask::Execute()
{
    //printf("WebWindow::DrawRect x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - web_window->document_point.x : x1, draw_doc ? y1 - web_window->document_point.y : y1, width, height};
    SDL_RenderDrawRect(web_window->renderer, &r);
}

//DrawFillRectTask

DrawFillRectTask::DrawFillRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, 
    WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height),
    color(_color)
{
}

void DrawFillRectTask::Execute()
{
    //printf("WebWindow::DrawFillRect x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - web_window->document_point.x : x1, draw_doc ? y1 - web_window->document_point.y : y1, width, height};
    SDL_RenderFillRect(web_window->renderer, &r);
}

//DrawTextTask

DrawTextTask::DrawTextTask(const std::string& _text, const StringFormatPtr _format, const Rect& _rect, const Color _color, Fonts& _fonts, 
    WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    text(_text),
    format(_format),
    rect(_rect),
    color(_color),
    fonts(_fonts)
{
}

void DrawTextTask::Execute()
{
    if (text.length() == 0)
        return;
    TTF_Font* font = fonts.Get(format);
    if (!font)
        return;
    
    //printf("WebWindow::DrawText %s, rect={%d, %d, %d, %d}\n", text.c_str(), rect.left, rect.top, rect.width, rect.height);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Surface* text_surface = TTF_RenderUTF8_Solid(font, text.c_str(), GetColor(color));
    if (!text_surface)
    {
        printf("TTF_RenderUTF8_Solid error: %s\n", TTF_GetError());
        return;
    }
    SDL_Texture* texture = SDL_CreateTextureFromSurface(web_window->renderer, text_surface);
    if (!texture)
    {
        printf("SDL_CreateTextureFromSurface error: %s\n", TTF_GetError());
        return;
    }

    int w, h;
    SDL_QueryTexture(texture, nullptr, nullptr, &w, &h);

    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_Rect r{rect.left - web_window->document_point.x, rect.top - web_window->document_point.y, w, h};
    SDL_RenderCopy(web_window->renderer, texture, NULL, &r);
    SDL_FreeSurface(text_surface);
    SDL_DestroyTexture(texture);
}

//StoreRectTask

StoreRectTask::StoreRectTask(const Rect& _rect, WebWindow* _web_window) :
    Task(_web_window, false),
    rect(_rect)
{
}

void StoreRectTask::Execute()
{
    //printf("WebWindow::StoreRect\n");
    SDL_Texture* texture = SDL_CreateTextureFromSurface(web_window->renderer, web_window->surface);
    Uint32 format;
    int access;
    int w, h;
    SDL_QueryTexture(texture, &format, &access, &w, &h);
    web_window->stored_texture = SDL_CreateTexture(web_window->renderer, format, SDL_TEXTUREACCESS_TARGET, rect.width, rect.height);
    if (!web_window->stored_texture)
    {
        printf("SDL_CreateTexture error: %s\n", TTF_GetError());
        SDL_DestroyTexture(texture);
        return;
    }
    SDL_SetRenderTarget(web_window->renderer, web_window->stored_texture);
    web_window->store_rect = yutovo_web::GetRect(rect);
    web_window->store_rect.x -= web_window->document_point.x;
    web_window->store_rect.y -= web_window->document_point.y;
    SDL_RenderCopy(web_window->renderer, texture, &web_window->store_rect, 0);
    SDL_SetRenderTarget(web_window->renderer, 0);
    SDL_DestroyTexture(texture);
}

//RestoreRectTask

RestoreRectTask::RestoreRectTask(WebWindow* _web_window) :
    Task(_web_window, false)
{
}

void RestoreRectTask::Execute()
{
    //printf("WebWindow::RestoreRect\n");
    if (!web_window->stored_texture)
        return;
    SDL_RenderCopy(web_window->renderer, web_window->stored_texture, nullptr, &web_window->store_rect);
}

//ClearTask

ClearTask::ClearTask(WebWindow* _web_window) :
    Task(_web_window, false)
{
}

void ClearTask::Execute()
{
    SDL_RenderClear(web_window->renderer);
}

//ConnectTask

EM_JS(int, ConnectJs, (const char* addr),
    {
        let socket = new WebSocket(UTF8ToString(addr));
        socket.last_message = "";
        socket.onmessage = function(event)
            {
                socket.last_message = event.data;
                socket.temp = 555;
            };

        const WaitForConnection = (s) => 
            {
                return new Promise((resolve, reject) =>
                    {
                        const attempts = 10;
                        const interval_time = 200; //ms

                        let cur_attempt = 0;
                        const interval = setInterval(() =>
                            {
                                if (cur_attempt > attempts - 1)
                                {
                                    clearInterval(interval);
                                    reject(new Error('Maximum number of attempts exceeded'));
                                }
                                else if (socket.readyState === socket.OPEN)
                                {
                                    clearInterval(interval);
                                    resolve();
                                }
                                cur_attempt++;
                            }, interval_time);
                    });
            };

        try
        {
            WaitForConnection(socket);
            window.sockets.set(window.socket_id, socket);
        }
        catch (err)
        {
            return 0;
        }
        return window.socket_id++;
    });

ConnectTask::ConnectTask(const std::string& _addr, std::atomic_int32_t& _socket_id) :
    addr(_addr),
    socket_id(_socket_id)
{
}

void ConnectTask::Execute()
{
    socket_id = ConnectJs(addr.c_str());
}

//IsOpenTask

EM_JS(int, IsOpenJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined")
            return 0;
        return socket.readyState === socket.OPEN;
    });

IsOpenTask::IsOpenTask(const int _socket_id, std::atomic_int8_t& _is_open) :
    socket_id(_socket_id),
    is_open(_is_open)
{
}

void IsOpenTask::Execute()
{
    is_open = IsOpenJs(socket_id);
}

//SendTask

EM_JS(bool, SendJs, (const int socket_id, const char* message),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined")
            return 0;
        try
        {
            socket.send(UTF8ToString(message));
        }
        catch (err)
        {
            return 0;
        }
        return 1;
    });

SendTask::SendTask(const int _socket_id, const std::string& _message, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    message(_message),
    res(_res)
{
}

void SendTask::Execute()
{
    res = SendJs(socket_id, message.c_str());
}

//ReceiveTask

EM_JS(char*, ReceiveJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined")
            return 0;

        const WaitForMessage = (s) => 
            {
                return new Promise((resolve, reject) =>
                    {
                        const attempts = 10;
                        const interval_time = 200; //ms

                        let cur_attempt = 0;
                        const interval = setInterval(() =>
                            {
                                if (cur_attempt > attempts - 1)
                                {
                                    clearInterval(interval);
                                    reject(new Error('Maximum number of attempts exceeded'));
                                }
                                else if (socket.last_message != "")
                                {
                                    clearInterval(interval);
                                    resolve();
                                }
                                cur_attempt++;
                            }, interval_time);
                    });
            };

        try
        {
            if (socket.last_message == "")
                WaitForMessage(socket);
            var str = _malloc(socket.last_message.length + 1);
            stringToUTF8(socket.last_message, str, socket.last_message.length + 1);
            socket.last_message = "";
            return str;
        }
        catch (err)
        {
            return 0;
        }
    });

ReceiveTask::ReceiveTask(const int _socket_id, std::string& _message, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    message(_message),
    res(_res)
{
}

void ReceiveTask::Execute()
{
    char* str = ReceiveJs(socket_id);
    if (!str)
    {
        res = 0;
        return;
    }
    message = std::string(str);
    res = 1;
}

//CloseTask

EM_JS(bool, CloseJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined")
            return 0;
        try
        {
            socket.close();
        }
        catch (err)
        {
            return 0;
        }
        return 1;
    });

CloseTask::CloseTask(const int _socket_id, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    res(_res)
{
}

void CloseTask::Execute()
{
    res = CloseJs(socket_id);
}

}

/*
 * Yutovo Web
 * Copyright (C) 2022-2026 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#ifndef __WEB_WINDOW_H__
#define __WEB_WINDOW_H__

#include <yutovo-editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <emscripten.h>
#include <emscripten/val.h>
#include <vector>
#include <queue>
#include "fonts.h"
#include "task.h"

namespace yutovo_web
{

using namespace yutovo;

class WebWindow : public Window
{
public:
    WebWindow();
    WebWindow(const int _width, const int _height);
    ~WebWindow();

    virtual void Init(Document* _document);

    virtual void DrawText(const std::string& text, const StringFormatPtr format, const Rect& rect, const Color color, const Color bg_color, 
        const bool transparent);
    virtual void DrawLine(const int x1, const int y1, const int x2, const int y2, const Color color);
    virtual void DrawRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillRect(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillEllipse(const int x1, const int y1, const int width, const int height, const Color color);
    virtual void DrawFillPath(const std::list<Point>& path, const Color color);
    virtual void DrawBezierPath(const std::list<Point>& path, const Color color);
    virtual void DrawWavyLine(const int x1, const int y1, const int width, const int radius, const Color color);
    virtual void DrawImage(const int x1, const int y1, const int width, const int height, const std::vector<unsigned char>& bmp);
    virtual int GetSymbolSize(const char32_t symbol, const int height, const std::string& family_name, Size& size, int& baseline);
    virtual void PrepareSymbolsSizes(const std::vector<std::tuple<char32_t, std::string, int>>& _symbols_sizes);

    virtual void ClearRect(const int x1, const int y1, const int _width, const int _height, const Color color);

    virtual void ClearSurface();

    virtual void StoreRect(const Rect& rect);
    virtual void RestoreRect();

    virtual Size GetTextSize(const std::u32string& text, const StringFormatPtr format);
    virtual int GetCharPos(const std::u32string& text, const StringFormatPtr format, int pos);
    virtual int GetFontAscent(const StringFormatPtr format);
    virtual Size GetImageSize(const std::vector<unsigned char>& picture);

    virtual void SetViewPort(const Rect _view_port);
    virtual void AddViewPort(const Rect view_port);
    virtual Rect GetViewPort(const int pos);

    virtual void Update(const Rect& rect);

    virtual void Resize(uint width, uint height);

    virtual Rect GetRect();

    virtual void OnFormatChanged(const EditorState editor_state);

    virtual void OnDocumentChanged(const bool changed);

    virtual void OnIdentifierChanged(const ElementId id);

    virtual std::string Translate(ElementId id, const std::string& str);
    virtual std::u32string Translate(ElementId id, const std::u32string& str);
    
    virtual void OnCaretMoved(const EditorState editor_state);

    virtual void OnLanguageChanged(const yutovo_calculator::Language language);

    virtual void OnSaveResult(const uint task_id, IOResult result, const int document_id);
    virtual void OnLoadResult(const uint task_id, IOResult result, const int document_id);

    virtual void OnLoadInclude(const std::string& file_name, const int document_id);

    virtual void OnIdentifiersReceived(std::string json);

    virtual void OnLinkClicked(const ElementId& id, const std::u32string& url);

    virtual void OnSolverAction(const std::string& json);

    virtual void OnSetConfig();

    virtual int Connect(const std::string& addr);
    virtual bool Send(const int socket_id, const std::string& message);
    virtual bool Receive(const int socket_id, std::string& message);
    virtual bool Reset(const int socket_id);
    virtual bool IsOpen(const int socket_id);
    virtual bool Close(const int socket_id);

    void Reset();

    void Render(SDL_Renderer* dest_renderer, SDL_Surface* dest_surface);
    void Render(std::vector<unsigned char>& picture);

    void SocketTasks();

    void GetTranslateTasks(std::vector<std::pair<yutovo::ElementId, std::string>>& _translate_tasks);
    int GetCachedSize(const char32_t symbol, const int height, const std::string& family_name, Size& size, int& baseline);
    void CacheTasks();
    bool GetLoadResult(IOResult& result, int& document_id);
    void GetClickedLink(std::string& url);
    void GetIncludeDocuments(std::vector<std::pair<std::string, int>>& documents);
    void GetSolverActions(std::vector<std::string>& _solver_actions);

public:
    std::recursive_mutex draw_mutex;

    EditorState current_editor_state;

    std::atomic_bool needs_render{false};
    std::atomic_bool update_toolbar{false};
    std::atomic_bool save_ready{false};
    std::atomic_bool needs_translate{false};
    std::atomic_bool update_language{false};
    std::atomic_bool fill_cache{false};
    std::atomic_bool load_ready{false};
    std::atomic_bool update_identifiers{false};
    std::atomic_bool identifiers_ready{false};
    std::atomic_bool link_ready{false};
    std::atomic_bool solver_action_ready{false};
    std::atomic_bool include_documents_ready{false};
    std::atomic_bool document_changed{false};
    std::atomic_bool set_config{false};

    SDL_Renderer* renderer = nullptr;

    SDL_Rect view_port{0, 0, 0, 0};

    std::recursive_mutex results_mutex;
    std::queue<std::pair<IOResult, int>> load_results;
    std::vector<std::pair<std::string, int>> include_documents;

    std::string identifers_json;

    std::string link_clicked;

    std::recursive_mutex solver_actions_mutex;
    std::vector<std::string> solver_actions;

private:
    friend struct DrawTextTask;
    friend struct DrawLineTask;
    friend struct DrawRectTask;
    friend struct DrawFillRectTask;
    friend struct DrawWavyLineTask;
    friend struct StoreRectTask;
    friend struct RestoreRectTask;
    friend struct ClearTask;
    friend struct ResizeTask;
    
    int width = 0, height = 0;
    SDL_Surface* surface = nullptr;

    SDL_Rect store_rect;
    SDL_Texture* stored_texture = nullptr;

    Fonts fonts;

    std::vector<TaskPtr> tasks; //draw tasks to be executed on Update

    std::recursive_mutex socket_mutex;
    std::vector<TaskPtr> socket_tasks;

    std::vector<TaskPtr> cache_tasks;

    std::recursive_mutex translate_mutex;
    std::vector<std::pair<yutovo::ElementId, std::string>> translate_tasks;

    struct SymbolSize
    {
        int height = 0;
        int font_size = 0;
        yutovo::Size symbol_size;
        int baseline = 0;
    };

    std::recursive_mutex sizes_cache_mutex;
    std::vector<std::tuple<char32_t, std::string, int>> symbols_sizes;
    typedef std::map<std::string, std::vector<SymbolSize>> FontSymbolSizes;
    std::map<char32_t, FontSymbolSizes> sizes_cache;
};

}

#endif

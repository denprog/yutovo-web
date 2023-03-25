#ifndef __UTILS_H__
#define __UTILS_H__

#include <yutovo_editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

namespace yutovo_web
{

using namespace yutovo;

TTF_Font* GetFont(const StringFormatPtr format);
SDL_Color GetColor(const Color color);
SDL_Rect GetRect(const Rect& rect);
Rect GetRect(const SDL_Rect& rect);

std::string ToBasicString(const std::u32string& str);

}

#endif

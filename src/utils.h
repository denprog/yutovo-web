#ifndef __UTILS_H__
#define __UTILS_H__

#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <yutovo_editor/util.h>

namespace yutovo_web
{

using namespace yutovo;

SDL_Color GetColor(const Color color);
SDL_Rect GetRect(const Rect& rect);
Rect GetRect(const SDL_Rect& rect);

extern std::string ToBasicString(const std::u32string& str);
extern std::u32string ToUtfString(const std::string& str);

}

#endif

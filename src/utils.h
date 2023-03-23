#ifndef __UTILS_H__
#define __UTILS_H__

#include <yutovo_editor/window.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

namespace yutovo_web
{

using namespace yutovo;

// TTF_Font* GetFont(const StringFormatPtr format);
// SDL_Color GetColor(const Color color);

std::string GetTextFont(const StringFormatPtr format);

std::string GetRectColor(const Color color);
std::string GetTextColor(const Color color);

std::string ToBasicString(const std::u32string& str);

}

#endif

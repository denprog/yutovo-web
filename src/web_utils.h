#ifndef __WEB_UTILS_H__
#define __WEB_UTILS_H__

#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <yutovo_editor/editor_utils.h>

namespace yutovo_web
{

SDL_Color GetColor(const yutovo::Color color);
SDL_Rect GetRect(const yutovo::Rect& rect);
yutovo::Rect GetRect(const SDL_Rect& rect);

}

#endif

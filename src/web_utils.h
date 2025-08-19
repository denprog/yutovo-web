/*
 * Yutovo Web
 * Copyright (C) 2022-2025 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#ifndef __WEB_UTILS_H__
#define __WEB_UTILS_H__

#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <yutovo-editor/editor_utils.h>

namespace yutovo_web
{

SDL_Color GetColor(const yutovo::Color color);
SDL_Rect GetRect(const yutovo::Rect& rect);
yutovo::Rect GetRect(const SDL_Rect& rect);

}

#endif

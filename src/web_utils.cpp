/*
 * Yutovo Web
 * Copyright (C) 2022-2026 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#include "web_utils.h"
#include <iomanip>

namespace yutovo_web
{

SDL_Color GetColor(const yutovo::Color color)
{
    return SDL_Color{color.r, color.g, color.b};
}

SDL_Rect GetRect(const yutovo::Rect& rect)
{
    return SDL_Rect{rect.left, rect.top, rect.width, rect.height};
}

yutovo::Rect GetRect(const SDL_Rect& rect)
{
    return yutovo::Rect{rect.x, rect.y, rect.w, rect.h};
}

}

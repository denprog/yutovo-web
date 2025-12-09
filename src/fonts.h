/*
 * Yutovo Web
 * Copyright (C) 2022-2025 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#ifndef __FONTS_H__
#define __FONTS_H__

#include <vector>
#include <map>
#include <yutovo-editor/style.h>
#include <SDL2/SDL_ttf.h>

namespace yutovo_web
{

class Fonts
{
public:
    Fonts() = default;
    ~Fonts();
    
    TTF_Font* Get(const yutovo::StringFormat& format);
    bool GetFontPath(const yutovo::StringFormat& format, std::string& path) const;

private:
    const std::string base_dir = "./fonts/";
    static std::map<std::string, std::string> font_files;

    struct Font
    {
        std::string family;
        uint size = 0;
        TTF_Font* ttf_font;
    };

    std::vector<Font> fonts;
};

}

#endif

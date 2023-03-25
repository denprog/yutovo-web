#include "utils.h"
#include <iomanip>
#include <format>

namespace yutovo_web
{

TTF_Font* GetFont(const StringFormatPtr format)
{
    std::string f = "./fonts/Arial.ttf";
    static TTF_Font* font = TTF_OpenFont(f.c_str(), format->size);
    if (!font)
    {
        font = TTF_OpenFont(f.c_str(), format->size);
        if (!font)
        {
            printf("%s\n", TTF_GetError());
            return nullptr;
        }
    }
    int style = 0;
    if (format->bold)
        style |= TTF_STYLE_BOLD;
    if (format->italic)
        style |= TTF_STYLE_ITALIC;
    if (format->underline)
        style |= TTF_STYLE_UNDERLINE;
    if (style > 0)
        TTF_SetFontStyle(font, style);
    return font;
}

SDL_Color GetColor(const Color color)
{
    return SDL_Color{color.r, color.g, color.b};
}

SDL_Rect GetRect(const Rect& rect)
{
    return SDL_Rect{rect.left, rect.top, rect.width, rect.height};
}

Rect GetRect(const SDL_Rect& rect)
{
    return Rect{rect.x, rect.y, rect.w, rect.h};
}

std::string ToBasicString(const std::u32string& str)
{
    return boost::locale::conv::utf_to_utf<char>(str);
}

}

#include "utils.h"
#include <iomanip>
#include <format>

namespace yutovo_web
{

// TTF_Font* GetFont(const StringFormatPtr format)
// {
//     std::string f = "./fonts/Arial.ttf";
//     static TTF_Font* font = TTF_OpenFont(f.c_str(), format->size);
//     if (!font)
//     {
//         printf("%s\n", TTF_GetError());
//         return nullptr;
//     }
//     int style = 0;
//     if (format->bold)
//         style |= TTF_STYLE_BOLD;
//     if (format->italic)
//         style |= TTF_STYLE_ITALIC;
//     if (format->underline)
//         style |= TTF_STYLE_UNDERLINE;
//     if (style > 0)
//         TTF_SetFontStyle(font, style);
//     return font;
// }

// SDL_Color GetColor(const Color color)
// {
//     return SDL_Color{color.r, color.g, color.b};
// }

std::string GetTextFont(const StringFormatPtr format)
{
    std::string s = std::to_string(format->size);
    s += "px ";
    s += format->family;
    if (format->bold)
        s += " bold";
    if (format->italic)
        s += " italic";
    if (format->underline)
        s += " underline";
    return s;
}

std::string GetRectColor(const Color color)
{
    return "rgba(" + std::to_string(color.r) + "," + std::to_string(color.g) + "," + std::to_string(color.b) + "," + std::to_string(color.a) + ")";
}

std::string GetTextColor(const Color color)
{
    return "#" + std::format("{:#02}", color.r) + std::format("{:#02}", color.g) + std::format("{:#02}", color.b);
}

std::string ToBasicString(const std::u32string& str)
{
    return boost::locale::conv::utf_to_utf<char>(str);
}

}

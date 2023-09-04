#include "utils.h"
#include <iomanip>
#include <format>

namespace yutovo_web
{

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

std::u32string ToUtfString(const std::string& str)
{
    return boost::locale::conv::utf_to_utf<char32_t>(str);
}

}

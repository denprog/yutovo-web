#include "fonts.h"

namespace yutovo_web
{

//Fonts

std::map<std::string, std::string> Fonts::font_files = 
    {
        {"Arial", "Arial.ttf"},
        {"Courier New", "Courier_New.ttf"},
        {"Courier", "Courier_New.ttf"},
        {"Times New Roman", "Times_New_Roman.ttf"},
        {"FreeMono", "FreeMono.ttf"}
    };

Fonts::~Fonts()
{
    for (auto& f : fonts)
    {
        TTF_CloseFont(f.ttf_font);
    }
}

TTF_Font* Fonts::Get(const yutovo::StringFormatPtr format)
{
    auto font_file = font_files.find(format->family);
    if (font_file == font_files.end())
        return nullptr;
    
    auto ttf_font = std::find_if(fonts.begin(), fonts.end(), 
        [format](Font& font)
        {
            return format->family == font.family && format->size == font.size;
        });
    TTF_Font* font = nullptr;
    if (ttf_font == fonts.end())
    {
        font = TTF_OpenFont((base_dir + font_file->second).c_str(), format->size);
        if (!font)
        {
            printf("%s\n", TTF_GetError());
            return nullptr;
        }
        fonts.emplace_back(Font{format->family, format->size, font});
    }
    else
    {
        font = ttf_font->ttf_font;
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

}

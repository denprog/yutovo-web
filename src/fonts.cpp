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
        {"FreeMono", "FreeMono.ttf"},
        {"DejaVu Serif", "DejaVuSerif.ttf"}
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
    
    auto it = std::find_if(fonts.begin(), fonts.end(), 
        [format](Font& font)
        {
            int style = TTF_GetFontStyle(font.ttf_font);
            return format->family == font.family && format->size == font.size && format->bold == bool(style & TTF_STYLE_BOLD) && 
                format->italic == bool(style & TTF_STYLE_ITALIC) && format->underline == bool(style & TTF_STYLE_UNDERLINE) &&
                format->strikethrough == bool(style & TTF_STYLE_STRIKETHROUGH);
        });
    if (it == fonts.end())
    {
        auto file_name = base_dir + font_file->second;
        //printf("Opening font: %s, size: %d\n", file_name.c_str(), format->size);
        TTF_Font* font = TTF_OpenFont(file_name.c_str(), format->size);
        if (!font)
        {
            printf("Font not open: %s\n", TTF_GetError());
            return nullptr;
        }

        int style = 0;
        if (format->bold)
            style |= TTF_STYLE_BOLD;
        if (format->italic)
            style |= TTF_STYLE_ITALIC;
        if (format->underline)
            style |= TTF_STYLE_UNDERLINE;
        if (format->strikethrough)
            style |= TTF_STYLE_STRIKETHROUGH;
        if (style > 0)
            TTF_SetFontStyle(font, style);
        fonts.emplace_back(Font{format->family, format->size, font});
        return font;
    }

    return it->ttf_font;
}

}

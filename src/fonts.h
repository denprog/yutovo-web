#ifndef __FONTS_H__
#define __FONTS_H__

#include <vector>
#include <map>
#include <yutovo_editor/style.h>
#include <SDL2/SDL_ttf.h>

namespace yutovo_web
{

class Fonts
{
public:
    Fonts() = default;
    ~Fonts();
    
    TTF_Font* Get(const yutovo::StringFormatPtr format);

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

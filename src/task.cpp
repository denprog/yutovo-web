#include "task.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>
#include <SDL2/SDL_image.h>
#include "utils.h"
#include "web_window.h"

namespace yutovo_web
{

//Task

Task::Task(WebWindow* _web_window, bool _draw_doc) :
    web_window(_web_window),
    draw_doc(_draw_doc)
{
}

void Task::DrawPixelWeight(const int x, const int y, const Color& color, const int weight)
{
	uint8_t ax = color.a;
	ax = ((ax * weight) >> 8);
	if (ax > 255)
		ax = 255;
	else
		ax = (uint8_t)(ax & 0x000000ff);

	return DrawPixel(x, y, Color{ax, color.r, color.g, color.b});
}

void Task::DrawPixel(const int x, const int y, const Color& color)
{
    SDL_SetRenderDrawBlendMode(web_window->renderer, (color.a == 255) ? SDL_BLENDMODE_NONE : SDL_BLENDMODE_BLEND);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_RenderDrawPoint(web_window->renderer, x, y);
}

void Task::DrawHLine(const int x1, const int x2, const int y, const Color& color)
{
	SDL_SetRenderDrawBlendMode(web_window->renderer, (color.a == 255) ? SDL_BLENDMODE_NONE : SDL_BLENDMODE_BLEND);
	SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
	SDL_RenderDrawLine(web_window->renderer, x1, y, x2, y);
}

void Task::DrawVLine(const int x, const int y1, const int y2, const Color& color)
{
	SDL_SetRenderDrawBlendMode(web_window->renderer, (color.a == 255) ? SDL_BLENDMODE_NONE : SDL_BLENDMODE_BLEND);
	SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
	SDL_RenderDrawLine(web_window->renderer, x, y1, x, y2);
}

void Task::DrawLine(const int x1, const int y1, const int x2, const int y2, const Color& color)
{
	SDL_SetRenderDrawBlendMode(web_window->renderer, (color.a == 255) ? SDL_BLENDMODE_NONE : SDL_BLENDMODE_BLEND);
	SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);	
	SDL_RenderDrawLine(web_window->renderer, x1, y1, x2, y2);
}

void Task::DrawLine(int x1, int y1, int x2, int y2, const Color& color, bool draw_endpoint)
{
	uint int_shift, err_acc, err_adj;
	uint err_acc_tmp, wgt, wgt_comp_mask;
	int dx, dy, x_dir, y0_p1, x0_px;
    const int aa_levels = 256;
    const int aa_bits = 8;

	if (y1 > y2)
    {
		int tmp = y1;
		y1 = y2;
		y2 = tmp;
		tmp = x1;
		x1 = x2;
		x2 = tmp;
	}

	dx = x2 - x1;
	dy = y2 - y1;

	//adjust for negative dx and set x_dir 
	if (dx >= 0)
		x_dir = 1;
	else
    {
		x_dir = -1;
		dx = -dx;
	}
	
	//check for special cases 
	if (dx == 0)
    {
		//vertical line 
		if (draw_endpoint)
		{
			DrawVLine(x1, y1, y2, color);
            return;
		}
        else
        {
			if (dy > 0)
            {
				DrawVLine(x1, y1, y1 + dy, color);
                return;
            }
			else
            {
				DrawPixel(x1, y1, color);
                return;
            }
		}
	}
    else if (dy == 0)
    {
		//horizontal line 
		if (draw_endpoint)
			DrawHLine(x1, x2, y1, color);
        else
        {
			if (dx > 0)
				DrawHLine(x1, x1 + dx, y1, color);
            else
				DrawPixel(x1, y1, color);
		}
        return;
	}
    else if (dx == dy && draw_endpoint)
    {
		DrawLine(x1, y1, x2, y2, color);
        return;
	}

	err_acc = 0;
	int_shift = 32 - aa_bits;
	wgt_comp_mask = aa_levels - 1;

	DrawPixel(x1, y1, color); //the initial pixel in the foreground color 

	if (dy > dx)
    {
		err_adj = ((dx << 16) / dy) << 16; //calculate 16-bit fixed point fractional part of a pixel

		//draw all pixels other than the first and last 
		x0_px = x1 + x_dir;
		while (--dy)
        {
			err_acc_tmp = err_acc;
			err_acc += err_adj;
			if (err_acc <= err_acc_tmp)
            {
				//rollover in error accumulator, x coord advances 
				x1 = x0_px;
				x0_px += x_dir;
			}
			y1++; //y-major so always advance Y

			wgt = (err_acc >> int_shift) & 255;
			DrawPixelWeight(x1, y1, color, 255 - wgt);
			DrawPixelWeight(x0_px, y1, color, wgt);
		}
	}
    else
    {
		err_adj = ((dy << 16) / dx) << 16;

		//draw all pixels other than the first and last 
		y0_p1 = y1 + 1;
		while (--dx)
        {
			err_acc_tmp = err_acc;
			err_acc += err_adj;
			if (err_acc <= err_acc_tmp)
            {
				y1 = y0_p1;
				y0_p1++;
			}
			x1 += x_dir;	//x-major so always advance X
			wgt = (err_acc >> int_shift) & 255;
			DrawPixelWeight(x1, y1, color, 255 - wgt);
			DrawPixelWeight(x1, y0_p1, color, wgt);
		}
	}

	if (draw_endpoint)
        DrawPixel(x2, y2, color); //draw final pixel
}

void Task::DrawFillPath(std::vector<Point>& path, const Color& color)
{
    for (size_t i = 0; i < path.size() - 1; ++i)
    {
        Point& p1 = path[i];
        Point& p2 = path[i + 1];
        DrawLine(p1.x, p1.y, p2.x, p2.y, color, true);
    }

    Point& p1 = path[path.size() - 1];
    Point& p2 = path[0];
    DrawLine(p1.x, p1.y, p2.x, p2.y, color, true);

    Point p = *path.begin();
    int y_min = p.y, y_max = p.y;
    for (size_t i = 1; i < path.size(); ++i)
    {
        Point& p = path[i];
        if (p.y < y_min)
            y_min = p.y;
        else if (p.y > y_max)
            y_max = p.y;
    }

    int x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    int ind1 = 0, ind2 = 0;
    std::vector<int> poly_ints;

	for (int y = y_min; y <= y_max; ++y)
    {
        poly_ints.clear();
		for (int i = 0; i < path.size(); ++i)
        {
			if (!i)
            {
				ind1 = path.size() - 1;
				ind2 = 0;
			}
            else
            {
				ind1 = i - 1;
				ind2 = i;
			}
			y1 = path[ind1].y;
			y2 = path[ind2].y;
			if (y1 < y2)
            {
				x1 = path[ind1].x;
				x2 = path[ind2].x;
			}
            else if (y1 > y2)
            {
				y2 = path[ind1].y;
				y1 = path[ind2].y;
				x2 = path[ind1].x;
				x1 = path[ind2].x;
			}
            else
            {
				continue;
			}

			if ((y >= y1 && y < y2) || (y == y_max && y > y1 && y <= y2))
				poly_ints.push_back(((65536 * (y - y1)) / (y2 - y1)) * (x2 - x1) + (65536 * x1));
		}

		std::sort(poly_ints.begin(), poly_ints.end(),
            [](int const& a, int const& b)
            {
                return a < b;
            });

		for (size_t i = 0; i < poly_ints.size(); i += 2)
        {
			int xa = poly_ints[i] + 1;
			xa = (xa >> 16) + ((xa & 32768) >> 15);
			int xb = poly_ints[i + 1] - 1;
			xb = (xb >> 16) + ((xb & 32768) >> 15);
            DrawLine(xa, y, xb, y, color);
		}
	}
}

//DrawLineTask

DrawLineTask::DrawLineTask(const int _x1, const int _y1, const int _x2, const int _y2, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    x2(_x2),
    y2(_y2),
    color(_color)
{
}

void DrawLineTask::Execute()
{
    //printf("WebWindow::DrawLine x1=%d, y1=%d, x2=%d, y2=%d\n", x1, y1, x2, y2);
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_RenderDrawLine(web_window->renderer, x1 - web_window->document_point.x, y1 - web_window->document_point.y, 
        x2 - web_window->document_point.x, y2 - web_window->document_point.y);
}

//DrawRectTask

DrawRectTask::DrawRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height),
    color(_color)
{
}

void DrawRectTask::Execute()
{
    //printf("WebWindow::DrawRect x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - web_window->document_point.x : x1, draw_doc ? y1 - web_window->document_point.y : y1, width, height};
    SDL_RenderDrawRect(web_window->renderer, &r);
}

//DrawFillRectTask

DrawFillRectTask::DrawFillRectTask(const int _x1, const int _y1, const int _width, const int _height, const Color _color, 
    WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    width(_width),
    height(_height),
    color(_color)
{
}

void DrawFillRectTask::Execute()
{
    //printf("WebWindow::DrawFillRect x1=%d, y1=%d, width=%d, height=%d\n", x1, y1, width, height);
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Rect r{draw_doc ? x1 - web_window->document_point.x : x1, draw_doc ? y1 - web_window->document_point.y : y1, width, height};
    SDL_RenderFillRect(web_window->renderer, &r);
}

//DrawTextTask

DrawTextTask::DrawTextTask(const std::string& _text, const StringFormatPtr _format, const Rect& _rect, const Color _color, const Color _bg_color, 
    Fonts& _fonts, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    text(_text),
    format(_format),
    rect(_rect),
    color(_color),
    bg_color(_bg_color),
    fonts(_fonts)
{
}

void DrawTextTask::Execute()
{
    if (text.length() == 0)
        return;
    TTF_Font* font = fonts.Get(format);
    if (!font)
        return;
    
    //printf("WebWindow::DrawText %s, rect={%d, %d, %d, %d}\n", text.c_str(), rect.left, rect.top, rect.width, rect.height);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    SDL_Surface* text_surface = TTF_RenderUTF8_Shaded(font, text.c_str(), GetColor(color), GetColor(bg_color));
    if (!text_surface)
    {
        printf("TTF_RenderUTF8_Blended error: %s\n", TTF_GetError());
        return;
    }
    SDL_Texture* texture = SDL_CreateTextureFromSurface(web_window->renderer, text_surface);
    if (!texture)
    {
        printf("SDL_CreateTextureFromSurface error: %s\n", TTF_GetError());
        return;
    }

    int w, h;
    SDL_QueryTexture(texture, nullptr, nullptr, &w, &h);

    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_Rect r{rect.left - web_window->document_point.x, rect.top - web_window->document_point.y, w, h};
    SDL_RenderCopy(web_window->renderer, texture, NULL, &r);
    SDL_FreeSurface(text_surface);
    SDL_DestroyTexture(texture);
}

//DrawWavyLineTask

DrawWavyLineTask::DrawWavyLineTask(const int _x1, const int _y1, const int _width, const int _radius, const Color _color, 
    WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    x1(_x1),
    y1(_y1),
    width(_width),
    radius(_radius),
    color(_color)
{
}

void DrawWavyLineTask::Execute()
{
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);
    int x = x1;
    while (x <= x1 + width)
    {
        DrawArc(x, y1, radius, 0, -180);
        x += radius * 2;
        if (x >= x1 + width)
            break;
        DrawArc(x, y1, radius, 0, 180);
        x += radius * 2;
    }
}

void DrawWavyLineTask::DrawArc(const int x, const int y, const int radius, int start, int end)
{
    if (radius < 0)
        return;

	int result;
	int cx = 0;
	int cy = radius;
	int df = 1 - radius;
	int d_e = 3;
	int d_se = -2 * radius + 5;
	int xpcx, xmcx, xpcy, xmcy;
	int ypcy, ymcy, ypcx, ymcx;
	uint drawoct;
	int startoct = 0, endoct, oct, stopval_start = 0, stopval_end = 0;
	double dstart, dend, temp = 0.;

	start %= 360;
	end %= 360;
	while (start < 0)
        start += 360;
	while (end < 0)
        end += 360;
	start %= 360;
	end %= 360;

	startoct = start / 45;
	endoct = end / 45;
	oct = startoct - 1;

	do
    {
		oct = (oct + 1) % 8;
		if (oct == startoct)
        {
			dstart = (double)start;
			switch (oct) 
			{
			case 0:
			case 3:
				temp = sin(dstart * M_PI / 180.);
				break;
			case 1:
			case 6:
				temp = cos(dstart * M_PI / 180.);
				break;
			case 2:
			case 5:
				temp = -cos(dstart * M_PI / 180.);
				break;
			case 4:
			case 7:
				temp = -sin(dstart * M_PI / 180.);
				break;
			}
			temp *= radius;
			stopval_start = (int)temp;

			if (oct % 2)
                drawoct |= (1 << oct);
			else
                drawoct &= 255 - (1 << oct);
		}
		if (oct == endoct)
        {
			dend = (double)end;
			switch (oct)
			{
			case 0:
			case 3:
				temp = sin(dend * M_PI / 180);
				break;
			case 1:
			case 6:
				temp = cos(dend * M_PI / 180);
				break;
			case 2:
			case 5:
				temp = -cos(dend * M_PI / 180);
				break;
			case 4:
			case 7:
				temp = -sin(dend * M_PI / 180);
				break;
			}
			temp *= radius;
			stopval_end = (int)temp;

			if (startoct == endoct)
            {
				if (start > end)
					drawoct = 255;
                else
					drawoct &= 255 - (1 << oct);
			} 
			else if (oct % 2)
                drawoct &= 255 - (1 << oct);
			else
                drawoct |= (1 << oct);
		}
        else if (oct != startoct)
        {
			drawoct |= (1 << oct); /* draw this entire segment */
		}
	}
    while (oct != endoct);

	do
    {
		ypcy = y + cy;
		ymcy = y - cy;
		if (cx > 0)
        {
			xpcx = x + cx;
			xmcx = x - cx;

			if (drawoct & 4)
                result |= SDL_RenderDrawPoint(web_window->renderer, xmcx, ypcy);
			if (drawoct & 2)
                result |= SDL_RenderDrawPoint(web_window->renderer, xpcx, ypcy);
			if (drawoct & 32)
                result |= SDL_RenderDrawPoint(web_window->renderer, xmcx, ymcy);
			if (drawoct & 64)
                result |= SDL_RenderDrawPoint(web_window->renderer, xpcx, ymcy);
		}
        else
        {
			if (drawoct & 96)
                result |= SDL_RenderDrawPoint(web_window->renderer, x, ymcy);
			if (drawoct & 6)
                result |= SDL_RenderDrawPoint(web_window->renderer, x, ypcy);
		}

		xpcy = x + cy;
		xmcy = x - cy;
		if (cx > 0 && cx != cy)
        {
			ypcx = y + cx;
			ymcx = y - cx;
			if (drawoct & 8)
                result |= SDL_RenderDrawPoint(web_window->renderer, xmcy, ypcx);
			if (drawoct & 1)
                result |= SDL_RenderDrawPoint(web_window->renderer, xpcy, ypcx);
			if (drawoct & 16)
                result |= SDL_RenderDrawPoint(web_window->renderer, xmcy, ymcx);
			if (drawoct & 128)
                result |= SDL_RenderDrawPoint(web_window->renderer, xpcy, ymcx);
		}
        else if (cx == 0)
        {
			if (drawoct & 24)
                result |= SDL_RenderDrawPoint(web_window->renderer, xmcy, y);
			if (drawoct & 129)
                result |= SDL_RenderDrawPoint(web_window->renderer, xpcy, y);
		}

		if (stopval_start == cx)
        {
			if (drawoct & (1 << startoct))
                drawoct &= 255 - (1 << startoct);
			else
                drawoct |= (1 << startoct);
		}
		if (stopval_end == cx)
        {
			if (drawoct & (1 << endoct))
                drawoct &= 255 - (1 << endoct);
			else
                drawoct |= (1 << endoct);
		}

		if (df < 0)
        {
			df += d_e;
			d_e += 2;
			d_se += 2;
		}
        else
        {
			df += d_se;
			d_e += 2;
			d_se += 4;
			cy--;
		}
		cx++;
	}
    while (cx <= cy);
}

//DrawFillPathTask

DrawFillPathTask::DrawFillPathTask(const std::list<Point>& _path, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    path(_path),
    color(_color)
{
}

void DrawFillPathTask::Execute()
{
    if (path.size() < 3)
        return;
    
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);

    std::vector<Point> _path{std::make_move_iterator(std::begin(path)), std::make_move_iterator(std::end(path))};
    DrawFillPath(_path, color);
}

//DrawBezierTask

DrawBezierTask::DrawBezierTask(const std::list<Point>& _path, const Color _color, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    path(_path),
    color(_color)
{
}

void DrawBezierTask::Execute()
{
    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_SetRenderDrawColor(web_window->renderer, color.r, color.g, color.b, color.a);

    DrawBezier();
}

void DrawBezierTask::DrawBezier()
{
    if (path.size() < 3)
        return;
    
    int n = path.size();
    int s = n - 1;
    double step_size = 1.0 / (double)s;
    double t = 0.;
    std::vector<double> x, y;

    for (auto it = path.begin(); it != path.end(); ++it)
    {
        x.push_back((double)it->x);
        y.push_back((double)it->y);
    }
	x.push_back((double)path.begin()->x);
	y.push_back((double)path.begin()->y);

    int x1 = (int)lrint(EvaluateBezier(x, n + 1, t));
    int y1 = (int)lrint(EvaluateBezier(y, n + 1, t));

    std::vector<Point> _path;

    for (int i = 0; i <= (n * s); ++i)
    {
        t += step_size;
		int x2 = (int)EvaluateBezier(x, n, t);
		int y2 = (int)EvaluateBezier(y, n, t);
        _path.push_back(Point{x1, y1});
        _path.push_back(Point{x2, y2});
		x1 = x2;
		y1 = y2;
    }

    DrawFillPath(_path, color);
}

double DrawBezierTask::EvaluateBezier(std::vector<double>& data, int size, double t)
{
	double mu, result;
	int n, k, kn, nn, nkn;
	double blend, muk, munk;

	if (t < 0.0)
		return(data[0]);
	if (t >= size)
		return(data[size - 1]);

	mu = t / (double)size; //adjust t to the range 0.0 to 1.0

	//calculate interpolate
	n = size - 1;
	result = 0.0;
	muk = 1;
	munk = pow(1 - mu, (double)n);
	for (k = 0; k <= n; k++)
    {
		nn = n;
		kn = k;
		nkn = n - k;
		blend = muk * munk;
		muk *= mu;
		munk /= (1 - mu);
		while (nn >= 1)
        {
			blend *= nn;
			nn--;
			if (kn > 1)
            {
				blend /= (double)kn;
				kn--;
			}
			if (nkn > 1)
            {
				blend /= (double)nkn;
				nkn--;
			}
		}
		result += data[k] * blend;
	}

	return result;
}

//DrawImageTask

DrawImageTask::DrawImageTask(const Rect& _rect, std::vector<unsigned char> _picture, WebWindow* _web_window, bool _draw_doc) :
    Task(_web_window, _draw_doc),
    rect(_rect),
    picture(_picture)
{
}

void DrawImageTask::Execute()
{
    SDL_RWops* p = SDL_RWFromConstMem(&picture[0], picture.size());
    if (!p)
    {
        printf("SDL_RWFromConstMem error: %s\n", SDL_GetError());
        return;
    }

    SDL_Surface* surface = IMG_LoadTyped_RW(p, 1, "PNG");
    if (!surface)
    {
        //try to load as bmp
        p = SDL_RWFromConstMem(&picture[0], picture.size());
        surface = SDL_LoadBMP_RW(p, 1);
        if (!surface)
        {
            printf("SDL_LoadBMP_RW error: %s\n", SDL_GetError());
            return;
        }
    }

    SDL_Texture* texture = SDL_CreateTextureFromSurface(web_window->renderer, surface);
    if (!texture)
    {
        printf("SDL_CreateTextureFromSurface error: %s\n", TTF_GetError());
        return;
    }

    if (draw_doc)
        SDL_RenderSetClipRect(web_window->renderer, &web_window->view_port);
    else
        SDL_RenderSetClipRect(web_window->renderer, nullptr);
    SDL_Rect r{rect.left - web_window->document_point.x, rect.top - web_window->document_point.y, rect.width, rect.height};
    SDL_RenderCopy(web_window->renderer, texture, NULL, &r);
    SDL_DestroyTexture(texture);
}

//StoreRectTask

StoreRectTask::StoreRectTask(const Rect& _rect, WebWindow* _web_window) :
    Task(_web_window, false),
    rect(_rect)
{
}

void StoreRectTask::Execute()
{
    //printf("WebWindow::StoreRect\n");
    SDL_Rect& store_rect = web_window->store_rect;
    store_rect = yutovo_web::GetRect(rect);
    store_rect.x -= web_window->document_point.x;
    store_rect.y -= web_window->document_point.y;

    //fix the store_rect if it is out of the image
    if (store_rect.x < 0)
    {
        store_rect.w -= -store_rect.x;
        store_rect.x = 0;
    }
    if (store_rect.x + store_rect.w > web_window->width)
        store_rect.w = web_window->width - store_rect.x;

    if (store_rect.y < 0)
    {
        store_rect.h -= -store_rect.y;
        store_rect.y = 0;
    }
    if (store_rect.y + store_rect.h > web_window->height)
        store_rect.h = web_window->height - store_rect.y;

    if (web_window->stored_texture)
    {
        SDL_DestroyTexture(web_window->stored_texture);
        web_window->stored_texture = nullptr;
    }

    if (store_rect.w <= 0 || store_rect.h <= 0)
        return;

    SDL_Texture* texture = SDL_CreateTextureFromSurface(web_window->renderer, web_window->surface);
    Uint32 format;
    int access;
    int w, h;
    SDL_QueryTexture(texture, &format, &access, &w, &h);

    web_window->stored_texture = SDL_CreateTexture(web_window->renderer, format, SDL_TEXTUREACCESS_TARGET, store_rect.w, store_rect.h);
    if (!web_window->stored_texture)
    {
        printf("SDL_CreateTexture error: %s\n", TTF_GetError());
        SDL_DestroyTexture(texture);
        return;
    }
    SDL_SetRenderTarget(web_window->renderer, web_window->stored_texture);
    SDL_RenderCopy(web_window->renderer, texture, &store_rect, nullptr);
    SDL_SetRenderTarget(web_window->renderer, nullptr);
    SDL_DestroyTexture(texture);
}

//RestoreRectTask

RestoreRectTask::RestoreRectTask(WebWindow* _web_window) :
    Task(_web_window, false)
{
}

void RestoreRectTask::Execute()
{
    //printf("WebWindow::RestoreRect %d, %d, %d, %d\n", web_window->store_rect.x, web_window->store_rect.y, web_window->store_rect.w, web_window->store_rect.h);
    if (!web_window->stored_texture)
        return;
    SDL_RenderCopy(web_window->renderer, web_window->stored_texture, nullptr, &web_window->store_rect);
}

//ClearTask

ClearTask::ClearTask(WebWindow* _web_window) :
    Task(_web_window, false)
{
}

void ClearTask::Execute()
{
    //printf("WebWindow::ClearTask\n");
    SDL_RenderClear(web_window->renderer);
}

//ResizeTask

ResizeTask::ResizeTask(WebWindow* _web_window, uint _width, uint _height) :
    Task(_web_window, false),
    width(_width),
    height(_height)
{
}

void ResizeTask::Execute()
{
    //printf("WebWindow::ResizeTask\n");
    if (web_window->surface)
        SDL_FreeSurface(web_window->surface);
    if (web_window->renderer)
        SDL_DestroyRenderer(web_window->renderer);
    web_window->surface = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
    web_window->renderer = SDL_CreateSoftwareRenderer(web_window->surface);
    SDL_SetRenderDrawColor(web_window->renderer, 255, 255, 255, 255);
    SDL_RenderClear(web_window->renderer);
    if (web_window->stored_texture)
    {
        SDL_DestroyTexture(web_window->stored_texture);
        web_window->stored_texture = nullptr;
    }
    web_window->width = width;
    web_window->height = height;
}

//ConnectTask

EM_JS(int, ConnectJs, (const char* addr, size_t addr_size),
    {
        let socket = new WebSocket(UTF8ToString(addr, addr_size));
        socket.last_message = "";
        socket.onmessage = function(event)
            {
                socket.last_message = event.data;
            };

        socket.onerror = function(error)
            {
                console.log(error);
            };

        window.sockets.set(window.socket_id, socket);
        return window.socket_id++;
    });

ConnectTask::ConnectTask(const std::string& _addr, std::atomic_int32_t& _socket_id) :
    addr(_addr),
    socket_id(_socket_id)
{
}

void ConnectTask::Execute()
{
    socket_id = ConnectJs(addr.c_str(), addr.size());
}

//IsOpenTask

EM_JS(int, IsOpenJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined")
            return 0;
        return socket.readyState === socket.OPEN;
    });

IsOpenTask::IsOpenTask(const int _socket_id, std::atomic_int8_t& _is_open) :
    socket_id(_socket_id),
    is_open(_is_open)
{
}

void IsOpenTask::Execute()
{
    is_open = IsOpenJs(socket_id);
}

//SendTask

EM_JS(bool, SendJs, (const int socket_id, const char* message, size_t message_size),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined" || socket.readyState !== socket.OPEN)
            return 0;
        try
        {
            socket.send(UTF8ToString(message, message_size));
        }
        catch (err)
        {
            return 0;
        }
        return 1;
    });

SendTask::SendTask(const int _socket_id, const std::string& _message, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    message(_message),
    res(_res)
{
}

void SendTask::Execute()
{
    res = SendJs(socket_id, message.c_str(), message.size());
}

//ReceiveTask

EM_JS(char*, ReceiveJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined" || socket.readyState !== socket.OPEN)
            return 0;

        try
        {
            //calculate length of the utf string
            var len = socket.last_message.length;
            for (var i = socket.last_message.length - 1; i >= 0; i--)
            {
                var code = socket.last_message.charCodeAt(i);
                if (code > 0x7f && code <= 0x7ff)
                    ++len;
                else if (code > 0x7ff && code <= 0xffff)
                    len += 2;
                if (code >= 0xDC00 && code <= 0xDFFF)
                    i--;
            }

            var str = _malloc(len + 1);
            stringToUTF8(socket.last_message, str, len + 1);
            socket.last_message = "";
            return str;
        }
        catch (err)
        {
            return 0;
        }
    });

ReceiveTask::ReceiveTask(const int _socket_id, std::string& _message, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    message(_message),
    res(_res)
{
}

void ReceiveTask::Execute()
{
    char* str = ReceiveJs(socket_id);
    if (!str)
    {
        res = 0;
        return;
    }
    message = std::string(str);
    res = 1;
}

//CloseTask

EM_JS(bool, CloseJs, (const int socket_id),
    {
        let socket = window.sockets.get(socket_id);
        if (typeof socket === "undefined" || socket.readyState !== socket.OPEN)
            return 0;
        try
        {
            socket.close();
        }
        catch (err)
        {
            return 0;
        }
        return 1;
    });

CloseTask::CloseTask(const int _socket_id, std::atomic_int8_t& _res) :
    socket_id(_socket_id),
    res(_res)
{
}

void CloseTask::Execute()
{
    res = CloseJs(socket_id);
}

//FillSizesCacheTask

FillSizesCacheTask::FillSizesCacheTask(WebWindow* _web_window, const char32_t _symbol, const int _height, const std::string& _family_name) :
    Task(_web_window, false),
    symbol(_symbol),
    height(_height),
    family_name(_family_name)
{
}

void FillSizesCacheTask::Execute()
{
    yutovo::Size size;
    int baseline = 0;
    web_window->GetCachedSize(symbol, height, family_name, size, baseline);
}

}

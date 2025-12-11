#include "web_pdf_window.h"
#include <emscripten.h>

namespace yutovo_web
{

//WebPdfWindow

WebPdfWindow::WebPdfWindow(const Size& _page_size, std::u32string&& _footer) : 
    PdfWindow(_page_size, true),
    footer(_footer)
{
}

std::u32string WebPdfWindow::Translate(ElementId id, const std::u32string& str)
{
    if (str == U"This document was created with ")
        return footer;
    return str;
}

bool WebPdfWindow::GetFontPath(const StringFormatPtr format, std::string& path)
{
    return fonts.GetFontPath(*format, path);
}

void WebPdfWindow::OnPdfExportResult(const std::vector<uint8_t>& _pdf, const PdfResult _result)
{
    std::lock_guard<std::recursive_mutex> lock(results_mutex);
    pdf = _pdf;
    result = _result;
    pdf_result_ready = true;
}

void WebPdfWindow::GetPdfResult(std::vector<uint8_t>& _pdf, PdfResult& _result)
{
    std::lock_guard<std::recursive_mutex> lock(results_mutex);
    _pdf = pdf;
    _result = result;
}

}

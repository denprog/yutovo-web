#ifndef __WEB_PDF_WINDOW_H__
#define __WEB_PDF_WINDOW_H__

#include <yutovo-editor/pdf_window.h>
#include "fonts.h"

namespace yutovo_web
{

using namespace yutovo;

class WebPdfWindow : public PdfWindow
{
public:
    WebPdfWindow(const Size& _page_size);

    virtual bool GetFontPath(const StringFormatPtr format, std::string& path);

    virtual void OnPdfExportResult(const std::vector<uint8_t>& _pdf, const PdfResult _result);

    void GetPdfResult(std::vector<uint8_t>& _pdf, PdfResult& _result);

public:
    std::atomic_bool pdf_result_ready{false};

private:
    Fonts fonts;
    std::recursive_mutex results_mutex;
    std::vector<uint8_t> pdf;
    PdfResult result;
};

}

#endif

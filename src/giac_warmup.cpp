#include <giac.h>

namespace yutovo_web {

void WarmupGiac() {
    // Initialize giac's thread-local parser/lexer state on the main thread
    // before any Parser/Solver is constructed. Parsing with a null context
    // touches the globals that would otherwise be initialized lazily inside
    // a Symbolic string constructor, which can crash under Emscripten pthreads.
    giac::gen g1("x", (giac::context*)0);
    giac::gen g2("+infinity", (giac::context*)0);
    (void)g1;
    (void)g2;
}

} // namespace yutovo_web

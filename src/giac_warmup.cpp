#include <giac.h>
#include <signal.h>

// Giac calls gettext for error messages; provide a no-op stub since we don't
// link libintl in the wasm build.
const char * gettext(const char * s)
{
    return s;
}

// Emscripten's libc does not provide sigsuspend, which giac uses for its
// signal-based child-process synchronization in global.cc.
extern "C" int sigsuspend(const sigset_t *mask)
{
    return 0;
}

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

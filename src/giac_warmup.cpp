#include <giac.h>
#include <signal.h>

extern "C" int sigsuspend(const sigset_t *mask)
{
    return 0;
}

namespace yutovo_web
{

void WarmupGiac()
{
    //iitialize giac's thread-local parser/lexer state on the main thread before any Parser/Solver is constructed for avoid crash under Emscripten pthreads
    giac::gen g1("x", (giac::context*)0);
    giac::gen g2("+infinity", (giac::context*)0);
    (void)g1;
    (void)g2;
}

}

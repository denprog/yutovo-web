cmake_minimum_required(VERSION 3.17)

project(yutovo_web
    VERSION 0.1.0 
    LANGUAGES CXX
)

set(INSTALL_PATH "$ENV{YUTOVO_DEPLOY}")

# set(REMOTE_SOLVER true)
# add_compile_definitions(REMOTE_SOLVER)

add_subdirectory(src)

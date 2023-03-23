cmake_minimum_required(VERSION 3.17)

project(yutovo_web
    VERSION 0.1.0 
    LANGUAGES CXX
)

set(INSTALL_PATH "$ENV{YUTOVO_DEPLOY}")

add_subdirectory(src)

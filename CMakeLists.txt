cmake_minimum_required(VERSION 3.17)

project(yutovo_web
    VERSION 0.1.0 
    LANGUAGES CXX
)

set(PROJECT_LICENSE "GPL-3.0-only")

message(STATUS "Project license: ${PROJECT_LICENSE}")

set(INSTALL_PATH "$ENV{YUTOVO_DEPLOY}")

# set(REMOTE_SOLVER true)
# add_compile_definitions(REMOTE_SOLVER)

add_subdirectory(src)

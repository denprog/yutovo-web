cmake_minimum_required(VERSION 3.17)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS ON)

set(CMAKE_DEBUG_POSTFIX d)

set(Boost_USE_STATIC_LIBS ON)
set(Boost_USE_MULTITHREADED ON)
set(CMAKE_FIND_ROOT_PATH ${INSTALL_PATH}/wasm/cmake/)

set(yutovo_editor_DIR ${INSTALL_PATH}/wasm/cmake/yutovo-editor/)
set(yutovo_solver_DIR ${INSTALL_PATH}/wasm/cmake/yutovo-solver/)
set(yutovo_calculator_DIR ${INSTALL_PATH}/wasm/cmake/yutovo-calculator/)
set(yutovo_logger_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_logger/)

find_package(PkgConfig REQUIRED)
find_package(yutovo-editor REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo-solver REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo-calculator REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo-logger REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(MathGL2 REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)

#set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O2")

#set(EMCC_DEBUG, 1)
set(CMAKE_EXECUTABLE_SUFFIX ".js")

add_executable(${PROJECT_NAME}
    main.cpp
    web_window.cpp
    web_pdf_window.cpp
    web_utils.cpp
    command_map.cpp
    fonts.cpp
    task.cpp
    giac_warmup.cpp
)

if (CMAKE_BUILD_TYPE STREQUAL "Debug")
    message("Debug build")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O0 -g")
else()
    message("Release build")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O2")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O2")
endif()

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_TTF=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_IMAGE=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_FREETYPE=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_ZLIB=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_LIBPNG=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SDL2_IMAGE_FORMATS=\"[png]\"")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SAFE_HEAP")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ASSERTIONS=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread -sUSE_PTHREADS=1 -sPTHREAD_POOL_SIZE=16 -sPTHREAD_POOL_SIZE_STRICT=0")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --preload-file ./fonts")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fexperimental-library")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ALLOW_MEMORY_GROWTH=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ALLOW_TABLE_GROWTH=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s TEXTDECODER=1")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fsanitize=address -fsanitize=null -fsanitize=undefined")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s STACK_SIZE=16MB")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s DEFAULT_PTHREAD_STACK_SIZE=16MB")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s INITIAL_MEMORY=1024MB")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s MAXIMUM_MEMORY=2048MB")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s MODULARIZE=1")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORT_NAME='yutovo_web'")
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s NO_DISABLE_EXCEPTION_CATCHING")
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s DISABLE_EXCEPTION_CATCHING=0")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORTED_RUNTIME_METHODS=\"['cwrap','ccall','HEAPU8']\"")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fexceptions")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s DISABLE_EXCEPTION_CATCHING=0")
# Debug/diagnostic flags (enable while diagnosing runtime issues)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -sASSERTIONS=2")
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -sSTACK_OVERFLOW_CHECK=2")
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -sSAFE_HEAP=1")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s LLD_REPORT_UNDEFINED")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s MALLOC=emmalloc")

set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "--bind")

target_link_options(${PROJECT_NAME} PUBLIC "-fexceptions -sTEXTDECODER=0")

target_include_directories(${PROJECT_NAME} PUBLIC
	$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
    ${INSTALL_PATH}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/../../third-party/giac-master/src/giac/headers
)

target_include_directories(${PROJECT_NAME} PRIVATE
    ${INSTALL_PATH}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/../../third-party/giac-master/src/giac/headers
)

target_include_directories(${PROJECT_NAME} PUBLIC
    $<INSTALL_INTERFACE:${INSTALL_PATH}/include>
)

set_target_properties(${PROJECT_NAME} PROPERTIES
	CXX_STANDARD 17
	CXX_STANDARD_REQUIRED ON
	CXX_EXTENSIONS OFF
	POSITION_INDEPENDENT_CODE ON
)

add_library(giac_imported STATIC IMPORTED)
set_target_properties(giac_imported PROPERTIES
    IMPORTED_LOCATION ${INSTALL_PATH}/wasm/libgiac.a
    INTERFACE_INCLUDE_DIRECTORIES ${INSTALL_PATH}/include
)

target_link_libraries(${PROJECT_NAME} PUBLIC
    stdc++
    ${INSTALL_PATH}/wasm/libmpfr.a
    ${INSTALL_PATH}/wasm/libgmp.a
    yutovo-editor
    yutovo-solver
    yutovo-calculator
    yutovo-logger
    pthread
    ${INSTALL_PATH}/wasm/libmgl.a
    ${INSTALL_PATH}/wasm/libhpdf.a
    ${INSTALL_PATH}/wasm/libgiac.a
)

install(
    TARGETS ${PROJECT_NAME}
    EXPORT ${PROJECT_NAME}
    DESTINATION ${INSTALL_PATH}/bin
    COMPONENT ${PROJECT_NAME}
)

add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/yutovo_web.data ${CMAKE_CURRENT_SOURCE_DIR}/site/public
)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/yutovo_web.js ${CMAKE_CURRENT_SOURCE_DIR}/site/public
)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/yutovo_web.wasm ${CMAKE_CURRENT_SOURCE_DIR}/site/public
)
add_custom_command(TARGET ${PROJECT_NAME} PRE_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_SOURCE_DIR}/site/public/fonts ${CMAKE_CURRENT_BINARY_DIR}/fonts/
)

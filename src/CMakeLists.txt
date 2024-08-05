cmake_minimum_required(VERSION 3.17)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS ON)

set(CMAKE_DEBUG_POSTFIX d)

set(Boost_USE_STATIC_LIBS ON)
set(Boost_USE_MULTITHREADED ON)
set(CMAKE_FIND_ROOT_PATH ${INSTALL_PATH}/wasm/cmake/)
find_package(Boost 1.81.0 REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(Boost 1.81.0 COMPONENTS serialization PATHS ${INSTALL_PATH}/wasm/)

set(yutovo_editor_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_editor/)
set(yutovo_service_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_service/)
set(yutovo_calculator_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_calculator/)
set(yutovo_logger_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_logger/)

find_package(PkgConfig REQUIRED)
find_package(yutovo_editor REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo_service REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo_calculator REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(yutovo_logger REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)

#set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O2")

#set(EMCC_DEBUG, 1)
set(CMAKE_EXECUTABLE_SUFFIX ".js")

add_executable(${PROJECT_NAME}
    main.cpp
    web_window.cpp
    utils.cpp
    command_map.cpp
    fonts.cpp
    task.cpp
)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0 -g")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_TTF=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_IMAGE=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_FREETYPE=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_ZLIB=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_LIBPNG=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SDL2_IMAGE_FORMATS=\"[png]\"")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SAFE_HEAP")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ASSERTIONS=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=8")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --preload-file ./fonts")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fexperimental-library")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ALLOW_MEMORY_GROWTH=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ALLOW_TABLE_GROWTH=1")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fsanitize=address -fsanitize=null -fsanitize=undefined")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s STACK_SIZE=10MB")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s INITIAL_MEMORY=500MB")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s TOTAL_MEMORY=1024MB")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s MODULARIZE=1")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORT_NAME='yutovo_web'")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s NO_DISABLE_EXCEPTION_CATCHING")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORTED_RUNTIME_METHODS=\"['cwrap','ccall']\"")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s LLD_REPORT_UNDEFINED")
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s MALLOC=emmalloc")

set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "--bind")

target_include_directories(${PROJECT_NAME} PUBLIC
	$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
    ${INSTALL_PATH}/include
)

target_include_directories(${PROJECT_NAME} PRIVATE
    ${THIRD_PARTY_PATH}
    ${INSTALL_PATH}/include
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

target_link_libraries(${PROJECT_NAME} PUBLIC
    stdc++
    ${INSTALL_PATH}/wasm/libmpfr.a
    ${INSTALL_PATH}/wasm/libgmp.a
    yutovo_editor
    yutovo_service
    yutovo_logger
    pthread
    ${Boost_SERIALIZATION_LIBRARY_RELEASE}
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
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/yutovo_web.worker.js ${CMAKE_CURRENT_SOURCE_DIR}/site/public
)
add_custom_command(TARGET ${PROJECT_NAME} PRE_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_SOURCE_DIR}/site/public/fonts ${CMAKE_CURRENT_BINARY_DIR}/fonts/
)

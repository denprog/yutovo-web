cmake_minimum_required(VERSION 3.17)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS ON)

set(CMAKE_DEBUG_POSTFIX d)

#set(CMAKE_FIND_ROOT_PATH ${INSTALL_PATH}/cmake/)
#message("CMAKE_FIND_ROOT_PATH is ${CMAKE_FIND_ROOT_PATH}")
#message("INSTALL_PATH is ${INSTALL_PATH}")
set(yutovo_editor_DIR ${INSTALL_PATH}/wasm/cmake/yutovo_editor/)

find_package(yutovo_editor REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)

set(Boost_USE_STATIC_LIBS ON)
set(Boost_USE_MULTITHREADED ON)
set(CMAKE_FIND_ROOT_PATH ${INSTALL_PATH}/wasm/cmake/)
find_package(Boost 1.81.0 REQUIRED PATHS ${INSTALL_PATH}/wasm/cmake/)
find_package(Boost 1.81.0 COMPONENTS serialization PATHS ${INSTALL_PATH}/wasm/)

#set(CMAKE_FIND_ROOT_PATH ${INSTALL_PATH}/cmake/)

#set(shell-file shell_minimal.html)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O0 -g")

set(EMCC_DEBUG, 1)
set(CMAKE_EXECUTABLE_SUFFIX ".html")

add_executable(${PROJECT_NAME}
    main.cpp
    web_window.cpp
    utils.cpp
    command_map.cpp
)

file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/fonts DESTINATION ./)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s NO_EXIT_RUNTIME=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_TTF=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_SDL_IMAGE=2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_FREETYPE=1")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --shell-file ${CMAKE_CURRENT_SOURCE_DIR}/../shell_minimal.html")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=4")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --preload-file ./fonts")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fexperimental-library")

set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "--bind")

target_include_directories(${PROJECT_NAME} PUBLIC
	$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
    ${INSTALL_PATH}/include
)

target_include_directories(${PROJECT_NAME} PRIVATE
    ../third_party
    ${INSTALL_PATH}/include
)

target_include_directories(${PROJECT_NAME} PUBLIC
    $<INSTALL_INTERFACE:${INSTALL_PATH}/include>
)

set_target_properties(${PROJECT_NAME} PROPERTIES
	CXX_STANDARD 20
	CXX_STANDARD_REQUIRED ON
	CXX_EXTENSIONS OFF
	POSITION_INDEPENDENT_CODE ON
)

target_link_libraries(${PROJECT_NAME} PUBLIC
    yutovo_editor
    pthread
    ${Boost_SERIALIZATION_LIBRARY_RELEASE}
    #SDL_ttf
)

install(
    TARGETS ${PROJECT_NAME}
    EXPORT ${PROJECT_NAME}
    DESTINATION ${INSTALL_PATH}/bin
    COMPONENT ${PROJECT_NAME}
)

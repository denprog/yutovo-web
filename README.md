# Yutovo project
Yutovo is a powerful calculator with graphical representation of mathematics operations inside a text editor.

Yutovo web is a website that performs calculations on a web page. It is based on [Quasar](https://github.com/quasarframework/quasar/) and [Vue.JS](https://github.com/vuejs/core).

## Building for Emscripten

If you haven't yet, build [yutovo-logger](https://github.com/denprog/yutovo-logger), [yutovo-calculator](https://github.com/denprog/yutovo-calculator) and [yutovo-solver](https://github.com/denprog/yutovo-solver), [yutovo-editor](https://github.com/denprog/yutovo-editor).
Install [quasar](https://quasar.dev/start/quasar-cli/).

Clone the project in the yutovo dir (select another branch if you want):

```
cd yutovo
git clone -b develop https://github.com/denprog/yutovo-web.git
```

Create the build directory:

```
cd yutovo-web
mkdir -p build_web/debug
cd build_web/debug
```
Set these variables:

```
export YUTOVO_DEPLOY=~/yutovo/deploy
source ~/emsdk/emsdk_env.sh
```

Build the project:

```
emcmake cmake -DCMAKE_BUILD_TYPE=Debug ../..
make -sj && make install

cd ../../site
quasar build
```

Test the project. Firstly, in quasar.config.js change 

```
production: false
```
to remove capcha. The server must be built with "-DCMAKE_BUILD_TYPE=Debug" option for the same reason.

Then run tests:

```
python -m unittest *
```

or for a group of tests:
```
python -m unittest login.*
```

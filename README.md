# Yutovo project
Yutovo is a powerful calculator with graphical representation of mathematics operations inside a text editor.

Yutovo web is an application for a web page that implements computing and text editing. It is based on [Quasar](https://github.com/quasarframework/quasar/) and [Vue.JS](https://github.com/vuejs/core). Other libraries in the project are written in C++.

The base features are:

* Graphical representation of mathematical formulas
* Math WYSIWYG editor
* Numbers and calculation results can have (almost) any number of digits and accuracy
* Following types of numbers are supported: real, integer, fractional, complex
* Measure of an angle can be changed
* Commonly used mathematical functions and constants are supported
* User variables and functions are supported
* Units, unit systems and translating values between them are supported
* Automatic recalculation of expressions
* Text editor with basic features
* Include documents
* Graphs of functions
* Syntax highlighting
* Library of examples and visual documentation
* Online version with the same features

## Screenshots
<img src="https://yutovo.com/screenshots/2025-12-23_20-24.png" width="500">

<img src="https://yutovo.com/screenshots/2025-05-07_20-31.png" width="500">

<img src="https://yutovo.com/screenshots/2025-12-23_20-27.png" width="500">

<img src="https://yutovo.com/screenshots/2025-05-07_20-29_2.png" width="500">

<img src="https://yutovo.com/screenshots/2025-05-07_20-31_1.png" width="500">

<img src="https://yutovo.com/screenshots/2025-12-23_20-28.png" width="500">

<img src="https://yutovo.com/screenshots/2025-12-23_20-29.png" width="500">

<img src="https://yutovo.com/screenshots/2025-12-23_17-20_1.png" width="500">

<img src="https://yutovo.com/screenshots/2025-12-23_17-20.png" width="500">

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

Then run tests from the `src/site` directory:

```bash
cd src/site
npx playwright test
```

or for a specific test file:
```bash
npx playwright test login
```

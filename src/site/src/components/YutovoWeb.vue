<template>
    <div class="q-pa-md q-gutter-y-md column items-start" id="standard-toolbar">
        <q-btn-group id="editor-toolbar" flat square unelevated stretch>
            <q-btn size="14px" square dense @click="onNew();" icon="img:/images/standard/new.png"/>
            <q-btn size="14px" square dense icon="img:/images/standard/open.png"/>
            <q-btn size="14px" square dense icon="img:/images/standard/save.png"/>
            <q-separator vertical/>
            <q-btn size="14px" square dense @click="onUndo();" icon="img:/images/standard/undo.png"/>
            <q-btn size="14px" square dense @click="onRedo();" icon="img:/images/standard/redo.png"/>
            <q-separator vertical/>
            <q-btn size="14px" square dense @click="onCut();" icon="img:/images/standard/cut.png"/>
            <q-btn size="14px" square dense @click="onCopy();" icon="img:/images/standard/copy.png"/>
            <q-btn size="14px" square dense @click="onPaste();" icon="img:/images/standard/paste.png"/>
            <q-separator vertical/>
            <q-btn size="14px" square dense @click="onCode();" icon="img:/images/format/code.png"/>
            <q-separator vertical/>
            <q-select class="toolbar-select" v-model="paragraph_format_model" :options="paragraph_format" @update:model-value="onParagraphFormat();" 
                dense options-dense borderless />
            <q-separator vertical/>
            <q-select class="toolbar-select" v-model="font_family_model" :options="font_family" @update:model-value="onFontFamily();" 
                dense options-dense borderless />
            <q-select class="toolbar-select" v-model="font_size_model" :options="font_size" @update:model-value="onFontSize();" 
                dense options-dense borderless />
            <q-btn size="14px" square dense :color="bold_button_color" @click="onBold();" icon="img:/images/format/bold.png"/>
            <q-btn size="14px" square dense :color="italic_button_color" @click="onItalic();" icon="img:/images/format/italic.png"/>
            <q-btn size="14px" square dense :color="underline_button_color" @click="onUnderline();" icon="img:/images/format/underline.png"/>
        </q-btn-group>
    </div>

    <div class="q-pa-md q-gutter-y-md column items-start" id="algebra-toolbar">
        <q-btn-group id="algebra-toolbar" flat square unelevated stretch>
            <q-btn size="14px" square dense @click="onPlus();" icon="img:/images/algebra/plus.png"/>
            <q-btn size="14px" square dense @click="onMinus();" icon="img:/images/algebra/minus.png"/>
            <q-btn size="14px" square dense @click="onMultiply();" icon="img:/images/algebra/multiply.png"/>
            <q-btn size="14px" square dense @click="onDivision();" icon="img:/images/algebra/division.png"/>
            <q-btn size="14px" square dense @click="onPower();" icon="img:/images/algebra/power.png"/>
            <q-btn size="14px" square dense @click="onSqrt();" icon="img:/images/algebra/sqrt.png"/>
            <q-btn size="14px" square dense @click="onNthRoot();" icon="img:/images/algebra/nth_root.png"/>
            <q-btn size="14px" square dense @click="onSubscript();" icon="img:/images/algebra/subscript.png"/>
            <q-btn size="14px" square dense @click="onFences();" icon="img:/images/algebra/fences.png"/>
            <q-btn size="14px" square dense @click="onAssignment();" icon="img:/images/algebra/assignment.png"/>
            <q-btn size="14px" square dense @click="onEquation();" icon="img:/images/algebra/equation.png"/>
        </q-btn-group>
    </div>

    <div class="editor-container" id="editor" tabindex=0>
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1 />
        
        <div id="scroll-container">
            <div id="scroll-space" />
        </div>
    </div>

    <q-resize-observer @resize="onResize" />
</template>

<script>
    import { ref } from 'vue'

    export default {
        name: 'YutovoWeb',

        created()
        {
            if (window.addEventListener)
                window.addEventListener('setStandardToolbar', this.setStandardToolbar, false);
            else
                window.attachEvent('setStandardToolbar', this.setStandardToolbar);
        },

        setup()
        {
            const style = ref({ width: '200px', height: '200px' });

            let s_js = document.createElement('script');
            s_js.setAttribute('type', 'text/javascript');
            s_js.setAttribute('src', 'coi-serviceworker.js');
            document.body.appendChild(s_js);

            let yutovo_web_js = document.createElement('script');
            yutovo_web_js.setAttribute('type', 'text/javascript');
            yutovo_web_js.setAttribute('src', 'yutovo_web.js');
            document.body.appendChild(yutovo_web_js);

            return {
                style,

                paragraph_format_model: ref('Text body'),
                paragraph_format: [
                    'Text body', 'Header 1', 'Header 2', 'Header 3', 'Monospace', 'Code'
                ],

                font_family_model: ref('Arial'),
                font_family: [
                    '', 'Arial', 'Courier New', 'Free Mono', 'Times New Roman'
                ],

                font_size_model: ref('14'),
                font_size: [
                    '', '6', '7', '8', '9', '10', '11', '12', '14', '16', '18', '20'
                ],

                bold_model: ref(null),

                onResize() {
                    var scroll = document.getElementById('scroll-container');
                    if (scroll)
                    {
                        window.dispatchEvent(new Event('resize'));
                        var canvas = document.getElementById('canvas');
                        if (canvas)
                            canvas.focus();
                    }

                    var editor = document.getElementById('editor');
                    if (editor)
                    {
                        var scroll_width = window.innerWidth - document.documentElement.clientWidth;
                        var standard_toolbar = document.getElementById("standard-toolbar");
                        var algebra_toolbar = document.getElementById("algebra-toolbar");
                        editor.style.height = "calc(100vh - " + standard_toolbar.clientHeight.toString() + "px - " + 
                            algebra_toolbar.clientHeight.toString() + "px - " + scroll_width + "px - " + "2em)";
                        editor.style.height = scroll.clientHeight;
                        console.log(editor.style.height);
                    }
                }
            };
        },

        mounted()
        {
            window.sockets = new Map();
            window.socket_id = 1;

            var Module =
                {
                    preRun: [],
                    postRun: [],
                    
                    print: (
                        function()
                        {
                            var element = document.getElementById('output');
                            if (element)
                                element.value = ''; // clear browser cache
                            return function(text)
                                {
                                    if (arguments.length > 1)
                                        text = Array.prototype.slice.call(arguments).join(' ');
                                    console.log(text);
                                    if (element)
                                    {
                                        element.value += text + '\n';
                                        element.scrollTop = element.scrollHeight; // focus on bottom
                                    }
                                };
                        })(),
                    
                    canvas: (
                        function()
                        {
                            var canvas = document.getElementById('canvas');

                            // As a default initial behavior, pop up an alert when webgl context is lost. To make your
                            // application robust, you may want to override this behavior before shipping!
                            // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
                            canvas.addEventListener('webglcontextlost', 
                                function(e)
                                {
                                    alert('WebGL context lost. You will need to reload the page.');
                                    e.preventDefault();
                                }, 
                                false);
                            return canvas;
                        })(),
                    
                    setStatus: 
                        function(text)
                        {
                            if (!Module.setStatus.last)
                                Module.setStatus.last = { time: Date.now(), text: '' };
                            if (text === Module.setStatus.last.text)
                                return;
                            var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                            var now = Date.now();
                            if (m && now - Module.setStatus.last.time < 30)
                                return; // if this is a progress update, skip it if too soon
                            Module.setStatus.last.time = now;
                            Module.setStatus.last.text = text;
                            if (m)
                            {
                                text = m[1];
                            }
                        },
                    
                    totalDependencies: 0,

                    monitorRunDependencies: 
                        function(left)
                        {
                            this.totalDependencies = Math.max(this.totalDependencies, left);
                            Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
                        },

                    onRuntimeInitialized: 
                        function()
                        {
                            const on_scroll = Module.cwrap('OnScroll', 'number', ['number', 'number']);

                            var scroll = document.getElementById('scroll-container');
                            scroll.addEventListener('scroll', (event) =>
                                {
                                    if (event.type != 'scroll')
                                        return;
                                    on_scroll(scroll.scrollLeft, scroll.scrollTop);
                                });
                            scroll.onclick = 
                                function()
                                {
                                    document.getElementById('canvas').focus();
                                }
                        }
                };
            
            window.Module = Module;
        },

        data()
        {
            return {
                bold_button_color: 'white',
                italic_button_color: 'white',
                underline_button_color: 'white'
            }
        },

        methods:
        {
            setStandardToolbar(event)
            {
                this.paragraph_format_model = event.detail.paragraph_format;
                this.font_family_model = event.detail.font_family;
                this.font_size_model = event.detail.font_size;
                this.bold_button_color = (event.detail.bold == true ? 'blue' : 'white');
                this.italic_button_color = (event.detail.italic == true ? 'blue' : 'white');
                this.underline_button_color = (event.detail.underline == true ? 'blue' : 'white');
            },

            onCode()
            {
                Module.cwrap('OnCode', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onParagraphFormat()
            {
                Module.cwrap('OnParagraphFormat', 'void', ['string'])(this.paragraph_format_model);
                document.getElementById('canvas').focus();
            },

            onFontFamily()
            {
                Module.cwrap('OnFontFamily', 'void', ['string'])(this.font_family_model);
                document.getElementById('canvas').focus();
            },

            onFontSize()
            {
                Module.cwrap('OnFontSize', 'void', ['string'])(this.font_size_model);
                document.getElementById('canvas').focus();
            },

            onBold()
            {
                if (this.bold_button_color == 'blue')
                    this.bold_button_color = 'white';
                else
                    this.bold_button_color = 'blue';
                Module.cwrap('OnBold', 'void', [])(this.bold_button_color == 'blue');
                document.getElementById('canvas').focus();
            },

            onItalic()
            {
                if (this.italic_button_color == 'blue')
                    this.italic_button_color = 'white';
                else
                    this.italic_button_color = 'blue';
                Module.cwrap('OnItalic', 'void', [])(this.italic_button_color == 'blue');
                document.getElementById('canvas').focus();
            },

            onUnderline()
            {
                if (this.underline_button_color == 'blue')
                    this.underline_button_color = 'white';
                else
                    this.underline_button_color = 'blue';
                Module.cwrap('OnUnderline', 'void', [])(this.underline_button_color == 'blue');
                document.getElementById('canvas').focus();
            },

            onNew()
            {
                Module.cwrap('OnNew', 'void', [])();
            },

            onUndo()
            {
                Module.cwrap('OnUndo', 'void', [])();
            },

            onRedo()
            {
                Module.cwrap('OnRedo', 'void', [])();
            },

            onCut()
            {
                Module.cwrap('OnCut', 'void', [])();
            },

            onCopy()
            {
                Module.cwrap('OnCopy', 'void', [])();
            },

            onPaste()
            {
                Module.cwrap('OnPaste', 'void', [])();
            },

            onPlus()
            {
                Module.cwrap('OnPlus', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onMinus()
            {
                Module.cwrap('OnMinus', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onMultiply()
            {
                Module.cwrap('OnMultiply', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onDivision()
            {
                Module.cwrap('OnDivision', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onPower()
            {
                Module.cwrap('OnPower', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onSqrt()
            {
                Module.cwrap('OnSqrt', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onNthRoot()
            {
                Module.cwrap('OnNthRoot', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onSubscript()
            {
                Module.cwrap('OnSubscript', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onFences()
            {
                Module.cwrap('OnFences', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onAssignment()
            {
                Module.cwrap('OnAssignment', 'void', [])();
                document.getElementById('canvas').focus();
            },

            onEquation()
            {
                Module.cwrap('OnEquation', 'void', [])();
                document.getElementById('canvas').focus();
            }
        }
    };
</script>

<style scoped>
    .editor-container {
        border: 0px;
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    
    canvas.emscripten {
        border: 0px none;
        background-color: white;
    }

    #canvas {
        border: 0px none;
        background-color: white;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        position: absolute;
    }

    #scroll-container {
        border: 0px;
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: scroll;
    }

    #scroll-space {
    }

    .q-pa-md {
        padding: 0em 0 0 1em;
    }

    .toolbar-select {
        padding: 0em 0 0 0.5em;
    }
</style>

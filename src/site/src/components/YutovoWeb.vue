<template>
    <div class="editor-container" tabindex=0>
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1></canvas>
        
        <div id="scroll-container">
            <div id="scroll-space"></div>
        </div>
    </div>

    <q-resize-observer @resize="onResize" />

    <div v-if="report" class="q-gutter-sm">
        <q-badge>width: {{ report.width }}</q-badge>
        <q-badge>height: {{ report.height }}</q-badge>
    </div>
</template>

<script>
    import { ref } from 'vue'

    export default {
        name: 'YutovoWeb',

        setup()
        {
            const style = ref({ width: '200px', height: '200px' })
            const report = ref(null)

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
                report,

                onResize (size) {
                    report.value = size;
                    var scroll = document.getElementById('scroll-container');
                    if (scroll)
                    {
                        window.dispatchEvent(new Event('resize'));
                        var canvas = document.getElementById('canvas');
                        if (canvas)
                            canvas.focus();
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
                                    var canvas = document.getElementById('canvas');
                                    canvas.focus();
                                }
                            scroll.onresize = 
                                function()
                                {
                                    var canvas = document.getElementById('canvas');
                                    canvas.width = window.innerWidth;
                                    canvas.height = window.innerHeight;
                                };
                        }
                };
            
            window.Module = Module;
        }
    };
</script>

<style scoped>
    .editor-container {
        border: 1px solid black;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    div.emscripten {
        text-align: center;
    }

    div.emscripten_border {
        border: 1px solid black;
    }

    canvas.emscripten {
        border: 0px none; background-color: white;
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
        width: 1500px;
        height: 2500px;
    }

    .spinner {
        height: 50px;
        width: 50px;
        margin: 0px auto;
        -webkit-animation: rotation .8s linear infinite;
        -moz-animation: rotation .8s linear infinite;
        -o-animation: rotation .8s linear infinite;
        animation: rotation 0.8s linear infinite;
        border-left: 10px solid rgb(0,150,240);
        border-right: 10px solid rgb(0,150,240);
        border-bottom: 10px solid rgb(0,150,240);
        border-top: 10px solid rgb(100,0,200);
        border-radius: 100%;
        background-color: rgb(200,100,250);
    }
    @-webkit-keyframes rotation {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    @-moz-keyframes rotation {
        from {-moz-transform: rotate(0deg);}
        to {-moz-transform: rotate(360deg);}
    }
    @-o-keyframes rotation {
        from {-o-transform: rotate(0deg);}
        to {-o-transform: rotate(360deg);}
    }
    @keyframes rotation {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
</style>

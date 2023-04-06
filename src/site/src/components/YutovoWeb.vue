<template>
    <div class="emscripten_border" style="width:100%; height:100%">
        <figure style="overflow:visible;" id="spinner">
            <div class="spinner">
            </div>
            <center style="margin-top:0.5em">
                <strong>emscripten</strong>
            </center>
        </figure>
        <div class="emscripten" id="status">Downloading...</div>
        <div class="emscripten">
            <progress value="0" max="100" id="progress" hidden=1></progress>  
        </div>
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1 style="width:100%; height:100%"></canvas>
        <hr/>
    </div>
</template>

<script>
    export default {
        name: "YutovoWeb",

        setup()
        {
            let s_js = document.createElement('script');
            s_js.setAttribute('type', 'text/javascript');
            s_js.setAttribute('src', 'coi-serviceworker.js');
            document.body.appendChild(s_js);

            let yutovo_web_js = document.createElement('script');
            yutovo_web_js.setAttribute('type', 'text/javascript');
            yutovo_web_js.setAttribute('src', 'yutovo_web.js');
            document.body.appendChild(yutovo_web_js);
        },

        mounted()
        {
            var statusElement = document.getElementById('status');
            var progressElement = document.getElementById('progress');
            var spinnerElement = document.getElementById('spinner');

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
                                        element.value += text + "\n";
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
                            canvas.addEventListener("webglcontextlost", 
                                function(e)
                                {
                                    alert('WebGL context lost. You will need to reload the page.');
                                    e.preventDefault();
                                }, false);
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
                                progressElement.value = parseInt(m[2])*100;
                                progressElement.max = parseInt(m[4])*100;
                                progressElement.hidden = false;
                                spinnerElement.hidden = false;
                            }
                            else
                            {
                                progressElement.value = null;
                                progressElement.max = null;
                                progressElement.hidden = true;
                                if (!text)
                                    spinnerElement.hidden = true;
                            }
                            statusElement.innerHTML = text;
                        },
                        totalDependencies: 0,
                        monitorRunDependencies: 
                            function(left)
                            {
                                this.totalDependencies = Math.max(this.totalDependencies, left);
                                Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
                            }
                };
            
            Module.setStatus('Downloading...');
            window.onerror = 
                function()
                {
                    Module.setStatus('Exception thrown, see JavaScript console');
                    spinnerElement.style.display = 'none';
                    Module.setStatus = 
                        function(text)
                        {
                            if (text)
                                console.error('[post-exception status] ' + text);
                        };
                };
            
            window.Module = Module;
        }
    };
</script>

<style scoped>
    div.emscripten {
        text-align: center;
    }
    div.emscripten_border {
        border: 1px solid black;
    }
    canvas.emscripten {
        border: 0px none; background-color: white;
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

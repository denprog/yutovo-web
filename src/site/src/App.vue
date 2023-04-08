<template>
    <div>
        <vue-file-toolbar-menu :content="my_menu" />
    </div>
    <div class="yutovo-web-container">
        <yutovo-web>
        </yutovo-web>
    </div>
    <div class="log-container">
        <textarea class="log" id="output"></textarea>
    </div>
</template>

<script>
    import VueFileToolbarMenu from 'vue-file-toolbar-menu'
    import YutovoWeb from './components/YutovoWeb.vue'

    export default {
        name: "app",
        
        components: { VueFileToolbarMenu, YutovoWeb },

        data () { return { happy: false } },

        computed: {
            my_menu () {
                return [
                    {
                        text: "File", menu:
                            [
                                {
                                    text: "New", click: () => alert("Action 1")
                                },
                                {
                                    text: "Open", click: () => alert("Action 2")
                                },
                                {
                                    text: "Save"
                                },
                                {
                                    is: "separator"
                                },
                                {
                                    text: "Exit", click ()
                                        {
                                            if (confirm("Do you want to close the page?"))
                                                window.close();
                                        }
                                }
                            ]
                    },
                    {
                        text: "Edit", menu:
                            [
                                {
                                    text: "Undo"
                                },
                                {
                                    text: "Redo"
                                },
                                {
                                    is: "separator"
                                },
                                {
                                    text: "Cut"
                                },
                                {
                                    text: "Copy"
                                },
                                {
                                    text: "Paste"
                                }
                            ]
                    },
                    {
                        text: "View", menu:
                            [
                            ]
                    },
                    {
                        text: "Help", menu:
                            [
                                {
                                    text: "About"
                                }
                            ]
                    }
                ]
    }
  }
}
</script>

<style>
    html, body {
        height: 99%;
        margin: 0;
        padding: 0;
    }

    .yutovo-web-container {
        text-align: center;
        border: 1px solid black;
        top: 0;
        left: 0;
        width: 99%;
        height: 85vh;
        margin: 2px;
        margin-left: auto;
        margin-right: auto;
    }

    .log-container {
        border: 1px solid black;
        width: 99%;
        height: 9vh;
        margin: 2px;
        margin-left: auto;
        margin-right: auto;
    }    

    .log {
        width: 100%;
        height: 100%;
        box-sizing:border-box;
        resize: none;
    }    
</style>

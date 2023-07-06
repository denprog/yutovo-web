<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="Quasar_Logo.png">
                    </q-avatar>
                    Yutovo
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above :width="leftDrawerWidth" v-model="leftDrawerOpen" side="left" bordered>
            Test
            <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeLeftDrawer" class="q-left_drawer__resizer"></div>
        </q-drawer>

        <q-drawer show-if-above :width="rightDrawerWidth" v-model="rightDrawerOpen" side="right" bordered>
            <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeRightDrawer" class="q-right_drawer__resizer"></div>
            <div>
                Test text
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from 'vue'

export default
{
    setup()
    {
        const leftDrawerOpen = ref(false)
        const rightDrawerOpen = ref(false)
        let initialLeftDrawerWidth
        let initialRightDrawerWidth
        const leftDrawerWidth = ref(300)
        const rightDrawerWidth = ref(300)

        return {
            drawer: ref(false),

            leftDrawerWidth,
            rightDrawerWidth,

            resizeLeftDrawer (ev) {
                if (ev.isFirst === true)
                    initialLeftDrawerWidth = leftDrawerWidth.value
                leftDrawerWidth.value = initialLeftDrawerWidth + ev.offset.x
            },
            resizeRightDrawer (ev) {
                if (ev.isFirst === true)
                    initialRightDrawerWidth = rightDrawerWidth.value
                rightDrawerWidth.value = initialRightDrawerWidth - ev.offset.x
            },

            leftDrawerOpen,

            toggleLeftDrawer()
            {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },

            rightDrawerOpen,

            toggleRightDrawer()
            {
                rightDrawerOpen.value = !rightDrawerOpen.value
            }
        }
    }
}
</script>

<style>
.q-left_drawer__resizer
{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0px;
    width: 6px;
    cursor: ew-resize;
}

.q-right_drawer__resizer
{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 100%;
    width: 6px;
    cursor: ew-resize;
}

&:after
{
    content: '';
    position: absolute;
    top: 50%;
    height: 30px;
    left: -5px;
    right: -5px;
    transform: translateY(-50%);
    background-color: inherit;
    border-radius: 4px;
}
</style>

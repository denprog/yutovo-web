<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-btn no-caps dense flat @click="$router.push('/')">
                        <q-avatar>
                            <img src="Quasar_Logo.png">
                        </q-avatar>
                    </q-btn>
                    <q-btn no-caps dense flat size="15pt" @click="$router.push('/')">
                        Yutovo
                    </q-btn>
                </q-toolbar-title>

                <q-btn dense no-caps flat @click="showLoginDialog">Login</q-btn>
                <q-btn dense no-caps flat @click="showRegisterDialog">Register</q-btn>
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
import LoginDialog from 'layouts/LoginDialog.vue';
import RegisterDialog from 'layouts/RegisterDialog.vue';

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
    },

    methods:
    {
        showRegisterDialog()
        {
            this.registerDialog = this.$q
                .dialog({
                  component: RegisterDialog,

                  // optional if you want to have access to
                  // Router, Vuex store, and so on, in your
                  // custom component:
                  parent: this, // becomes child of this Vue node
                  // ("this" points to your Vue component)
                  // (prop was called "root" in < 1.1.0 and
                  // still works, but recommending to switch
                  // to the more appropriate "parent" name)

                  // props forwarded to component
                  // (everything except "component" and "parent" props above):
                  apiResponse: this.resp
                  // ...more.props...
                })
                .onOk(() => {
                  console.log('OK')
                })
                .onCancel(() => {
                  console.log('Cancel')
                })
                .onDismiss(() => {
                  console.log('Called on OK or Cancel')
                })
        },

        showLoginDialog()
        {
            this.loginDialog = this.$q
                .dialog({
                  component: LoginDialog,

                  // optional if you want to have access to
                  // Router, Vuex store, and so on, in your
                  // custom component:
                  parent: this, // becomes child of this Vue node
                  // ("this" points to your Vue component)
                  // (prop was called "root" in < 1.1.0 and
                  // still works, but recommending to switch
                  // to the more appropriate "parent" name)

                  // props forwarded to component
                  // (everything except "component" and "parent" props above):
                  apiResponse: this.resp
                  // ...more.props...
                })
                .onOk(() => {
                  console.log('OK')
                })
                .onCancel(() => {
                  console.log('Cancel')
                })
                .onDismiss(() => {
                  console.log('Called on OK or Cancel')
                })
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
</style>

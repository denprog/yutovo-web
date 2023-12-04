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
                        {{ $t('yutovo_caption') }}
                    </q-btn>
                </q-toolbar-title>

                <div class="text-white q-pa-sm" v-if="documentName != ''">{{ documentName }}</div>

                <q-select v-model="locale" class="language-select" :options="localeOptions" @update:model-value="onLanguage();" dense borderless no-caps 
                    flat emit-value map-options options-dense style="padding-left:10px;padding-right:10px;" />

                <div class="text-white q-pa-sm" id='login_caption' v-if="loginStr != ''">{{ loginStr }}</div>
                <q-btn id='login' dense no-caps flat v-if="loginState" @click="showLoginDialog">Login</q-btn>
                <q-btn id='register' dense no-caps flat v-if="loginState" @click="showRegisterDialog">Register</q-btn>
                <q-btn id='logout' dense no-caps flat v-if="logoutState" @click="logout">Logout</q-btn>
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above :width="leftDrawerWidth" v-model="leftDrawerOpen" side="left" bordered>
            <documents-tree v-if="loginStr != ''">
            </documents-tree>
            <tasks-tree>
            </tasks-tree>
            <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeLeftDrawer" class="q-left_drawer__resizer"></div>
        </q-drawer>

        <q-drawer show-if-above :width="rightDrawerWidth" v-model="rightDrawerOpen" side="right" bordered>
            <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeRightDrawer" class="q-right_drawer__resizer"></div>
            <identifiers-tree>
            </identifiers-tree>
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
import TasksTree from 'components/TasksTree.vue';
import DocumentsTree from 'components/DocumentsTree.vue';
import IdentifiersTree from 'components/IdentifiersTree.vue';
import { Cookies } from 'quasar'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'
import { useI18n } from 'vue-i18n'

export default
{
    components: { IdentifiersTree, TasksTree, DocumentsTree },

    setup()
    {
        const leftDrawerOpen = ref(false);
        const rightDrawerOpen = ref(false);
        let initialLeftDrawerWidth;
        let initialRightDrawerWidth;
        const leftDrawerWidth = ref(200);
        const rightDrawerWidth = ref(200);

        const store = useStore();

        const loginState = computed({
            get: () => (store.state.login.login == '')
        })

        const logoutState = computed({
            get: () => (store.state.login.login != '')
        })

        const loginStr = computed({
            get: () => (store.state.login.login)
        })

        const documentName = computed({
            get: () => (store.state.editor.document_name)
        })

        const logout = () =>
        {
            api.post('/auth/logout', 
                {
                    login: store.state.login.login
                },
                {
                    headers:
                    {
                        access_token: store.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        store.dispatch('login/updateAccessToken', '');
                        Cookies.remove('document_id');
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        store.dispatch('login/updateAccessToken', '');
                        Cookies.remove('document_id');
                    }
                );
        };

        const { locale } = useI18n({ useScope: 'global' });

        return {
            drawer: ref(false),

            leftDrawerWidth,
            rightDrawerWidth,

            resizeLeftDrawer (ev)
            {
                if (ev.isFirst === true)
                    initialLeftDrawerWidth = leftDrawerWidth.value;
                let w = initialLeftDrawerWidth + ev.offset.x;
                if (w > 50 && w < window.screen.width - 50 - rightDrawerWidth.value)
                    leftDrawerWidth.value = w;
            },

            resizeRightDrawer (ev)
            {
                if (ev.isFirst === true)
                    initialRightDrawerWidth = rightDrawerWidth.value;
                let w = initialRightDrawerWidth - ev.offset.x;
                if (w > 50 && w < window.screen.width - 50 - leftDrawerWidth.value)
                    rightDrawerWidth.value = w;
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
            },

            store,

            loginState,
            logoutState,
            logout, 
            loginStr,
            documentName,

            locale,
            localeOptions: [
                { value: 'en', label: 'English' },
                { value: 'ru', label: 'Русский' }
            ]
        }
    },

    mounted()
    {
        //auto-login
        const store = useStore();

        api.post('/auth/refresh-token', {}).then(
            function(response)
            {
                store.dispatch('login/updateAccessToken', response.headers['access_token']);
                store.commit('login/setLastError', '');
            }
        ).catch(
            function(response)
            {
                console.log(response);
                store.dispatch('login/updateAccessToken', '');
            }
        );
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
        },

        onLanguage()
        {
            this.store.commit('editor/setLanguage', this.locale);
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

.language-select
{
    .q-field__native
    {
        color: white;
    }
}

#documents-tree
{
    height: 50%;
    overflow: scroll;
}
</style>

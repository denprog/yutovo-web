<template>
    <div style="height:100%;">
        <q-layout view="hHh lpR fFf">
            <q-header id="header" elevated class="bg-primary text-white">
                <q-toolbar>
                    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                    <div>
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
                    </div>

                    <div class="text-white text-h6 q-pl-lg" id='document-name' v-if="documentName != ''">{{ documentName }}</div>
                    <q-space />

                    <q-select v-model="locale" id='language-select' class="language-select" :options="localeOptions" @update:model-value="onLanguage();" 
                        dense borderless no-caps flat emit-value map-options options-dense style="padding-left:10px;padding-right:10px;" />

                    <div class="text-white q-pa-sm" id='login_caption' v-if="loginStr != ''">{{ loginStr }}</div>
                    <q-btn id='login' dense no-caps flat v-if="loginState" @click="showLoginDialog">Login</q-btn>
                    <q-btn id='register' dense no-caps flat v-if="loginState" @click="showRegisterDialog">Register</q-btn>
                    <q-btn id='logout' dense no-caps flat v-if="logoutState" @click="logout">Logout</q-btn>
                    <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
                </q-toolbar>
            </q-header>

            <div style="height:100%;">
                <q-drawer show-if-above :width="leftDrawerWidth" v-model="leftDrawerOpen" side="left" bordered>
                    <div style="height:calc(85vh);">
                        <div style="height:50%;" v-if="loginStr != ''">
                            <documents-tree v-if="loginStr != ''">
                            </documents-tree>
                        </div>
                        <div style="height:50%;">
                            <tasks-tree>
                            </tasks-tree>
                        </div>
                    </div>
                    <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeLeftDrawer" class="q-left_drawer__resizer"></div>
                </q-drawer>
            </div>

            <div style="height:100%;">
                <q-drawer show-if-above :width="rightDrawerWidth" v-model="rightDrawerOpen" side="right" bordered>
                    <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeRightDrawer" class="q-right_drawer__resizer"></div>
                    <div style="height:calc(85vh);">
                        <identifiers-tree>
                        </identifiers-tree>
                    </div>
                </q-drawer>
            </div>

            <q-page-container>
                <router-view />
            </q-page-container>

            <q-footer id="footer" class="bg-blue-9 q-pa-none text-white">
                <div style="float:right;">
                    <q-btn class="q-pl-sm text-white" size="1em" id='download' dense no-caps flat @click="showDownloadDialog">{{$t('Download PC version')}}</q-btn>
                    <q-btn class="q-pl-sm text-white" size="1em" id='license' dense no-caps flat @click="showLicenseDialog">{{$t('Terms of use')}}</q-btn>
                    <q-btn class="q-pl-sm text-white" size="1em" id='privacy' dense no-caps flat @click="showPrivacyDialog">{{$t('Privacy policy')}}</q-btn>
                    <q-btn class="q-pl-sm text-white" size="1em" id='about' dense no-caps flat @click="showAboutDialog">{{$t('About')}}</q-btn>
                </div>
            </q-footer>
        </q-layout>
    </div>
</template>

<script>
import { ref } from 'vue'
import LoginDialog from 'layouts/LoginDialog.vue';
import RegisterDialog from 'layouts/RegisterDialog.vue';
import TasksTree from 'components/TasksTree.vue';
import DocumentsTree from 'components/DocumentsTree.vue';
import IdentifiersTree from 'components/IdentifiersTree.vue';
import AboutDialog from 'layouts/AboutDialog.vue';
import LicenseDialog from 'layouts/LicenseDialog.vue';
import PrivacyDialog from 'layouts/PrivacyDialog.vue';
import DownloadDialog from 'layouts/DownloadDialog.vue';
import { Cookies } from 'quasar'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'
import { useI18n } from 'vue-i18n'

export default
{
    components: { IdentifiersTree, TasksTree, DocumentsTree },

    mounted()
    {
        if (!this.$q.cookies.has('app_initialized'))
        {
            this.$q.notify({
                message: this.$t('This website uses cookies for normal functioning.'),
                color: 'blue-9',
                multiLine: true,
                timeout: 0,
                actions: [
                    {
                        label: 'OK', color: 'white', handler: () => { /* ... */ }
                    }
                ]
            });
            this.$q.cookies.set('app_initialized', true, {path: '/', expires: '30d'});
        }
    },

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
                    function()
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

    watch:
    {
        'store.state.editor.language': function()
        {
            if (this.locale != this.store.state.editor.language)
                this.locale = this.store.state.editor.language;
        },

        'store.state.login.login': function()
        {
            var s = this.store;
            api.post('/auth/get-language', {},
                {
                    headers:
                    {
                        access_token: s.state.login.access_token
                    }
                }
                ).then(
                function(response)
                {
                    s.commit('editor/setLanguage', response.data.language);
                }
            ).catch(
                function(response)
                {
                    console.log(response);
                }
            );
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

            if (this.store.state.login.login != '')
            {
                api.post('/auth/set-language', 
                    {
                        language: this.locale == 'ru' ? 'ru_RU' : 'en_EN'
                    },
                    {
                        headers:
                        {
                            access_token: this.store.state.login.access_token
                        }
                    }
                    ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
            }
        },

        showDownloadDialog()
        {
            this.downloadDialog = this.$q
                .dialog({
                    component: DownloadDialog,
                    parent: this,
                    apiResponse: this.resp
                })
        },

        showLicenseDialog()
        {
            this.licenseDialog = this.$q
                .dialog({
                    component: LicenseDialog,
                    parent: this,
                    apiResponse: this.resp
                })
        },

        showPrivacyDialog()
        {
            this.privacyDialog = this.$q
                .dialog({
                    component: PrivacyDialog,
                    parent: this,
                    apiResponse: this.resp
                })
        },

        showAboutDialog()
        {
            this.aboutDialog = this.$q
                .dialog({
                    component: AboutDialog,
                    parent: this,
                    apiResponse: this.resp
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

.language-select
{
    .q-field__native
    {
        color: white;
    }
}

.q-btn
{
    line-height: 1em;
    font-weight: 400;
}

#documents-tree
{
    height: 50%;
    overflow: scroll;
}

.q-dialog-plugin {
    width: 200px !important;
}
</style>

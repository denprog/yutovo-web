<template>
<q-dialog ref="loginDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset" class="q-sm">
                        <div class="text-blue text-h5">{{ $t('Login') }}</div>
                        <q-input ref="loginRef" square class="q-pa-none" v-model="login" lazy-rules :rules="[this.required]" id="username" type="username" 
                            v-bind:label="$t('user name')" />
                        <q-input ref="passwordRef" square class="q-pa-none" v-model="password" lazy-rules :rules="[this.required]" id="password" type="password" 
                            v-bind:label="$t('password')" />
                        <br/>
                        <a href="#" onclick="return false;" @click="onRecoverPassword">{{ $t('Recover password') }}</a>
                        <br/>
                        <q-img :src="captchaImageRef" />
                        <div class="text-grey-6">{{ $t('Type the symbols above:') }}</div>
                        <template v-if="isProduction">
                            <q-input class="q-pa-none" ref="captchaRef" square v-model="captcha" lazy-rules :rules="[this.required]">
                                <template v-slot:append>
                                    <q-icon name="refresh" class="cursor-pointer" @click="onRefreshCaptcha" />
                                </template>
                            </q-input>
                        </template>
                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" type="submit" id="submit" v-bind:label="$t('Login')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import { api } from 'boot/boot'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import RecoverPasswordDialog from 'layouts/RecoverPasswordDialog.vue'

export default
{
    name: 'LoginDialog',

    data()
    {
        return {
            isProduction: this.$q.config.production === true
        }
    },

    setup()
    {
        const login = ref('');
        const loginRef = ref(null);
        const password = ref('');
        const passwordRef = ref(null);
        const captchaImageRef = ref(null);
        const captcha = ref('');
        const captchaRef = ref(null);
        const loginDialog = ref(null);
        const store = useStore();
        const tr = useI18n();
        const $q = useQuasar();

        store.commit('login/setLastError', '');

        const required = (val) =>
        {
            return  (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const lastErrorState = computed({
            get: () => (tr.t(store.state.login.last_error))
        })

        const onReset = () =>
        {
            loginDialog.value.hide();
        };

        const onRefreshCaptcha = () =>
        {
            api.post('/auth/get-captcha', {})
                .then(
                    function(response)
                    {
                        captchaImageRef.value = 'data:image/jpeg;base64, ' + response.data.captcha;
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
        };

        const onRecoverPassword = () =>
        {
            console.log('onRecoverPassword');
            $q.dialog(
                {
                    component: RecoverPasswordDialog,
                    parent: this
                })
            loginDialog.value.hide();
        };

        const router = useRouter();

        api.post('/auth/get-captcha', {})
            .then(
                function(response)
                {
                    captchaImageRef.value = 'data:image/jpeg;base64, ' + response.data.captcha;
                }
            ).catch(
                function(response)
                {
                    console.log(response);
                }
            );

        const onSubmit = () =>
        {
            loginRef.value.validate();
            passwordRef.value.validate();

            var empty = window.Module.cwrap('IsEmpty', 'bool', [])();

            api.post('/auth/login', 
                {
                    login: login.value,
                    password: password.value,
                    captcha: captcha.value,
                    load_last: empty
                }
                ).then(
                    function(response)
                    {
                        store.dispatch('login/updateAccessToken', response.headers['access_token']);
                        store.commit('login/setLastError', '');
                        loginDialog.value.hide();

                        if (!empty)
                        {
                            //the server returned an empty document for the current non-empty one
                            Cookies.set('document_id', response.data.document_id, {path: '/'});
                        }
                        else
                        {
                            if (Cookies.has('document_id'))
                                window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: Cookies.get('document_id')}}));
                            else if (response.data.document_id > 0)
                            {
                                router.push({ path: '/document/' + response.data.document_id });
                                window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: response.data.document_id}}));
                            }
                        }

                        store.commit('editor/setLanguage', response.data.language);
                        if (response.data.settings != '')
                            store.commit('editor/setSettings', JSON.parse(response.data.settings));

                        console.log(store.state.editor.settings);
                        
                        window.dispatchEvent(new CustomEvent('listDocuments', {}));
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        store.dispatch('login/updateAccessToken', '');
                        if (response.response.data.error != '')
                            store.commit('login/setLastError', response.response.data.error);
                        else
                            store.commit('login/setLastError', 'Login failed');
                    }
                );
        }

        return {
            loginDialog,
            login,
            loginRef,
            password,
            passwordRef,
            captchaImageRef,
            captcha,
            captchaRef,
            lastErrorState,
            required,
            onSubmit,
            onReset,
            onRefreshCaptcha,
            onRecoverPassword,
            router,
            tr
        }
    }
}
</script>

<style scoped>
a {
    color: blue;
}
</style>
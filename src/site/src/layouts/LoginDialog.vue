<template>
    <q-dialog ref="loginDialog">
        <div class="column row justify-center items-center">
            <div class="row">
                <q-card square bordered class="q-sm">
                    <q-card-section>
                        <q-form @submit="onSubmit" @reset="onReset" class="q-sm">
                            <div class="text-blue text-h5">
                                {{ tr.t('Login') }}
                            </div>

                            <q-input ref="loginRef" square class="q-pa-none" v-model="login" lazy-rules :rules="[required]" id="username" type="text"
                                :label="tr.t('user name')"/>

                            <q-input ref="passwordRef" square class="q-pa-none" v-model="password" lazy-rules :rules="[required]" id="password"
                                type="password" :label="tr.t('password')"/>

                            <br />

                            <a href="#" @click.prevent="onRecoverPassword">{{ tr.t('Recover password') }}</a>

                            <br />

                            <q-img :src="captchaImageRef" />

                            <div class="text-grey-6">
                                {{ tr.t('Type the symbols above:') }}
                            </div>

                            <template v-if="isProduction">
                                <q-input ref="captchaRef" square v-model="captcha" lazy-rules :rules="[required]" class="q-pa-none">
                                    <template v-slot:append>
                                        <q-icon name="refresh" class="cursor-pointer" @click="onRefreshCaptcha"/>
                                    </template>
                                </q-input>
                            </template>

                            <p class="text-grey-6" v-if="lastErrorState">
                                {{ lastErrorState }}
                            </p>

                            <div class="q-pa-md q-gutter-sm">
                                <q-btn unelevated class="bg-primary text-white" type="submit" id="submit" :label="tr.t('Login')"/>
                                <q-btn unelevated class="text-blue" type="reset" :label="tr.t('Cancel')"/>
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api } from 'boot/boot';
import { useStore } from 'vuex';
import { Cookies, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import RecoverPasswordDialog from 'layouts/RecoverPasswordDialog.vue';

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const tr = useI18n();

const loginDialog = ref(null);

const login = ref('');
const password = ref('');
const captcha = ref('');

const loginRef = ref(null);
const passwordRef = ref(null);
const captchaRef = ref(null);

const captchaImageRef = ref(null);

const isProduction = $q.config.production === true;

store.commit('login/setLastError', '');

const required = (val: string) =>
{
    return !!val || tr.t('The field must be filled');
};

const lastErrorState = computed(() =>
{
    return tr.t(store.state.login.last_error);
});

const loadCaptcha = () =>
{
    api.post('/auth/get-captcha',
    {
        action: 'login'
    })
    .then((response) =>
    {
        captchaImageRef.value = 'data:image/jpeg;base64,' + response.data.captcha;
    })
    .catch((err) =>
    {
        console.log(err);
    });
};

const onRefreshCaptcha = () =>
{
    loadCaptcha();
};

const onReset = () =>
{
    loginDialog.value.hide();
};

const onRecoverPassword = () =>
{
    $q.dialog(
        {
            component: RecoverPasswordDialog
        });

    loginDialog.value.hide();
};

const onSubmit = () =>
{
    loginRef.value.validate();
    passwordRef.value.validate();

    if (captchaRef.value)
        captchaRef.value.validate();

    const empty = window.Module.cwrap('IsEmpty', 'bool', [])();

    api.post('/auth/login',
    {
        login: login.value,
        password: password.value,
        captcha: captcha.value,
        load_last: empty
    })
    .then((response) =>
    {
        store.dispatch('login/updateAccessToken', response.headers['access_token']);

        store.commit('login/setLastError', '');
        loginDialog.value.hide();

        if (!empty)
        {
            Cookies.set('document_id', response.data.document_id,
                {
                    path: '/' }
                );
        }
        else
        {
            if (Cookies.has('document_id'))
            {
                window.dispatchEvent(new CustomEvent('loadDocument',
                    {
                        detail:
                        {
                            document_id: Cookies.get('document_id')
                        }
                    })
                );
            }
            else if (response.data.document_id > 0)
            {
                router.push(
                    {
                        path: '/document/' + response.data.document_id
                    });

                window.dispatchEvent(new CustomEvent('loadDocument',
                    {
                        detail:
                        {
                            document_id: response.data.document_id
                        }
                    })
                );
            }
        }

        store.commit('editor/setLanguage', response.data.language);

        if (response.data.settings !== '')
            store.commit('editor/setSettings', JSON.parse(response.data.settings));

        window.dispatchEvent(new CustomEvent('listDocuments', {}));
    })
    .catch((response) =>
    {
        store.dispatch('login/updateAccessToken', '');

        if (response.response?.data?.error)
            store.commit('login/setLastError', response.response.data.error);
        else
            store.commit('login/setLastError', 'Login failed');
    });
};

onMounted(() =>
{
    loadCaptcha();
});
</script>

<style scoped>
a
{
    color: blue;
}
</style>
<template>
<q-dialog ref="registerDialog" v-close-popup="closed">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Registration') }}</div>
                        <q-input square v-model="login" lazy-rules :rules="[required]" type="username" 
                            v-bind:label="$t('login')" />
                        <q-input square v-model="name" type="username" v-bind:label="$t('user name')" />
                        <q-input square v-model="email" lazy-rules :rules="[required, isEmail]" type="email" 
                            v-bind:label="$t('email')" />
                        <q-input square v-model="password" lazy-rules :rules="[required]" id="password" type="password" 
                            v-bind:label="$t('password')" />
                        <q-input class="q-pb-lg" ref="repasswordRef" square v-model="repassword" lazy-rules :rules="[required, diffPassword]" 
                            id="repassword" type="password" v-bind:label="$t('repeate password')" />
                        <template v-if="isProduction">
                            <q-img :src="captchaImageRef" />
                            <div class="text-grey-6">{{ $t('Type the symbols above:') }}</div>
                            <q-input class="q-pb-md" ref="captchaRef" square v-model="captcha" lazy-rules :rules="[required]">
                                <template v-slot:append>
                                    <q-icon name="refresh" class="cursor-pointer" @click="onRefreshCaptcha" />
                                </template>
                            </q-input>
                        </template>
                        <template v-if="isProduction">
                            <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                            <div class="q-pa-md q-gutter-sm">
                                <q-btn unelevated class="bg-primary text-white" @click="onSendCode" 
                                    :disabled="login == '' || name == '' || email == '' || password == '' || repassword == '' || captcha == ''" 
                                    v-bind:label="$t('Send code')" />
                                <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                            </div>
                            <q-input ref="emailCodeRef" v-model="emailCode" square v-if="emailCodeSent == true" v-bind:label="$t('Enter code from the e-mail')" />
                            <div class="q-pa-md q-gutter-sm" v-if="emailCodeSent == true">
                                <q-btn ref="register" unelevated class="bg-primary text-white" type="submit" id="submit" v-bind:label="$t('Register')" />
                                <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                            </div>
                        </template>
                        <template v-if="!isProduction">
                            <div class="q-pa-md q-gutter-sm">
                                <q-btn ref="register" unelevated class="bg-primary text-white" type="submit" id="submit" v-bind:label="$t('Register')" />
                                <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                            </div>
                        </template>
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
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import verificationTemplate from '../templates/VerificationEmail.html?raw'
import welcomeTemplate from '../templates/WelcomeEmail.html?raw'

export default
{
    name: 'RegisterDialog',

    data()
    {
        return {
            isProduction: this.$q.config.production === true
        }
    },

    setup()
    {
        const login = ref('');
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const repassword = ref(null);
        const repasswordRef = ref(null);
        const registerDialog = ref(null);
        const captchaImageRef = ref(null);
        const captcha = ref('');
        const captchaRef = ref(null);
        const closed = ref(false);
        const store = useStore();
        const router = useRouter();
        const emailCode = ref('');
        const emailCodeRef = ref(null);
        const emailCodeSent = ref(false);
        const tr = useI18n();

        store.commit('login/setLastError', '');

        api.post('/auth/get-captcha', 
            {
                action: 'register'
            })
            .then(
                function(response)
                {
                    captchaImageRef.value = 'data:image/jpeg;base64, ' + response.data.captcha;
                }
            ).catch(
                function(response)
                {
                    console.log(response);
                    if (response.response.data.error != '')
                        store.commit('login/setLastError', tr.t(response.response.data.error));
                    else
                        store.commit('login/setLastError', tr.t('Getting captcha failed'));
                }
            );

        const required = (val) => 
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const lastErrorState = computed({
            get: () => (tr.t(store.state.login.last_error))
        })

        const isEmail = (val) => 
        {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return (emailPattern.test(val) || tr.t('Enter a correct e-mail'));
        };

        const diffPassword = (val) =>
        {
            return (val === password.value || tr.t('Passwords are not identical'));
        };

        const onRefreshCaptcha = () =>
        {
            store.commit('login/setLastError', '');
            api.post('/auth/get-captcha', 
                {
                    action: 'register'
                })
                .then(
                    function(response)
                    {
                        captchaImageRef.value = 'data:image/jpeg;base64, ' + response.data.captcha;
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        if (response.response.data.error != '')
                            store.commit('login/setLastError', tr.t(response.response.data.error));
                        else
                            store.commit('login/setLastError', tr.t('Getting captcha failed'));
                    }
                );
        };

        const onSendCode = () =>
        {
            store.commit('login/setLastError', '');

            const t = tr.t;
            const htmlMessage = verificationTemplate
                .replace(/{{subject}}/g, t('register_verification_email.subject'))
                .replace(/{{greeting}}/g, t('register_verification_email.greeting'))
                .replace(/{{body1}}/g, t('register_verification_email.body1'))
                .replace(/{{body2}}/g, t('register_verification_email.body2'))
                .replace(/{{code}}/g, 'EMAIL_CODE')
                .replace(/{{code_valid}}/g, t('register_verification_email.code_valid'))
                .replace(/{{ignore}}/g, t('register_verification_email.ignore'))
                .replace(/{{sign}}/g, t('register_verification_email.sign'));

            api.post('/auth/send-email-code', 
                {
                    login: login.value,
                    name: name.value,
                    email: email.value,
                    subject: t('register_verification_email.subject'),
                    message: htmlMessage,
                    captcha: captcha.value,
                    action: 'register'
                }
                ).then(
                    function()
                    {
                        emailCodeSent.value = true;
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        if (response.response.data.error != '')
                            store.commit('login/setLastError', tr.t(response.response.data.error));
                        else
                            store.commit('login/setLastError', tr.t('Sending registration code failed'));
                    }
                );
        };

        const onSubmit = () =>
        {
            store.commit('login/setLastError', '');
            repasswordRef.value.validate();

            api.post('/auth/register', 
                {
                    login: login.value,
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    captcha: captcha.value,
                    email_code: emailCode.value
                }
                ).then(
                    function()
                    {
                        api.post('/auth/login', 
                            {
                                login: login.value,
                                password: password.value,
                                captcha: captcha.value
                            }
                            ).then(
                                function(response)
                                {
                                    store.dispatch('login/updateAccessToken', response.headers['access_token']);
                                    if (response.data.settings != '')
                                        store.commit('editor/setSettings', JSON.parse(response.data.settings));
                                    registerDialog.value.hide();

                                    router.push({ path: '/document/' + response.data.document_id });
                                    Cookies.set('document_id', response.data.document_id, {path: '/'});

                                    const t = tr.t;
                                    const htmlMessage = welcomeTemplate
                                        .replace(/{{subject}}/g, t('welcome_email.subject'))
                                        .replace(/{{greeting}}/g, t('welcome_email.greeting', { name: name.value }))
                                        .replace(/{{congrats}}/g, t('welcome_email.congrats'))
                                        .replace(/{{login_info}}/g, t('welcome_email.login_info', { login: login.value }))
                                        .replace(/{{full_access}}/g, t('welcome_email.full_access'))
                                        .replace(/{{support}}/g, t('welcome_email.support', { email: '<a href="mailto:support@yutovo.ru">support@yutovo.ru</a>'}))
                                        .replace(/{{sign}}/g, t('welcome_email.sign'));

                                    api.post('/auth/send-email', 
                                        {
                                            subject: t('welcome_email.subject'),
                                            message: htmlMessage
                                        },
                                        {
                                            headers:
                                            {
                                                access_token: store.state.login.access_token
                                            }
                                        })
                                        .catch(
                                            function(response)
                                            {
                                                console.log(response);
                                                store.commit('login/setLastError', tr.t('Sending e-mail failed'));
                                            }
                                        );
                                }
                            ).catch(
                                function(response)
                                {
                                    console.log(response);
                                    store.dispatch('login/updateAccessToken', '');
                                    if (response.response.data.error != '')
                                        store.commit('login/setLastError', tr.t(response.response.data.error));
                                    else
                                        store.commit('login/setLastError', tr.t('Login failed'));
                                }
                            );
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        store.dispatch('login/updateAccessToken', '');
                        if (response.response.data.error != '')
                            store.commit('login/setLastError', tr.t(response.response.data.error));
                        else
                            store.commit('login/setLastError', tr.t('Login failed'));
                    }
                );
        };

        const onReset = () =>
        {
            repasswordRef.value = null;
            registerDialog.value.hide();
        };

        return {
            title: 'Register',
            registerDialog,
            login,
            name,
            email,
            password,
            repassword,
            repasswordRef,
            captchaImageRef,
            captcha,
            captchaRef,
            emailCode,
            emailCodeRef,
            onRefreshCaptcha,
            lastErrorState,
            required,
            isEmail,
            diffPassword,
            emailCodeSent,
            onSendCode,
            onSubmit,
            onReset,
            closed,
            router,
            tr
        }
    }
}
</script>

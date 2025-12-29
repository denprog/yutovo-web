<template>
<q-dialog ref="changePasswordDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset" class="q-sm">
                        <div class="text-blue text-h5">{{ $t('Change password') }}</div>
                        <q-input class="q-pa-none" square v-model="password" lazy-rules :rules="[this.required]" id="password" type="password" 
                            v-bind:label="$t('old password')" />
                        <q-input class="q-pa-none" square v-model="newPassword" lazy-rules :rules="[this.required]" id="newPassword" type="password" 
                            v-bind:label="$t('new password')" />
                        <q-input class="q-pb-lg" ref="repasswordRef" square v-model="repassword" lazy-rules :rules="[this.required, this.diffPassword]" 
                            id="repassword" type="password" v-bind:label="$t('repeate password')" />
                        <br/>
                        <q-img class="q-pa-none" :src="captchaImageRef" />
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
                            <q-btn unelevated class="bg-primary text-white" @click="onSendCode" 
                                :disabled="password == '' || newPassword == '' || repassword == '' || captcha == ''" 
                                v-bind:label="$t('Send code')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                        </div>
                        <q-input ref="emailCodeRef" v-model="emailCode" square v-if="emailCodeSent == true" v-bind:label="$t('Enter code from the e-mail')" />
                        <div class="q-pa-md q-gutter-sm" v-if="emailCodeSent == true">
                            <q-btn ref="changePassword" unelevated class="bg-primary text-white" type="submit" id="submit" v-bind:label="$t('Change password')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
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
import { useI18n } from 'vue-i18n'
import verificationTemplate from '../templates/VerificationEmail.html?raw'

export default
{
    name: 'ChangePasswordDialog',

    data()
    {
        return {
            isProduction: this.$q.config.production === true
        }
    },

    setup()
    {
        const changePasswordDialog = ref(null);
        const password = ref('');
        const newPassword = ref('');
        const repassword = ref(null);
        const repasswordRef = ref(null);
        const captcha = ref('');
        const captchaRef = ref(null);
        const captchaImageRef = ref(null);
        const emailCode = ref('');
        const emailCodeRef = ref(null);
        const emailCodeSent = ref(false);
        const tr = useI18n();
        const store = useStore();

        api.post('/auth/get-captcha', 
            {
                action: 'change_password'
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
                    if (response.data.error != '')
                        store.commit('login/setLastError', tr.t(response.data.error));
                    else
                        store.commit('login/setLastError', tr.t('Getting captcha failed'));
                }
            );

        const required = (val) => 
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const lastErrorState = computed(
            {
                get: () => (tr.t(store.state.login.last_error))
            });

        const diffPassword = (val) =>
        {
            return (val === newPassword.value || tr.t('Passwords are not identical'));
        };

        const onRefreshCaptcha = () =>
        {
            store.commit('login/setLastError', '');
            api.post('/auth/get-captcha', 
                {
                    action: 'change_password'
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
                        if (typeof response.response.data.error !== 'undefined')
                            store.commit('login/setLastError', tr.t(response.data.error));
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
                .replace(/{{subject}}/g, t('password_verification_email.subject'))
                .replace(/{{greeting}}/g, t('password_verification_email.greeting'))
                .replace(/{{body1}}/g, t('password_verification_email.body1'))
                .replace(/{{body2}}/g, t('password_verification_email.body2'))
                .replace(/{{code}}/g, 'EMAIL_CODE')
                .replace(/{{code_valid}}/g, t('password_verification_email.code_valid'))
                .replace(/{{ignore}}/g, t('password_verification_email.ignore'))
                .replace(/{{sign}}/g, t('password_verification_email.sign'));

            api.post('/auth/send-email-code', 
                {
                    subject: t('password_verification_email.subject'),
                    message: htmlMessage,
                    captcha: captcha.value,
                    recover: true,
                    action: 'change_password'
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
                        if (typeof response.response.data.error !== 'undefined')
                            store.commit('login/setLastError', tr.t(response.response.data.error));
                        else
                            store.commit('login/setLastError', tr.t('Sending e-mail code failed'));
                    }
                );
        };

        const onSubmit = () =>
        {
            store.commit('login/setLastError', '');
            repasswordRef.value.validate();

            api.post('/service/set-user-settings', 
                {
                    old_password: password.value,
                    password: newPassword.value,
                    captcha: captcha.value,
                    email_code: emailCode.value
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
                        changePasswordDialog.value.hide();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        store.dispatch('login/updateAccessToken', '');
                        if (typeof response.response.data.error !== 'undefined')
                            store.commit('login/setLastError', tr.t(response.response.data.error));
                        else
                            store.commit('login/setLastError', tr.t('Submit failed'));
                    }
                );
        };

        const onReset = () =>
        {
            changePasswordDialog.value.hide();
        };

        return {
            changePasswordDialog,
            required,
            lastErrorState,
            diffPassword,
            onSubmit,
            onReset,
            onSendCode,
            onRefreshCaptcha,
            password,
            newPassword,
            repassword,
            repasswordRef,
            captchaImageRef,
            captcha,
            captchaRef,
            emailCode,
            emailCodeSent,
            emailCodeRef,
            tr
        }
    }
}
</script>
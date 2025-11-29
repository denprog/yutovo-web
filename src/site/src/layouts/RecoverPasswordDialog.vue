<template>
<q-dialog ref="recoverPasswordDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset" class="q-sm">
                        <div class="text-blue text-h5">{{ $t('Recover password') }}</div>
                        <q-input ref="loginRef" square class="q-pa-none" v-model="login" lazy-rules :rules="[this.required]" type="username" 
                            v-bind:label="$t('login or e-mail')" />
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
                            <q-btn unelevated class="bg-primary text-white" @click="onSendCode" :disabled="captcha == ''" v-bind:label="$t('Send code')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                        </div>
                        <q-input ref="emailCodeRef" v-model="emailCode" square v-if="emailCodeSent == true" v-bind:label="$t('Enter code from the e-mail')" />
                        <q-input class="q-pa-none" square v-model="newPassword" v-if="emailCodeSent == true" lazy-rules :rules="[this.required]" type="password" 
                            v-bind:label="$t('new password')" />
                        <q-input class="q-pb-lg" ref="repasswordRef" square v-model="repassword" lazy-rules v-if="emailCodeSent == true" 
                            :rules="[this.required, this.diffPassword]" type="password" v-bind:label="$t('repeate password')" />
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

export default
{
    name: 'RecoverPasswordDialog',

    data()
    {
        return {
            isProduction: this.$q.config.production === true
        }
    },

    setup()
    {
        const recoverPasswordDialog = ref(null);
        const login = ref('');
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
                action: 'recover_password'
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
                    action: 'recover_password'
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
            api.post('/auth/send-email-code', 
                {
                    login: login.value,
                    subject: tr.t('Password recovery code'),
                    message: tr.t('recover_password_email_message'),
                    captcha: captcha.value,
                    recover: true,
                    action: 'recover_password'
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
                            store.commit('login/setLastError', tr.t('Sending registration code failed'));
                    }
                );
        };

        const onSubmit = () =>
        {
            store.commit('login/setLastError', '');
            repasswordRef.value.validate();

            api.post('/service/recover-password', 
                {
                    password: newPassword.value,
                    email_code: emailCode.value
                }
                ).then(
                    function()
                    {
                        recoverPasswordDialog.value.hide();
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
            recoverPasswordDialog.value.hide();
        };

        return {
            recoverPasswordDialog,
            required,
            lastErrorState,
            diffPassword,
            onSubmit,
            onReset,
            onSendCode,
            onRefreshCaptcha,
            login,
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
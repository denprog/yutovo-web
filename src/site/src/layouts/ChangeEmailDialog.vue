<template>
<q-dialog ref="changeEmailDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset" class="q-sm">
                        <div class="text-blue text-h5">{{ $t('e-mail') }}</div>
                        <q-input class="q-pa-none" square ref="newEmailRef" v-model="newEmail" lazy-rules :rules="[this.required]" v-bind:label="$t('new e-mail')" />
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
                            <q-btn unelevated class="bg-primary text-white" @click="onSendCode" :disabled="newEmail == '' || captcha == ''" v-bind:label="$t('Send code')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" v-close-popup />
                        </div>
                        <q-input ref="emailCodeRef" v-model="emailCode" square v-if="emailCodeSent == true" v-bind:label="$t('Enter code from the e-mail')" />
                        <div class="q-pa-md q-gutter-sm" v-if="emailCodeSent == true">
                            <q-btn ref="changeEmail" unelevated class="bg-primary text-white" type="submit" id="submit" v-bind:label="$t('Change e-mail')" />
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
    name: 'ChangeEmailDialog',

    data()
    {
        return {
            isProduction: this.$q.config.production === true
        }
    },

    setup()
    {
        const changeEmailDialog = ref(null);
        const newEmail = ref('');
        const newEmailRef = ref(null);
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
                action: 'change_email'
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

        const onRefreshCaptcha = () =>
        {
            store.commit('login/setLastError', '');
            api.post('/auth/get-captcha', 
                {
                    action: 'change_email'
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
                .replace(/{{subject}}/g, t('email_verification_email.subject'))
                .replace(/{{greeting}}/g, t('email_verification_email.greeting'))
                .replace(/{{body1}}/g, t('email_verification_email.body1'))
                .replace(/{{body2}}/g, t('email_verification_email.body2'))
                .replace(/{{code}}/g, 'EMAIL_CODE')
                .replace(/{{code_valid}}/g, t('email_verification_email.code_valid'))
                .replace(/{{ignore}}/g, t('email_verification_email.ignore'))
                .replace(/{{sign}}/g, t('email_verification_email.sign'));

            api.post('/auth/send-email-code', 
                {
                    email: newEmail.value,
                    subject: t('email_verification_email.subject'),
                    message: htmlMessage,
                    captcha: captcha.value,
                    action: 'change_email'
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
            newEmailRef.value.validate();

            api.post('/service/set-user-settings', 
                {
                    email: newEmail.value,
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
                        changeEmailDialog.value.hide();
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
            changeEmailDialog.value.hide();
        };

        return {
            changeEmailDialog,
            newEmail,
            required,
            lastErrorState,
            onSubmit,
            onReset,
            onSendCode,
            onRefreshCaptcha,
            newEmailRef,
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
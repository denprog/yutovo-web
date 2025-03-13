<template>
<q-dialog ref="userAccountDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onClose">
                        <div class="text-blue text-h5">{{ $t('User account') }}</div>
                        <table class="q-pt-md q-pb-md">
                            <tr>
                                <td>{{ $t('Login') }}</td>
                                <td class="q-pl-md">
                                    <div class="q-pa-sm">{{ loginStr }}</div>
                                </td>
                                <td class="q-pl-md">
                                    <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" @click="onLogout();">{{ $t('Logout') }}</q-btn>
                                </td>
                            </tr>
                            <tr>
                                <td>{{ $t('Name') }}</td>
                                <td class="q-pl-md">
                                    <div class="q-pa-sm">{{ nameStr }}</div>
                                </td>
                                <td class="q-pl-md">
                                    <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" @click="onChangeName();">{{ $t('Change name') }}</q-btn>
                                </td>
                            </tr>
                            <tr>
                                <td>{{ $t('e-mail') }}</td>
                                <td class="q-pl-md">
                                    <div class="q-pa-sm">{{ emailStr }}</div>
                                </td>
                                <td class="q-pl-md">
                                    <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" @click="onChangeEmail();">{{ $t('Change e-mail') }}</q-btn>
                                </td>
                            </tr>
                            <tr>
                                <td>{{ $t('Password') }}</td>
                                <td class="q-pl-md">
                                    <div class="q-pa-sm">*****</div>
                                </td>
                                <td class="q-pl-md">
                                    <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" @click="onChangePassword();">{{ $t('Change password') }}</q-btn>
                                </td>
                            </tr>
                        </table>
                        <div class="q-pa-md q-gutter-sm" style="text-align: center">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" v-bind:label="$t('Close')" />
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
import { useStore } from 'vuex'
import { Cookies } from 'quasar'
import { api } from 'boot/boot'
import ChangePasswordDialog from 'layouts/ChangePasswordDialog.vue';
import ChangeNameDialog from 'layouts/ChangeNameDialog.vue'
import ChangeEmailDialog from 'layouts/ChangeEmailDialog.vue'
import { useQuasar } from 'quasar'

export default
{
    name: 'UserAccount',

    setup()
    {
        const userAccountDialog = ref(null);
        const store = useStore();
        const loginStr = ref('');
        const nameStr = ref('');
        const emailStr = ref('');
        const $q = useQuasar();

        //get user settings
        api.post('/service/get-user-settings', {},
            {
                headers:
                {
                    access_token: store.state.login.access_token
                }
            }
            ).then(
                function(response)
                {
                    loginStr.value = response.data.login;
                    nameStr.value = response.data.name;
                    emailStr.value = response.data.email;
                }
            ).catch(
                function(response)
                {
                    console.log(response);
                    if (typeof response.response.data.error !== 'undefined')
                        alert(t('Error getting settings: ') + t(response.response.data.error));
                    else
                        alert(t('Error getting settings: ') + t(response.response.data));
                }
            );

        const onClose = () =>
        {
            userAccountDialog.value.hide();
        };

        const onLogout = () =>
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
                        userAccountDialog.value.hide();
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

        const onChangeName = () => 
        {
            $q.dialog(
                {
                    component: ChangeNameDialog,
                    parent: this
                })
            userAccountDialog.value.hide();
        };

        const onChangeEmail = () =>
        {
            $q.dialog(
                {
                    component: ChangeEmailDialog,
                    parent: this
                })
            userAccountDialog.value.hide();
        };

        const onChangePassword = () =>
        {
            $q.dialog(
                {
                    component: ChangePasswordDialog,
                    parent: this
                })
            userAccountDialog.value.hide();
        };

        return {
            userAccountDialog,
            onClose,
            onLogout,
            onChangeName,
            onChangeEmail,
            onChangePassword,
            loginStr,
            nameStr,
            emailStr
        }
    }
}
</script>

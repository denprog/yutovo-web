<template>
<q-dialog ref="loginDialog" v-close-popup="closed">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">Login</div>
                        <q-input ref="loginRef" square v-model="login" lazy-rules :rules="[this.required]" type="username" label="user name" />
                        <q-input ref="passwordRef" square v-model="password" lazy-rules :rules="[this.required]" type="password" label="password" />
                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" type="submit" label="Login" />
                            <q-btn unelevated class="text-blue" type="reset" label="Cancel" />
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

export default {
    name: 'LoginDialog',

    setup()
    {
        const login = ref('');
        const loginRef = ref(null);
        const password = ref('');
        const passwordRef = ref(null);
        const loginDialog = ref(null);
        const $store = useStore();

        $store.commit('login/updateLastError', '');

        const required = (val) =>
        {
            return  (val && val.length > 0 || 'The field must be filled');
        };

        const lastErrorState = computed({
            get: () => ($store.state.login.last_error)
        })

        const onSubmit = () =>
        {
            loginRef.value.validate();
            passwordRef.value.validate();

            api.post('/auth/login', 
                {
                    login: login.value,
                    password: password.value
                }
                ).then(
                    function(response)
                    {
                        console.log(response);
                        $store.commit('login/updateLogin', login.value);
                        $store.commit('login/updateAccessToken', response.headers['access_token']);
                        $store.commit('login/updateLastError', '');
                        loginDialog.value.hide();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        $store.commit('login/updateLastError', 'Login failed');
                    }
                );
        };

        const onReset = () =>
        {
            loginDialog.value.hide();
        };

        return {
            loginDialog,
            login,
            loginRef,
            password,
            passwordRef,
            lastErrorState,
            required,
            onSubmit,
            onReset
        }
    }
}
</script>

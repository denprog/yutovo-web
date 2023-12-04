<template>
<q-dialog ref="loginDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">Login</div>
                        <q-input ref="loginRef" square v-model="login" lazy-rules :rules="[this.required]" id="username" type="username" label="user name" />
                        <q-input ref="passwordRef" square v-model="password" lazy-rules :rules="[this.required]" id="password" type="password" label="password" />
                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" label="Login" />
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
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'

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

        $store.commit('login/setLastError', '');

        const required = (val) =>
        {
            return  (val && val.length > 0 || 'The field must be filled');
        };

        const lastErrorState = computed({
            get: () => ($store.state.login.last_error)
        })

        const onReset = () =>
        {
            loginDialog.value.hide();
        };

        const router = useRouter();

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
                        $store.dispatch('login/updateAccessToken', response.headers['access_token']);
                        $store.commit('login/setLastError', '');
                        window.dispatchEvent(new CustomEvent('listDocuments', {}));
                        loginDialog.value.hide();

                        if (Cookies.has('document_id'))
                            window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: Cookies.get('document_id')}}));
                        else if (response.data.document_id > 0)
                        {
                            router.push({ path: '/document/' + response.data.document_id });
                            window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: response.data.document_id}}));
                        }
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        $store.dispatch('login/updateAccessToken', '');
                        $store.commit('login/setLastError', 'Login failed');
                    }
                );
        }

        return {
            loginDialog,
            login,
            loginRef,
            password,
            passwordRef,
            lastErrorState,
            required,
            onSubmit,
            onReset,
            router
        }
    }
}
</script>

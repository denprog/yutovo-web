<template>
<q-dialog ref="registerDialog" v-close-popup="closed">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">Registration</div>
                        <q-input square v-model="login" lazy-rules :rules="[this.required]" type="username" label="login" />
                        <q-input square v-model="email" lazy-rules :rules="[required, isEmail]" type="email" label="email" />
                        <q-input square v-model="password" lazy-rules :rules="[this.required]" id="password" type="password" label="password" />
                        <q-input ref="repasswordRef" square v-model="repassword" lazy-rules :rules="[this.required, this.diffPassword]" 
                            id="repassword" type="password" label="repeate password" />
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn ref="Register" unelevated class="bg-primary text-white" type="submit" id="submit" label="Register" />
                            <q-btn unelevated class="text-blue" type="reset" label="Cancel" v-close-popup />
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
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'

export default {
    name: 'RegisterDialog',

    setup()
    {
        const login = ref('');
        const email = ref('');
        const password = ref('');
        const repassword = ref(null);
        const repasswordRef = ref(null);
        const registerDialog = ref(null);
        const closed = ref(false);
        const $store = useStore();
        const router = useRouter();

        const required = (val) => 
        {
            return (val && val.length > 0 || 'The field must be filled');
        };

        const isEmail = (val) => 
        {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return (emailPattern.test(val) || 'Enter a correct e-mail');
        };

        const diffPassword = (val) =>
        {
            return (val === password.value || 'Passwords are not identical');
        };

        const onSubmit = () =>
        {
            repasswordRef.value.validate();

            api.post('/auth/register', 
                {
                    login: login.value,
                    email: email.value,
                    password: password.value
                }
                ).then(
                    function(response)
                    {
                        api.post('/auth/login', 
                            {
                                login: login.value,
                                password: password.value
                            }
                            ).then(
                                function(response)
                                {
                                    $store.dispatch('login/updateAccessToken', response.headers['access_token']);
                                    registerDialog.value.hide();

                                    router.push({ path: '/document/' + response.data.document_id });
                                    Cookies.set("document_id", response.data.document_id, {path: '/'});
                                }
                            ).catch(
                                function(response)
                                {
                                    $store.dispatch('login/updateAccessToken', '');
                                    console.log(response);
                                }
                            );
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
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
            email,
            password,
            repassword,
            repasswordRef,
            required,
            isEmail,
            diffPassword,
            onSubmit,
            onReset,
            closed,
            router
        }
    }
}
</script>

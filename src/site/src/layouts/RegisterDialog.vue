<template>
<q-dialog>
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
                        <div class="text-blue text-h5">Registration</div>
                        <q-input square v-model="username" lazy-rules :rules="[this.required]" type="username" label="user name" />
                        <q-input square v-model="email" lazy-rules :rules="[this.required, this.isEmail]" type="email" label="email" />
                        <q-input square v-model="password" lazy-rules :rules="[this.required]" type="password" label="password" />
                        <q-input ref="repasswordRef" square v-model="repassword" lazy-rules :rules="[this.required, this.diffPassword]" 
                            type="password" label="repeate password" />
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" type="submit" label="Register" />
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

export default {
    name: 'RegisterDialog',

    setup()
    {
        const username = ref('')
        const email = ref('')
        const password = ref('')
        const repassword = ref(null)
        const repasswordRef = ref(null)

        return {
            title: 'Register',
            username,
            email,
            password,
            repassword,
            repasswordRef,

            required(val)
            {
                return  (val && val.length > 0 || 'The field must be filled');
            },

            isEmail(val)
            {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return (emailPattern.test(val) || 'Enter a correct e-mail');
            },

            diffPassword(val)
            {
                return (val === password.value || 'Passwords are not identical');
            },

            onSubmit()
            {
                repasswordRef.value.validate();
            },

            onReset()
            {
                repasswordRef.value = null;
            }
        }
    }
}
</script>

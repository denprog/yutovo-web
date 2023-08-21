<template>
<q-dialog>
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
                        <div class="text-blue text-h5">Login</div>
                        <q-input square v-model="username" lazy-rules :rules="[this.required]" type="username" label="user name" />
                        <q-input square v-model="password" lazy-rules :rules="[this.required]" type="password" label="password" />
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

export default {
    name: 'LoginDialog',

    setup()
    {
        const username = ref('')
        const password = ref('')

        return {
            username,
            password,

            required(val)
            {
                return  (val && val.length > 0 || 'The field must be filled');
            },

            onSubmit()
            {
                password.value.validate();
            },

            onReset()
            {
                password.value = null;
            }
        }
    }
}
</script>

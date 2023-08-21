<template>
<q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-toolbar-title>
                <q-btn no-caps dense flat @click="$router.push('/')">
                    <q-avatar>
                        <img src="Quasar_Logo.png">
                    </q-avatar>
                </q-btn>
                <q-btn no-caps dense flat size="15pt" @click="$router.push('/')">
                    Yutovo
                </q-btn>
            </q-toolbar-title>

            <q-btn dense no-caps flat @click="$router.push('register')">Register</q-btn>
        </q-toolbar>
    </q-header>

    <div class="column window-height window-width row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
                <q-card-section>
                    <q-form class="q-gutter-md">
                        <q-input square filled clearable v-model="email" type="email" label="email" />
                        <q-input square filled clearable v-model="password" type="password" label="password" />
                    </q-form>
                </q-card-section>
                <q-card-actions class="q-px-md">
                    <q-btn unelevated class="bg-primary text-white full-width" label="Login" />
                </q-card-actions>
                <q-card-section class="text-center q-pa-none">
                    <p class="text-grey-6">Not reigistered? Create an Account</p>
                </q-card-section>
            </q-card>
        </div>
    </div>
</q-layout>
</template>

<script lang="ts">
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'LoginPage',

    methods:
    {
        submit()
        {
            this.$v.form.$touch()

            this.$store.dispatch('user/login', {
                })
        }
    }
}
</script>

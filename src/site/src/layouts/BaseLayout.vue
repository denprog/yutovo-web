<template>
<q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-toolbar-title>
                <q-avatar>
                    <img src="Quasar_Logo.png">
                </q-avatar>
                Yutovo
            </q-toolbar-title>

            <q-btn dense flat @click="$router.push('register')">Register</q-btn>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

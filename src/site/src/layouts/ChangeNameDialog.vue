<template>
<q-dialog ref="changeNameDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Name') }}</div>
                        <q-input ref="nameRef" square v-model="name" lazy-rules :rules="[this.required]" v-bind:label="$t('Name')" />
                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" v-bind:label="$t('OK')" />
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')" />
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
    name: 'ChangeNameDialog',

    setup()
    {
        const changeNameDialog = ref(null);
        const name = ref('');
        const nameRef = ref(null);
        const store = useStore();
        const tr = useI18n();

        store.commit('editor/setLastError', '');

        const required = (val) =>
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const onSubmit = () =>
        {
            nameRef.value.validate();

            api.post('/service/set-user-settings', 
                {
                    name: name.value
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
                        //load the new document
                        changeNameDialog.value.hide();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        store.commit('editor/setLastError', response.response.data.error);
                    }
                );
        };

        const onReset = () =>
        {
            changeNameDialog.value.hide();
        };

        const lastErrorState = computed({
            get: () => (store.state.editor.last_error)
        });

        return {
            store,
            changeNameDialog,
            name,
            onSubmit,
            onReset,
            required,
            nameRef,
            lastErrorState,
            tr
        }
    }
}
</script>

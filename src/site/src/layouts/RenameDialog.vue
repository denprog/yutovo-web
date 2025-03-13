<template>
<q-dialog ref="renameDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Rename document') }}</div>
                        <q-input ref="filenameRef" square v-model="filename" lazy-rules :rules="[this.required]" id="filename" type="filename" 
                            v-bind:label="$t('File name')" />
                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" label="OK" />
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
import { useI18n } from 'vue-i18n'

export default {
    name: 'RenameDialog',

    setup()
    {
        const renameDialog = ref(null);
        const filename = ref('');
        const filenameRef = ref(null);
        const store = useStore();
        const tr = useI18n();

        store.commit('editor/setLastError', '');

        const required = (val) =>
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const onSubmit = () =>
        {
            filenameRef.value.validate();

            api.post('/service/rename-document', 
                {
                    document_id: Cookies.get('document_id'),
                    name: filename.value
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
                        window.dispatchEvent(new CustomEvent('updateDocumentName', {detail: {document_id: Cookies.get('document_id')}}));
                        window.dispatchEvent(new CustomEvent('listDocuments', {}));
                        renameDialog.value.hide();
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
            renameDialog.value.hide();
        };

        const lastErrorState = computed({
            get: () => (store.state.editor.last_error)
        });

        return {
            store,
            renameDialog,
            filename,
            onSubmit,
            onReset,
            required,
            filenameRef,
            lastErrorState,
            tr
        }
    }
}
</script>

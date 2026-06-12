<template>
<q-dialog ref="saveAsDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Save document as') }}</div>
                        <q-input ref="filenameRef" square v-model="filename" lazy-rules :rules="[this.required]" id="filename" type="filename" 
                            v-bind:label="$t('File name')" />
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
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'

export default {
    name: 'SaveAsDialog',

    setup()
    {
        const saveAsDialog = ref(null);
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
            if (!filename.value || filename.value.length === 0)
                return;

            window.saveAsName = filename.value;
            const documentId = Cookies.has('document_id') ? Cookies.get('document_id') : 0;
            window.Module.cwrap('OnSave', 'void', ['int'])(documentId);
            saveAsDialog.value.hide();
        };

        const onReset = () =>
        {
            saveAsDialog.value.hide();
        };

        const lastErrorState = computed({
            get: () => (store.state.editor.last_error)
        });

        return {
            store,
            saveAsDialog,
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

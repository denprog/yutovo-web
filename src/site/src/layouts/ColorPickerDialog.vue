<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <div class="row">
        <q-card class="q-dialog-plugin" >
            <q-card-section>
                <q-color v-model="colorModel" square/>
                <div class="q-pa-md q-gutter-sm">
                    <q-btn unelevated class="bg-primary text-white" label="OK" @click="onOKClick" />
                    <q-btn unelevated class="text-blue" label="Cancel" @click="onCancelClick" />                        
                </div>
            </q-card-section>
        </q-card>
    </div>
</q-dialog>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex'

export default {
    emits: [
        'ok', 'hide'
    ],
    
    methods:
    {
        show()
        {
            this.$refs.dialog.show();
        },

        hide()
        {
            this.$refs.dialog.hide();
        },

        onDialogHide()
        {
            this.$emit('hide');
        },

        onOKClick()
        {
            this.$emit('ok');
            this.hide();
        },

        onCancelClick()
        {
            this.hide();
        }
    },

    setup()
    {
        const $store = useStore();

        const colorModel = computed(
            {
                get()
                {
                    return $store.state.editor.dialog_color;
                },

                set(value)
                {
                    $store.commit('editor/setDialogColor', value);
                }
            })

        return {
            colorModel
        }
    }
}
</script>

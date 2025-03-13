<template>
<q-dialog ref="linkDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">Link</div>
                        <q-input ref="textRef" square v-model="text" lazy-rules :rules="[this.required]" id="text" label="Text" />
                        <q-input ref="urlRef" square v-model="url" lazy-rules :rules="[this.required]" id="url" label="Url" />
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
import { useI18n } from 'vue-i18n'

export default {
    name: 'LinkDialog',

    props:
    [
        'text_prop',
        'url_prop'
    ],

    data()
    {
        return {
            text_val: this.text_prop,
            url_val: this.url_prop
        }
    },

    computed: 
    {
        text: 
        {
            get()
            {
                return this.text_val;
            },
            set(value)
            {
                this.text_val = value;
            }
        },

        url: 
        {
            get()
            {
                return this.url_val;
            },
            set(value)
            {
                this.url_val = value;
            }
        }
    },

    setup()
    {
        const linkDialog = ref(null);
        const tr = useI18n();

        const required = (val) =>
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            linkDialog.value.hide();
        };

        return {
            linkDialog,
            onReset,
            required,
            tr
        }
    },

    methods:
    {
        onSubmit()
        {
            Module.cwrap('OnLink', 'void', ['string', 'string'])(this.text_val, this.url_val);
            this.linkDialog.hide();
        },
    }
}
</script>

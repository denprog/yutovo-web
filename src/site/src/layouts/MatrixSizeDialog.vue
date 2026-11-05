<template>
<q-dialog ref="matrixSizeDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ title }}</div>
                        <q-input ref="rowsRef" square v-model="rows" :rules="[this.intInRange]" v-bind:label="$t('Rows')"/>
                        <q-input ref="columnsRef" square v-model="columns" :rules="[this.intInRange]" v-bind:label="$t('Columns')"/>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" type="submit" v-bind:label="$t('OK')"/>
                            <q-btn unelevated class="text-blue" type="reset" v-bind:label="$t('Cancel')"/>
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

declare var Module: any

export default {
    name: 'MatrixSizeDialog',

    props:
    [
        'title_prop',
        'rows_prop',
        'columns_prop',
        'command_prop'
    ],

    data()
    {
        return {
            rows_val: this.rows_prop,
            columns_val: this.columns_prop
        }
    },

    computed:
    {
        title()
        {
            return this.title_prop;
        },

        rows:
        {
            get()
            {
                return this.rows_val;
            },
            set(value)
            {
                this.rows_val = value;
            }
        },

        columns:
        {
            get()
            {
                return this.columns_val;
            },
            set(value)
            {
                this.columns_val = value;
            }
        }
    },

    setup()
    {
        const matrixSizeDialog = ref(null);
        const tr = useI18n();
        const rowsRef = ref(null);
        const columnsRef = ref(null);

        const intInRange = (val) =>
        {
            const n = parseInt(val);
            return (Number.isInteger(n) && n >= 1 && n <= 100 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            matrixSizeDialog.value.hide();
        };

        return {
            matrixSizeDialog,
            intInRange,
            onReset,
            tr,
            rowsRef,
            columnsRef
        }
    },

    methods:
    {
        onSubmit()
        {
            Module.cwrap(this.command_prop, 'void', ['int', 'int'])(parseInt(this.rows), parseInt(this.columns));
            this.matrixSizeDialog.hide();
        }
    }
}
</script>

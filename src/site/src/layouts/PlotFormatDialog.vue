<template>
<q-dialog ref="plotFormatDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Plot format') }}</div>
                        <q-input ref="widthRef" square v-model="width" :rules="[this.intRequired]" v-bind:label="$t('Thickness')" />
                        <q-select v-if="surface" square v-model="style" :options="styleOptions" v-bind:label="$t('Style')" />
                        <div>{{ $t('Color') }}
                            <q-btn :style="{ 'background-color': color }" @click='onColor();'></q-btn>
                        </div>
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
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import ColorPickerDialog from 'layouts/ColorPickerDialog.vue'

export default {
    name: 'PlotFormatDialog',

    props:
    [
        'width_prop',
        'color_prop',
        'style_prop',
        'surface_prop'
    ],

    data()
    {
        return {
            width_val: this.width_prop,
            color_val: this.color_prop,
            style_val: this.style_prop,
            surface_val: this.surface_prop,
            styleOptions: [this.$t('Color by height'), this.$t('Solid color'), this.$t('Color by height with mesh'), this.$t('Wireframe'), this.$t('Points')]
        }
    },

    computed: 
    {
        width:
        {
            get()
            {
                return this.width_val;
            },
            set(value)
            {
                this.width_val = value;
            }
        },

        color:
        {
            get()
            {
                return this.color_val;
            },
            set(value)
            {
                this.color_val = value;
            }
        },

        style:
        {
            get()
            {
                return this.styleOptions[this.style_val];
            },
            set(value)
            {
                this.style_val = this.styleOptions.indexOf(value);
            }
        },

        surface:
        {
            get()
            {
                return this.surface_val;
            }
        }
    },

    setup()
    {
        const store = useStore();
        const plotFormatDialog = ref(null);
        const tr = useI18n();
        const widthRef = ref(null);

        const intRequired = (val) =>
        {
            return  (val && val > 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            plotFormatDialog.value.hide();
        };

        return {
            store,
            plotFormatDialog,
            intRequired,
            onReset,
            tr,
            widthRef
        }
    },

    methods:
    {
        onColor()
        {
            if (this.color == '')
                return;
            this.store.commit('editor/setDialogColor', this.color);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.color = this.store.state.editor.dialog_color;
            })
            canvas.focus();
        },

        onSubmit()
        {
            Module.cwrap('OnPlotFormat', 'void', ['string', 'int', 'int'])(this.color, this.width, this.style_val);
            this.plotFormatDialog.hide();
        }
    }
}
</script>

<template>
<q-dialog ref="graphFormatDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Graph format') }}</div>
                        <q-input ref="widthRef" square v-model="width" :rules="[this.intMoreZeroRequired]" v-bind:label="$t('Width')" />
                        <q-input ref="heightRef" square v-model="height" :rules="[this.intMoreZeroRequired]" v-bind:label="$t('Height')"/>
                        <div>{{ $t('Grid color') }}
                            <q-btn :style="{ 'background-color': color }" @click='onColor();'></q-btn>
                        </div>
                        <q-input ref="gridWidthRef" square v-model="grid_width" :rules="[this.intRequired]" v-bind:label="$t('Grid thickness')"/>
                        <div>{{ $t('Axis color') }}
                            <q-btn :style="{ 'background-color': axis_color }" @click='onAxisColor();'></q-btn>
                        </div>
                        <q-input ref="axisWidthRef" id="axis-width" square v-model="axis_width" :rules="[this.intRequired]" v-bind:label="$t('Axis thickness')"/>
                        <q-checkbox v-model="axis_ticks" v-bind:label="$t('Show ticks')"/>
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
    name: 'GraphFormatDialog',

    props:
    [
        'width_prop',
        'height_prop',
        'color_prop',
        'grid_width_prop',
        'axis_color_prop',
        'axis_width_prop',
        'axis_ticks_prop'
    ],

    data()
    {
        return {
            width_val: this.width_prop,
            height_val: this.height_prop,
            color_val: this.color_prop,
            grid_width_val: this.grid_width_prop,
            axis_color_val: this.axis_color_prop,
            axis_width_val: this.axis_width_prop,
            axis_ticks_val: this.axis_ticks_prop
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

        height:
        {
            get()
            {
                return this.height_val;
            },
            set(value)
            {
                this.height_val = value;
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

        grid_width:
        {
            get()
            {
                return this.grid_width_val;
            },
            set(value)
            {
                this.grid_width_val = value;
            }
        },

        axis_color:
        {
            get()
            {
                return this.axis_color_val;
            },
            set(value)
            {
                this.axis_color_val = value;
            }
        },

        axis_width:
        {
            get()
            {
                return this.axis_width_val;
            },
            set(value)
            {
                this.axis_width_val = value;
            }
        },

        axis_ticks:
        {
            get()
            {
                return this.axis_ticks_val;
            },
            set(value)
            {
                this.axis_ticks_val = value;
            }
        }
    },

    setup()
    {
        const store = useStore();
        const graphFormatDialog = ref(null);
        const tr = useI18n();
        const widthRef = ref(null);
        const heightRef = ref(null);
        const gridWidthRef = ref(null);
        const axisWidthRef = ref(null);

        const intMoreZeroRequired = (val) =>
        {
            return  (val && val > 0 || tr.t('The field must be filled'));
        };

        const intRequired = (val) =>
        {
            return  (val && val >= 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            graphFormatDialog.value.hide();
        };

        return {
            store,
            graphFormatDialog,
            intMoreZeroRequired,
            intRequired,
            onReset,
            tr,
            widthRef,
            heightRef,
            gridWidthRef,
            axisWidthRef
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

        onAxisColor()
        {
            if (this.axis_color == '')
                return;
            this.store.commit('editor/setDialogColor', this.axis_color);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.axis_color = this.store.state.editor.dialog_color;
            })
            canvas.focus();
        },

        onSubmit()
        {
            Module.cwrap('OnGraphFormat', 'void', ['int', 'int', 'string', 'int', 'string', 'int', 'int'])(
                this.width, this.height, this.color, this.grid_width,
                this.axis_color, this.axis_width, this.axis_ticks ? 1 : 0);
            this.graphFormatDialog.hide();
        }
    }
}
</script>

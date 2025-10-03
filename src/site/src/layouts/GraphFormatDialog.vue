<template>
<q-dialog ref="graphFormatDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Graph format') }}</div>
                        <q-input ref="graphWidthRef" square v-model="graph_width" :rules="[this.intRequired]" v-bind:label="$t('Graph width')" />
                        <q-input ref="graphHeightRef" square v-model="graph_height" :rules="[this.intRequired]" v-bind:label="$t('Graph height')"/>
                        <div>{{ $t('Plot color') }}
                            <q-btn :style="{ 'background-color': plot_color }" @click='onPlotColor();'></q-btn>
                        </div>
                        <q-input ref="plotWidthRef" square v-model="plot_width" :rules="[this.intRequired]" v-bind:label="$t('Plot width')"/>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" label="OK" />
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
        'graph_width_prop',
        'graph_height_prop',
        'plot_color_prop',
        'plot_width_prop'
    ],

    data()
    {
        return {
            graph_width_val: this.graph_width_prop,
            graph_height_val: this.graph_height_prop,
            plot_color_val: this.plot_color_prop,
            plot_width_val: this.plot_width_prop
        }
    },

    computed: 
    {
        graph_width:
        {
            get()
            {
                return this.graph_width_val;
            },
            set(value)
            {
                this.graph_width_val = value;
            }
        },

        graph_height:
        {
            get()
            {
                return this.graph_height_val;
            },
            set(value)
            {
                this.graph_height_val = value;
            }
        },

        plot_color:
        {
            get()
            {
                return this.plot_color_val;
            },
            set(value)
            {
                this.plot_color_val = value;
            }
        },

        plot_width:
        {
            get()
            {
                return this.plot_width_val;
            },
            set(value)
            {
                this.plot_width_val = value;
            }
        }
    },

    setup()
    {
        const store = useStore();
        const graphFormatDialog = ref(null);
        const tr = useI18n();
        const graphWidthRef = ref(null);
        const graphHeightRef = ref(null);
        const plotWidthRef = ref(null);

        const intRequired = (val) =>
        {
            return  (val && val > 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            graphFormatDialog.value.hide();
        };

        return {
            store,
            graphFormatDialog,
            intRequired,
            onReset,
            tr,
            graphWidthRef,
            graphHeightRef,
            plotWidthRef
        }
    },

    methods:
    {
        onPlotColor()
        {
            if (this.plot_color == '')
                return;
            this.store.commit('editor/setDialogColor', this.plot_color);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.plot_color = this.store.state.editor.dialog_color;
            })
            canvas.focus();
        },

        onSubmit()
        {
            Module.cwrap('OnGraphFormat', 'void', ['int', 'int', 'string', 'int'])(this.graph_width, this.graph_height, this.plot_color, this.plot_width);
            this.graphFormatDialog.hide();
        }
    }
}
</script>

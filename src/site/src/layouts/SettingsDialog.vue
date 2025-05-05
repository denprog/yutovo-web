<template>
<q-dialog ref="settingsDialog" style="min-width: 200px">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <div class="text-blue text-h5">{{ $t('Settings') }}</div>

                    <q-tabs v-model="settingsTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                        <q-tab name="colors" v-bind:label="$t('Colors')" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="settingsTab">
                        <q-tab-panel name="colors">
                            <q-card>
                                <div>{{ $t('Calculator block frame') }}
                                    <q-btn :style="{ 'background-color': codeBlockColor }" @click='onCodeBlockColor();'></q-btn>
                                </div>
                                <div>{{ $t('Numbers') }}
                                    <q-btn :style="{ 'background-color': numbersColor }" @click='onNumbersColor();'></q-btn>
                                </div>
                                <div>{{ $t('Variables') }}
                                    <q-btn :style="{ 'background-color': variablesColor }" @click='onVariablesColor();'></q-btn>
                                </div>
                                <div>{{ $t('Functions') }}
                                    <q-btn :style="{ 'background-color': functionsColor }" @click='onFunctionsColor();'></q-btn>
                                </div>
                                <div>{{ $t('Units') }}
                                    <q-btn :style="{ 'background-color': unitsColor }" @click='onUnitsColor();'></q-btn>
                                </div>
                                <div>{{ $t('Shapes') }}
                                    <q-btn :style="{ 'background-color': shapesColor }" @click='onShapesColor();'></q-btn>
                                </div>
                                <div>{{ $t('Error marks') }}
                                    <q-btn :style="{ 'background-color': errorMarksColor }" @click='onErrorMarksColor();'></q-btn>
                                </div>
                                <div>{{ $t('Formula background') }}
                                    <q-btn :style="{ 'background-color': formulaBgColor }" @click='onFormulaBgColor();'></q-btn>
                                </div>
                                <div>{{ $t('Background selection') }}
                                    <q-btn :style="{ 'background-color': bgSelectionColor }" @click='onBgSelectionColor();'></q-btn>
                                </div>
                            </q-card>
                        </q-tab-panel>
                    </q-tab-panels>

                    <q-separator />

                    <q-form @submit="onSubmit" @reset="onReset">
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
import { api } from 'boot/boot'
import { useStore } from 'vuex'
import ColorPickerDialog from 'layouts/ColorPickerDialog.vue'
import { useI18n } from 'vue-i18n'

export default
{
    name: 'SettingsDialog',

    setup()
    {
        const tr = useI18n();

        const colorToInt = (color) =>
        {
            return parseInt(color.substr(1, 6), 16) + 0xff000000;
        };

        const colorToHex = (color) =>
        {
            color >>>= 0;
            var b = color & 0xff,
                g = (color & 0xff00) >>> 8,
                r = (color & 0xff0000) >>> 16;
            return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
        };

        const settingsDialog = ref(null);
        const store = useStore();
        const codeBlockColor = ref(typeof store.state.editor.settings.code_block_border_color === 'undefined' ? '#0000ff' : 
            colorToHex(store.state.editor.settings.code_block_border_color));
        const numbersColor = ref(typeof store.state.editor.settings.code_block_border_color === 'undefined' ? '#0000ff' : 
            colorToHex(store.state.editor.settings.numbers_color));
        const variablesColor = ref(typeof store.state.editor.settings.variables_color === 'undefined' ? '#00193e' : 
            colorToHex(store.state.editor.settings.variables_color));
        const functionsColor = ref(typeof store.state.editor.settings.functions_color === 'undefined' ? '#ff5500' : 
            colorToHex(store.state.editor.settings.functions_color));
        const unitsColor = ref(typeof store.state.editor.settings.units_color === 'undefined' ? '#005500' : 
            colorToHex(store.state.editor.settings.units_color));
        const shapesColor = ref(typeof store.state.editor.settings.shapes_color === 'undefined' ? '#000000' : 
            colorToHex(store.state.editor.settings.shapes_color));
        const errorMarksColor = ref(typeof store.state.editor.settings.error_marks_color === 'undefined' ? '#ff0000' : 
            colorToHex(store.state.editor.settings.error_marks_color));
        const formulaBgColor = ref(typeof store.state.editor.settings.formula_bg_color === 'undefined' ? '#ffffff' : 
            colorToHex(store.state.editor.settings.formula_bg_color));
        const bgSelectionColor = ref(typeof store.state.editor.settings.bg_selection_color === 'undefined' ? '#0000ff' : 
            colorToHex(store.state.editor.settings.bg_selection_color));

        const required = (val) =>
        {
            return  (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            settingsDialog.value.hide();
        };

        const onSubmit = () =>
        {
            var json = 
                '{\
                    "code_block_border_color":' + colorToInt(codeBlockColor.value) + ',' + 
                    '"numbers_color":' + colorToInt(numbersColor.value) + ',' +
                    '"variables_color":' + colorToInt(variablesColor.value) + ',' +
                    '"functions_color":' + colorToInt(functionsColor.value) + ',' +
                    '"units_color":' + colorToInt(unitsColor.value) + ',' +
                    '"shapes_color":' + colorToInt(shapesColor.value) + ',' +
                    '"error_marks_color":' + colorToInt(errorMarksColor.value) + ',' +
                    '"formula_bg_color":' + colorToInt(formulaBgColor.value) + ',' +
                    '"bg_selection_color":' + colorToInt(bgSelectionColor.value) + 
                '}';

            store.commit('editor/setSettings', JSON.parse(json));

            if (store.state.login.login != '')
            {
                api.post('/service/set-user-settings', 
                    {
                        settings: JSON.stringify(store.state.editor.settings)
                    },
                    {
                        headers:
                        {
                            access_token: store.state.login.access_token
                        }
                    }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                        }
                    );
            }
            settingsDialog.value.hide();
        }

        return {
            store,
            settingsDialog,
            required,
            onSubmit,
            onReset,
            settingsTab: ref('colors'),
            codeBlockColor,
            numbersColor,
            variablesColor,
            functionsColor,
            unitsColor,
            shapesColor,
            errorMarksColor,
            formulaBgColor,
            bgSelectionColor,
            colorToInt,
            tr
        }
    },

    methods:
    {
        onCodeBlockColor()
        {
            this.store.commit('editor/setDialogColor', this.codeBlockColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.codeBlockColor = this.store.state.editor.dialog_color;
            })
        },

        onNumbersColor()
        {
            this.store.commit('editor/setDialogColor', this.numbersColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.numbersColor = this.store.state.editor.dialog_color;
            })
        },

        onVariablesColor()
        {
            this.store.commit('editor/setDialogColor', this.variablesColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.variablesColor = this.store.state.editor.dialog_color;
            })
        },

        onFunctionsColor()
        {
            this.store.commit('editor/setDialogColor', this.functionsColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.functionsColor = this.store.state.editor.dialog_color;
            })
        },
        
        onUnitsColor()
        {
            this.store.commit('editor/setDialogColor', this.unitsColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.unitsColor = this.store.state.editor.dialog_color;
            })
        },
        
        onShapesColor()
        {
            this.store.commit('editor/setDialogColor', this.shapesColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.shapesColor = this.store.state.editor.dialog_color;
            })
        },
        
        onErrorMarksColor()
        {
            this.store.commit('editor/setDialogColor', this.errorMarksColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.errorMarksColor = this.store.state.editor.dialog_color;
            })
        },
        
        onFormulaBgColor()
        {
            this.store.commit('editor/setDialogColor', this.formulaBgColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.formulaBgColor = this.store.state.editor.dialog_color;
            })
        },
        
        onBgSelectionColor()
        {
            this.store.commit('editor/setDialogColor', this.bgSelectionColor);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                this.bgSelectionColor = this.store.state.editor.dialog_color;
            })
        }
    }
}
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: auto auto;
}
.grid-item {
    height: //Whatever you want them to be
}
</style>

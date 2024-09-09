<template>
<q-dialog ref="configDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <div class="text-blue text-h5">Document configuration</div>

                    <q-tabs v-model="configTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                        <q-tab name="result" label="Result" />
                        <q-tab name="locale" label="Locale" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="configTab">
                        <q-tab-panel name="result">
                            <q-card>
                                <q-tabs v-model="resultTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                                    <q-tab name="real" label="Real" />
                                    <q-tab name="integer" label="Integer" />
                                    <q-tab name="rational" label="Rational" />
                                    <q-tab name="complex" label="Complex" />
                                </q-tabs>

                                <q-separator />

                                <q-tab-panels v-model="resultTab">
                                    <q-tab-panel name="real">
                                        <q-input ref="realPrecisionRef" square v-model="realPrecision" :rules="[this.intRequired]" label="precision"/>
                                        <q-input ref="realExpRef" square v-model="realExp" :rules="[this.intRequired]" label="exponential threshold"/>
                                        <q-select v-model="realDefaultAngleMeasure" :options="angleMeasures" 
                                            label="default angle measure" dense options-dense borderless/>
                                        <q-select v-model="realResultAngleMeasure" :options="angleMeasures" 
                                            label="result angle measure" dense options-dense borderless/>
                                        <q-checkbox v-model="realShowAngleMeasure" label="show angle measure"/>
                                    </q-tab-panel>

                                    <q-tab-panel name="integer">
                                        <q-select ref="integerDefaultNotationRef" :options="integerNotations" square v-model="integerDefaultNotation" 
                                            lazy-rules label="Default numeral system"/>
                                        <q-input ref="integerResultNotationRef" square v-model="integerResultNotation" lazy-rules 
                                            :rules="[this.intRequired]" label="Result numeral system"/>
                                        <q-checkbox ref="integerShowNotationRef" v-model="integerShowNotation" label="show result numeral system"/>
                                    </q-tab-panel>

                                    <q-tab-panel name="rational">
                                        <q-select v-model="rationalForm" :options="rationalForms" label="fraction form" dense options-dense borderless/>
                                    </q-tab-panel>

                                    <q-tab-panel name="complex">
                                        <q-input ref="complexPrecisionRef" square v-model="complexPrecision" lazy-rules :rules="[this.intRequired]" label="precision"/>
                                        <q-input ref="complexExpRef" square v-model="complexExp" lazy-rules :rules="[this.intRequired]" label="exponential threshold"/>
                                        <q-select v-model="complexForm" :options="complexForms" label="complex form" dense options-dense borderless/>
                                        <q-input ref="complexCountRef" square v-model="complexCount" lazy-rules :rules="[this.intRequired]" label="maximum count of results"/>
                                        <q-select v-model="complexDefaultAngleMeasure" :options="angleMeasures" label="default angle measure" dense options-dense borderless/>
                                        <q-select v-model="complexResultAngleMeasure" :options="angleMeasures" label="result angle measure" dense options-dense borderless/>
                                        <q-checkbox v-model="complexShowAngleMeasure" label="show angle measure"/>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </q-card>
                        </q-tab-panel>

                        <q-tab-panel name="locale">
                            <q-select v-model="language" :options="languages" dense borderless no-caps flat emit-value map-options options-dense label="language" />
                        </q-tab-panel>
                    </q-tab-panels>

                    <q-separator />

                    <q-form @submit="onSubmit" @reset="onReset">
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
import { useStore } from 'vuex'

export default {
    name: 'ConfigDialog',

    setup()
    {
        const configDialog = ref(null);
        const store = useStore();

        const resultTab = ref('real');

        const angleMeasures = [
            'Radian',
            'Degree',
            'Grad'
        ];
        const realPrecisionRef = ref(null);
        const realPrecision = ref(typeof store.state.editor.config.real_result === 'undefined' ? 3 : store.state.editor.config.real_result.precision);
        const realExpRef = ref(null);
        const realExp = ref(typeof store.state.editor.config.real_result === 'undefined' ? 3 : store.state.editor.config.real_result.exp);
        const realDefaultAngleMeasure = ref(typeof store.state.editor.config.real_result === 'undefined' ? 'Radian' : 
            angleMeasures[store.state.editor.config.real_result.default_angle_measure]);
        const realResultAngleMeasure = ref(typeof store.state.editor.config.real_result === 'undefined' ? 'Radian' : 
            angleMeasures[store.state.editor.config.real_result.result_angle_measure]);
        const realShowAngleMeasure = ref(true);

        const integerNotations = [
            'Binary',
            'Octal',
            'Decimal',
            'Hexadecimal'
        ];
        const integerDefaultNotationRef = ref(null);
        const integerDefaultNotation = ref(typeof store.state.editor.config.integer_result === 'undefined' ? 'Decimal' : 
            integerNotations[store.state.editor.config.integer_result.default_notation]);
        const integerResultNotationRef = ref(null);
        const integerResultNotation = ref(typeof store.state.editor.config.integer_result === 'undefined' ? 'Decimal' : 
            integerNotations[store.state.editor.config.integer_result.result_notation]);
        const integerShowNotationRef = ref(null);
        const integerShowNotation = ref(typeof store.state.editor.config.show_notation === 'undefined' ? true : store.state.editor.config.integer_result.show_notation);

        const rationalForms = [
            'Improper',
            'Proper'
        ];
        const rationalForm = ref(typeof store.state.editor.config.rational_result === 'undefined' ? 'Proper' : 
            rationalForms[store.state.editor.config.rational_result.fraction_form]);

        const complexForms = [
            'Arithmetical',
            'Trigonometric',
            'Scientific'
        ];
        const complexPrecisionRef = ref(null);
        const complexPrecision = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 3 : store.state.editor.config.complex_result.precision);
        const complexExpRef = ref(null);
        const complexExp = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 3 : store.state.editor.config.complex_result.exp);
        const complexForm = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 'Arithmetic' : 
            complexForms[store.state.editor.config.complex_result.form]);
        const complexCountRef = ref(null);
        const complexCount = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 10 : store.state.editor.config.complex_result.max_count);
        const complexDefaultAngleMeasure = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 'Radian' : 
            angleMeasures[store.state.editor.config.complex_result.default_angle_measure]);
        const complexResultAngleMeasure = ref(typeof store.state.editor.config.complex_result === 'undefined' ? 'Radian' : 
            angleMeasures[store.state.editor.config.complex_result.result_angle_measure]);
        const complexShowAngleMeasure = ref(typeof store.state.editor.config.complex_result === 'undefined' ? true : 
            store.state.editor.config.complex_result.show_angle_measure);

        const languages = [
            'English',
            'Русский'
        ];
        const language = ref(typeof store.state.editor.config.language === 'undefined' ? 'English' : languages[store.state.editor.config.language - 1]);

        const intRequired = (val) =>
        {
            return  (val && val > 0 || 'The field must be filled');
        };

        const onReset = () =>
        {
            configDialog.value.hide();
        };

        const onSubmit = () =>
        {
            if (realPrecision.value <= 0 || realExp.value <= 0 || complexPrecision.value <= 0 || complexExp.value <= 0 || complexCount.value <= 0)
                return;

            var json = 
                '{' + 
                    '"real_result":{"precision":' + realPrecision.value + ',"exp":' + realExp.value + 
                    ',"default_angle_measure":' + angleMeasures.indexOf(realDefaultAngleMeasure.value) + 
                    ',"result_angle_measure":' + angleMeasures.indexOf(realResultAngleMeasure.value) + '},' + 
                    '"integer_result":{"result_notation":' + integerNotations.indexOf(integerResultNotation.value) + 
                        ',"default_notation":' + integerNotations.indexOf(integerDefaultNotation.value) + 
                        ',"show_notation":' + integerShowNotation.value + '},' + 
                    '"rational_result":{"fraction_form":' + rationalForms.indexOf(rationalForm.value) + '},' + 
                    '"complex_result":{"precision":' + complexPrecision.value + ',"exp":' + complexExp.value + ',"max_count":' + complexCount.value + 
                        ',"default_angle_measure":' + angleMeasures.indexOf(complexDefaultAngleMeasure.value) + 
                        ',"result_angle_measure":' + angleMeasures.indexOf(complexResultAngleMeasure.value) + 
                        ',"form":' + complexForms.indexOf(complexForm.value) + ',"show_angle_measure":' + complexShowAngleMeasure.value + '},' + 
                    '"language":' + (languages.indexOf(language.value) + 1) + 
                '}';
            store.commit('editor/setConfig', JSON.parse(json));

            configDialog.value.hide();
        }

        return {
            configDialog,
            intRequired,
            onSubmit,
            onReset,
            configTab: ref('result'),
            resultTab,

            angleMeasures,

            realPrecisionRef,
            realPrecision,
            realExpRef,
            realExp,
            realDefaultAngleMeasure,
            realResultAngleMeasure,
            realShowAngleMeasure,

            integerDefaultNotationRef,
            integerDefaultNotation,
            integerResultNotationRef,
            integerResultNotation,
            integerShowNotationRef,
            integerShowNotation,
            integerNotations,

            rationalForms,
            rationalForm,

            complexPrecisionRef,
            complexPrecision,
            complexExpRef,
            complexExp,
            complexForms,
            complexCountRef,
            complexCount,
            complexForm,
            complexDefaultAngleMeasure,
            complexResultAngleMeasure,
            complexShowAngleMeasure,

            language,
            languages
        }
    }
}
</script>

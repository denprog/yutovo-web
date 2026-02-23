<template>
<q-dialog ref="configDialog" id="config-dialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <div class="text-blue text-h5">{{ $t('Document properties') }}</div>

                    <q-tabs v-model="configTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                        <q-tab name="result" v-bind:label="$t('Result')" />
                        <q-tab name="document" v-bind:label="$t('Document')" data-testid="tab-document" />
                        <q-tab name="include_documents" v-bind:label="$t('Include documents')" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="configTab">
                        <q-tab-panel name="result">
                            <q-card>
                                <q-tabs v-model="resultTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                                    <q-tab name="real" v-bind:label="$t('Real')" />
                                    <q-tab name="integer" v-bind:label="$t('Integer')" />
                                    <q-tab name="rational" v-bind:label="$t('Rational')" />
                                    <q-tab name="complex" v-bind:label="$t('Complex')" />
                                </q-tabs>

                                <q-separator />

                                <q-tab-panels v-model="resultTab">
                                    <q-tab-panel name="real">
                                        <q-input ref="realPrecisionRef" square v-model="realPrecision" :rules="[this.intRequired]" v-bind:label="$t('Precision')"/>
                                        <q-input ref="realExpRef" square v-model="realExp" :rules="[this.intRequired]" v-bind:label="$t('Exponential threshold')"/>
                                        <q-select v-model="realDefaultAngleMeasure" :options="angleMeasures" 
                                            v-bind:label="$t('Default angle measure')" dense options-dense borderless :option-label="measure => $t(measure)"/>
                                        <q-select v-model="realResultAngleMeasure" :options="angleMeasures" 
                                            v-bind:label="$t('Result angle measure')" dense options-dense borderless :option-label="measure => $t(measure)"/>
                                        <q-checkbox v-model="realShowAngleMeasure" v-bind:label="$t('Show angle measure')"/>
                                    </q-tab-panel>

                                    <q-tab-panel name="integer">
                                        <q-select ref="integerDefaultNotationRef" :options="integerNotations" square v-model="integerDefaultNotation" 
                                            lazy-rules v-bind:label="$t('Default notation')" :option-label="notation => $t(notation)"/>
                                        <q-select ref="integerResultNotationRef" :options="integerNotations" square v-model="integerResultNotation" 
                                            lazy-rules v-bind:label="$t('Result notation')" :option-label="notation => $t(notation)"/>
                                        <q-checkbox ref="integerShowNotationRef" v-model="integerShowNotation" v-bind:label="$t('Show result numeral system')"/>
                                    </q-tab-panel>

                                    <q-tab-panel name="rational">
                                        <q-select v-model="rationalForm" :options="rationalForms" v-bind:label="$t('Fraction form')" 
                                            dense options-dense borderless :option-label="form => $t(form)"/>
                                    </q-tab-panel>

                                    <q-tab-panel name="complex">
                                        <q-input ref="complexPrecisionRef" square v-model="complexPrecision" lazy-rules :rules="[this.intRequired]" 
                                            v-bind:label="$t('Precision')"/>
                                        <q-input ref="complexExpRef" square v-model="complexExp" lazy-rules :rules="[this.intRequired]" 
                                            v-bind:label="$t('Exponential threshold')"/>
                                        <q-select v-model="complexForm" :options="complexForms" v-bind:label="$t('Complex form')" 
                                            dense options-dense borderless :option-label="form => $t(form)"/>
                                        <q-input ref="complexCountRef" square v-model="complexCount" lazy-rules :rules="[this.intRequired]" 
                                            v-bind:label="$t('Maximum count of results')"/>
                                        <q-select v-model="complexDefaultAngleMeasure" :options="angleMeasures" v-bind:label="$t('Default angle measure')" 
                                            dense options-dense borderless :option-label="measure => $t(measure)"/>
                                        <q-select v-model="complexResultAngleMeasure" :options="angleMeasures" v-bind:label="$t('Result angle measure')" 
                                            dense options-dense borderless :option-label="measure => $t(measure)"/>
                                        <q-checkbox v-model="complexShowAngleMeasure" v-bind:label="$t('Show angle measure')"/>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </q-card>
                        </q-tab-panel>

                        <q-tab-panel name="document">
                            <q-select v-model="language" id="config-language" :options="languages" dense borderless no-caps flat emit-value map-options options-dense 
                                v-bind:label="$t('Language')" />
                            <q-separator class="q-my-md" />

                            <div class="text-body q-mb-sm">
                                {{ $t('Indentation') }}
                            </div>

                            <q-option-group v-model="useTabs" :options="[
                                { label: $t('Tabs'), value: true },
                                { label: $t('Spaces'), value: false }
                                ]"
                                type="radio">
                                <template v-slot:label="opt">
                                    <span class="text-body">{{ opt.label }}</span>
                                </template>
                            </q-option-group>

                            <q-input v-if="!useTabs" v-model.number="tabSpaces" type="tel" dense min="1" inputmode="numeric"
                                :rules='[val => (val > 0 && val <= 16) || $t("The field must be inside 0 and 16")]' 
                                v-bind:label="$t('Spaces count')" class="text-body"/>
                        </q-tab-panel>

                        <q-tab-panel name="include_documents">
                            <div class="row items-center">
                                <q-list bordered padding>
                                    <q-item 
                                        v-for="(item, index) in includesRef"
                                        :key="index"
                                        clickable
                                        :active="selectedIndex === index"
                                        active-class="bg-blue-2"
                                        @click="selectItem(index)"
                                        >
                                        <q-item-section>
                                            <q-input
                                                ref="inputRef"
                                                v-model="editValue"
                                                dense
                                                v-show="editIndex === index"
                                                @keyup.enter="() => saveEditDeferred(index)"
                                                @keyup.esc="cancelEdit"
                                                />
                                            <q-item-label
                                                v-show="editIndex !== index"
                                                @dblclick="startEdit(index)"
                                                class="cursor-pointer"
                                                >
                                                {{ item }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-input
                                                v-model="newItem"
                                                v-bind:placeholder="$t('Add...')"
                                                dense
                                                @keyup.enter="addItem"
                                                @blur="addItem"
                                                />
                                        </q-item-section>
                                    </q-item>                                
                                </q-list>

                                <div class="q-ml-md flex column justify-center items-center">
                                    <q-btn
                                        icon="arrow_upward"
                                        flat dense round
                                        @click="moveSelectedUp"
                                        :disable="selectedIndex === null || selectedIndex === 0"
                                        class="q-mb-sm"
                                        />
                                    <q-btn
                                        icon="arrow_downward"
                                        flat dense round
                                        @click="moveSelectedDown"
                                        :disable="selectedIndex === null || selectedIndex === includesRef.length - 1"
                                        />
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>

                    <q-separator />

                    <q-form @submit="onSubmit" @reset="onReset">
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
import { ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default
{
    name: 'ConfigDialog',

    setup()
    {
        const configDialog = ref(null);
        const store = useStore();
        const tr = useI18n();
        const resultTab = ref('real');

        const editIndex = ref(null);
        const editValue = ref('');
        const originalValue = ref('');
        const newItem = ref('');
        const selectedIndex = ref(null);
        const inputRef = ref(null);

        const includesRef = ref([]);
        const includes = store.state.editor.config.include_documents === 'undefined' ? null : store.state.editor.config.include_documents;
        if (includes != null)
        {
            for (var i = 0; i < includes.length; ++i)
                includesRef.value.push(includes[i].file_name);
        }

        const selectItem = (index) => {
            selectedIndex.value = index
        }

        const startEdit = (index) => {
            editIndex.value = index;
            editValue.value = includesRef.value[index];
            originalValue.value = includesRef.value[index];
            selectedIndex.value = index;
        }

        const saveEdit = async (index) => {
            const trimmed = editValue.value.trim();
            editIndex.value = null;
            await nextTick();

            if (trimmed === '')
            {
                includesRef.value.splice(index, 1);
                if (selectedIndex.value === index)
                    selectedIndex.value = null;
                else if (selectedIndex.value > index)
                    selectedIndex.value--;
                return
            }

            includesRef.value[index] = trimmed;
        }

        const saveEditDeferred = (index) => {
            requestAnimationFrame(() => saveEdit(index));
        }

        const cancelEdit = (event) => {
            editValue.value = originalValue.value;
            editIndex.value = null;
            event.stopPropagation();
        }

        const addItem = () => {
            if (newItem.value.trim() !== '')
            {
                includesRef.value.push(newItem.value);
                newItem.value = '';
            }
        }

        const moveSelectedUp = () => {
            const i = selectedIndex.value
            if (i > 0)
            {
                [includesRef.value[i - 1], includesRef.value[i]] = [includesRef.value[i], includesRef.value[i - 1]];
                selectedIndex.value--;
            }
        }

        const moveSelectedDown = () => {
            const i = selectedIndex.value;
            if (i < includesRef.value.length - 1)
            {
                [includesRef.value[i + 1], includesRef.value[i]] = [includesRef.value[i], includesRef.value[i + 1]];
                selectedIndex.value++;
            }
        }

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
            'Arithmetic',
            'Trigonometric',
            'Exponential'
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

        const languages = ref([
            { value: 'English', label: tr.t('English_male') },
            { value: 'Russian',  label: tr.t('Russian_male') },
            { value: 'Spanish',  label: tr.t('Spanish_male') }
        ]);

        const languageToInt = language =>
            language === 'en' ? 1 :
            language === 'ru' ? 2 :
            language === 'es' ? 3 : 0;

        const language = ref(
            typeof store.state.editor.config.language === 'undefined' ? 
                (typeof store.state.editor.language === 'undefined' ? 'English' : 
                languages.value[languageToInt(store.state.editor.language) - 1]?.value ?? 'English') : 
                (languages.value[store.state.editor.config.language - 1]?.value ?? 'English')
        );

        const useTabs = ref(typeof store.state.editor.config.use_tabs === 'undefined' ? true : store.state.editor.config.use_tabs);
        const tabSpaces = ref(typeof store.state.editor.config.tab_spaces === 'undefined' ? 4 : store.state.editor.config.tab_spaces);

        const intRequired = (val) =>
        {
            return  (val && val > 0 || tr.t('The field must be filled'));
        };

        const onReset = () =>
        {
            configDialog.value.hide();
        };

        const onSubmit = () =>
        {
            if (realPrecision.value <= 0 || realExp.value <= 0 || complexPrecision.value <= 0 || complexExp.value <= 0 || complexCount.value <= 0 || 
                tabSpaces.value <= 0 || tabSpaces.value > 16)
                return;

            var inc = '';
            for (var i = 0; i < includesRef.value.length; ++i)
            {
                inc += '{' + '"file_name":"' + includesRef.value[i] + '"}';
                if (i < includesRef.value.length - 1)
                    inc += ',';
            }
            const languageNumber = languages.value.findIndex(l => l.value === language.value) + 1 || 1;
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
                    '"language":' + languageNumber + ',' +
                    '"use_tabs":' + useTabs.value + ',' +
                    '"tab_spaces":' + tabSpaces.value + ',' +
                    '"include_documents":[' + 
                        inc +
                        ']' +
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
            languages,

            useTabs,
            tabSpaces,

            includesRef,
            editIndex,
            editValue,
            selectedIndex,
            newItem,
            selectItem,
            startEdit,
            saveEdit,
            cancelEdit,
            addItem,
            inputRef,
            moveSelectedUp,
            moveSelectedDown,
            saveEditDeferred,

            tr
        }
    }
}
</script>

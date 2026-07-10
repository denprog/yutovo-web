<template>
<q-dialog ref="exportPdfDialog">
    <q-card style="min-width: 460px; max-width: 500px;" class="q-sm">
        <q-card-section class="q-pt-sm q-mt-none">
            <div class="text-blue text-h5">{{ $t('Export to PDF') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-mt-none">
            <q-card flat dense bordered class="q-mt-none">
                <q-card-section dense class="q-pt-none q-mt-none">
                    <div class="text-grey text-h6">{{ $t('Page settings') }}</div>
                </q-card-section>

                <q-card-section dense class="q-pt-none q-mt-none">
                    <div class="row q-gutter-md q-mt-none">
                        <q-select v-model="format" :options="formatOptions" :label="$t('Format')" dense filled class="col" 
                            @update:model-value="onFormatChanged" />
                        <q-select v-model="orientation" :options="orientationOptions" :label="$t('Orientation')" dense filled class="col" 
                            @update:model-value="onOrientationChanged" />
                    </div>

                    <div class="row q-mt-sm q-gutter-xs" style="align-items: center;">
                        <span class="col-auto text-subtitle">{{ $t('Margins (mm)') }}:</span>
                        <div v-for="side in marginSides" :key="side.key" class="col">
                            <q-input :model-value="margins[side.key]" @update:model-value="val => updateMargin(side.key, val)" type="text" 
                                inputmode="numeric" pattern="[0-9]*" filled dense class="spin-input" :rules="[val => /^\d+$/.test(val) && 
                                +val >= 0 && +val <= 100 || '0–100']">
                                <template v-slot:append>
                                    <div class="spin-buttons column">
                                        <q-btn dense flat round size="xs" icon="arrow_drop_up" @mousedown.prevent="startSpin(side.key, 1)" 
                                            @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin(side.key, 1)" 
                                            @touchend.prevent="stopSpin" class="spin-btn" />
                                        <q-btn dense flat round size="xs" icon="arrow_drop_down" @mousedown.prevent="startSpin(side.key, -1)" 
                                            @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin(side.key, -1)" 
                                            @touchend.prevent="stopSpin" class="spin-btn" />
                                    </div>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <div class="row q-gutter-md q-mt-none">
                        <q-input v-model.number="pageWidth" type="text" inputmode="numeric" pattern="[0-9]*" dense filled :label="$t('Width (mm)')" class="col spin-input" :disable="!isCustom" :rules="[val => /^\d+$/.test(val) && +val >= 10 && +val <= 1000 || '10–1000']">
                            <template v-slot:append>
                                <div class="spin-buttons column">
                                    <q-btn dense flat round size="xs" icon="arrow_drop_up" @mousedown.prevent="startSpin('width', 1)" 
                                        @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin('width', 1)" 
                                        @touchend.prevent="stopSpin" :disable="!isCustom" />
                                    <q-btn dense flat round size="xs" icon="arrow_drop_down" @mousedown.prevent="startSpin('width', -1)" 
                                        @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin('width', -1)" 
                                        @touchend.prevent="stopSpin" :disable="!isCustom" />
                                </div>
                            </template>
                        </q-input>

                        <q-input v-model.number="pageHeight" type="text" inputmode="numeric" pattern="[0-9]*" dense filled :label="$t('Height (mm)')" 
                            class="col spin-input" :disable="!isCustom" :rules="[val => /^\d+$/.test(val) && +val >= 10 && +val <= 1000 || '10–1000']">
                            <template v-slot:append>
                                <div class="spin-buttons column">
                                    <q-btn dense flat round size="xs" icon="arrow_drop_up" @mousedown.prevent="startSpin('height', 1)" 
                                        @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin('height', 1)" 
                                        @touchend.prevent="stopSpin" :disable="!isCustom" />
                                    <q-btn dense flat round size="xs" icon="arrow_drop_down" @mousedown.prevent="startSpin('height', -1)" 
                                        @mouseup.prevent="stopSpin" @mouseleave.prevent="stopSpin" @touchstart.prevent="startSpin('height', -1)" 
                                        @touchend.prevent="stopSpin" :disable="!isCustom" />
                                </div>
                            </template>
                        </q-input>
                    </div>
                </q-card-section>
            </q-card>
        </q-card-section>

        <q-separator />

        <q-form @submit.prevent="onOKClick" @reset="onReset">
            <div class="q-pa-md q-gutter-sm">
                <q-btn unelevated class="bg-primary text-white" type="submit" :label="$t('OK')" />
                <q-btn unelevated class="text-blue" type="reset" :label="$t('Cancel')" />
            </div>
        </q-form>
    </q-card>
</q-dialog>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default
{
    name: 'ExportPdfDialog',

    emits: ['format-changed', 'orientation-changed', 'ok', 'cancel'],

    props:
    [
        'initMargins'
    ],

    setup(props, { emit })
    {
        const tr = useI18n();

        const exportPdfDialog = ref(null);

        const format = ref('A4');
        const formatOptions = ['A4', 'A3', tr.t('Letter'), tr.t('Legal'), tr.t('Custom')];
        const orientation = ref(tr.t('Portrait'));
        const orientationOptions = [tr.t('Portrait'), tr.t('Landscape')];
        const pageWidth = ref(210);
        const pageHeight = ref(297);

        const margins = ref({ ...props.initMargins });
        const marginSides = [
            { key: 'left' },
            { key: 'top' },
            { key: 'right' },
            { key: 'bottom' }
        ];

        const standardSizes: Record<string, { width: number; height: number }> = {
            A4: { width: 210, height: 297 },
            A3: { width: 297, height: 420 },
            Letter: { width: 216, height: 279 },
            Legal: { width: 216, height: 356 }
        };

        const isCustom = computed(() => format.value === 'Custom');

        let spinTimer: ReturnType<typeof setTimeout> | null = null;
        let spinField: string | null = null;
        let spinDelta = 0;

        const startSpin = (field: string, delta: number) =>
        {
            spinField = field;
            spinDelta = delta;

            applySpin();

            spinTimer = setTimeout(() => {
                spinTimer = setInterval(applySpin, 50);
            }, 300);
        };

        const stopSpin = () =>
        {
            if (spinTimer)
            {
                clearTimeout(spinTimer);
                clearInterval(spinTimer);
                spinTimer = null;
            }
            spinField = null;
        };

        const applySpin = () =>
        {
            if (!spinField)
                return;

            if (spinField === 'width')
            {
                if (spinDelta > 0 && pageWidth.value < 1000)
                    pageWidth.value += 1;
                if (spinDelta < 0 && pageWidth.value > 10)
                    pageWidth.value -= 1;
            }
            else if (spinField === 'height')
            {
                if (spinDelta > 0 && pageHeight.value < 1000)
                    pageHeight.value += 1;
                if (spinDelta < 0 && pageHeight.value > 10)
                    pageHeight.value -= 1;
            }
            else if (margins.value.hasOwnProperty(spinField))
            {
                const key = spinField as keyof typeof margins.value;
                if (spinDelta > 0 && margins.value[key] < 100)
                    margins.value[key] += 1;
                if (spinDelta < 0 && margins.value[key] > 0)
                    margins.value[key] -= 1;
            }
        };

        const onFormatChanged = (value: string) =>
        {
            emit('format-changed', value);
            if (standardSizes[value])
            {
                const s = standardSizes[value];
                pageWidth.value = s.width;
                pageHeight.value = s.height;
            }
        };

        const onOrientationChanged = (value: string) =>
        {
            emit('orientation-changed', value);
            const tmp = pageWidth.value;
            pageWidth.value = pageHeight.value;
            pageHeight.value = tmp;
        };

        const updateMargin = (side: string, value: string) =>
        {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num >= 0 && num <= 100)
                margins.value[side as keyof typeof margins.value] = num;
        };

        const onOKClick = () =>
        {
            const data = {
                format: format.value,
                orientation: orientation.value,
                pageWidth: pageWidth.value,
                pageHeight: pageHeight.value,
                margins: { ...margins.value }
            };
            emit('ok', data);
            exportPdfDialog.value?.hide();
        };

        const onReset = () =>
        {
            emit('cancel');
            exportPdfDialog.value?.hide();
        };

        const show = () => exportPdfDialog.value?.show();
        const hide = () => exportPdfDialog.value?.hide();

        return {
            exportPdfDialog,
            format,
            formatOptions,
            orientation,
            orientationOptions,
            pageWidth,
            pageHeight,
            margins,
            marginSides,
            isCustom,
            onFormatChanged,
            onOrientationChanged,
            updateMargin,
            onOKClick,
            onReset,
            show,
            hide,
            startSpin,
            stopSpin
        };
    }
};
</script>

<style scoped>
.spin-input input {
    -moz-appearance: textfield;
}
.spin-input input::-webkit-outer-spin-button,
.spin-input input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}

.spin-buttons {
    margin-left: 4px;
    gap: 1px;
}

.spin-btn {
    width: 18px;
    height: 14px;
    min-width: 18px;
    min-height: 14px;
    padding: 0;
    margin: 0;
}

.spin-input .q-field__control {
    padding-right: 0 !important;
}
.spin-input .q-field__append {
    padding-left: 0 !important;
}
</style>

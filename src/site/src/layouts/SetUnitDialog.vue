<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <div class="row">
        <q-card class="q-dialog-plugin" style="min-width: 250px">
            <q-card-section>
                <div class="text-blue text-h5">Units</div>
                <q-tabs v-model="systemsTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab v-for="(item, index) in systems" :key="index" :label=item :name=item clickable @click="onUnitSystemClick(index)" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="systemsTab">
                    <q-tab-panel v-for="(item, index) in systems" :key="index" :name=item>
                        <div style='border: 1px solid black; max-height: 200px; overflow-y: auto;'>
                            <q-list dense bordered class="q-pa-none">
                                <q-item dense v-for="(unit, unitIndex) in units" :key="unitIndex" clickable @click="onUnitClick(unitIndex)" 
                                    @dblclick="onUnitDoubleClick(unitIndex)">
                                    <q-item-section dense>
                                        <span v-html=unit></span>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
                <div class="q-pa-md q-gutter-sm" style="min-width: 200px">
                    <q-btn unelevated class="bg-primary text-white" label="OK" @click="onOKClick" />
                    <q-btn unelevated class="text-blue" label="Cancel" @click="onCancelClick" />                        
                </div>
            </q-card-section>
        </q-card>
    </div>
</q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    name: 'SetUnitDialog',

    emits: [
        'ok', 'hide'
    ],
    
    created()
    {
        if (window.addEventListener)
        {
            window.addEventListener('addUnitSystem', this.addUnitSystem, false);
            window.addEventListener('addUnit', this.addUnit, false);
        }
        else
        {
            window.attachEvent('addUnitSystem', this.addUnitSystem);
            window.attachEvent('addUnit', this.addUnit);
        }
    },

    setup()
    {
        const dialog = ref(null);
        const systems = ref([]);
        const units = ref([]);
        const systemsTab = ref('');
        const curUnit = ref(-1);

        const addUnitSystem = (event) =>
        {
            systems.value.push(event.detail.system);
        };

        const addUnit = (event) =>
        {
            units.value.push('<img src="data:image/bmp;base64, ' + event.detail.unit + '"/>');
        };

        const onUnitSystemClick = (index) =>
        {
            units.value = [];
            window.Module.cwrap('GetCastUnits', 'void', ['string'])(systems.value[index]);
        };

        const onUnitClick = (index) =>
        {
            curUnit.value = index;
        };

        const onUnitDoubleClick = (index) =>
        {
            window.Module.cwrap('ChooseCastUnit', 'void', ['int'])(index);
            dialog.value.hide();
        };

        const onOKClick = () => 
        {
            window.Module.cwrap('ChooseCastUnit', 'void', ['int'])(curUnit.value);
            dialog.value.hide();
        };

        const onCancelClick = () =>
        {
            window.Module.cwrap('StopCastUnits', 'void', [])();
            dialog.value.hide();
        };

        return {
            dialog,
            systems,
            systemsTab,
            units,
            addUnitSystem,
            addUnit,
            onUnitSystemClick,
            onUnitClick,
            onUnitDoubleClick,
            onOKClick,
            onCancelClick,
            curUnit
        };
    },

    mounted()
    {
        window.Module.cwrap('GetCastUnitsSystems', 'void', [])();
    },

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
        }
    }
}
</script>

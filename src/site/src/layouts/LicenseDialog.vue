<template>
<q-dialog ref="licenseDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="q-pb-md text-blue text-h5" style="text-align: center">{{$t('Terms of use')}}</div>
                        <div class="text-h10">
                            <span v-html=terms_of_use></span>
                        </div>
                        <div class="q-pt-md q-gutter-sm" style="text-align: center">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" label="OK" />
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
    name: 'LicenseDialog',

    setup()
    {
        const licenseDialog = ref(null);

        const onSubmit = () =>
        {
            licenseDialog.value.hide();
        };

        return {
            licenseDialog,
            onSubmit
        }
    },

    data()
    {
        const { t } = useI18n();
        return {
            terms_of_use: t('terms_of_use')
        }
    }
}
</script>

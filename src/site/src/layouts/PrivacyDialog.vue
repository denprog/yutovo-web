<template>
<q-dialog ref="privacyDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="q-pb-md text-blue text-h5" style="text-align: center">{{$t('Privacy policy')}}</div>
                        <div class="text-h10">
                            <span v-html=privacy_policy></span>
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
    name: 'PrivacyDialog',

    setup()
    {
        const privacyDialog = ref(null);

        const onSubmit = () =>
        {
            privacyDialog.value.hide();
        };

        return {
            privacyDialog,
            onSubmit
        }
    },

    data()
    {
        const { t } = useI18n();
        return {
            privacy_policy: t('privacy_policy')
        }
    }
}
</script>

<template>
<q-dialog ref="licenseDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="text-blue text-h5" style="text-align: center">Terms of use</div>
                        <div class="text-h10">yutovo.ru service and desktop application come with no warranty, explicit or implied, of availability, merchantability, 
                            or fitness for any purpose whatsoever.<br/>
                            The provider of the yutovo.ru service takes no responsibility, financial or otherwise, for any damage or loss resulting 
                            from the use of the yutovo.ru service, including but not limited to damage to the user's hardware and software.<br/>
                            Projects saved on yutovo.ru account are private to logged in account.<br/>
                            The provider of the yutovo.ru service reserves the right to use all uploaded documents, software logs, results of calculations, 
                            and input data within the yutovo.ru service, for purposes of maintaining and testing the yutovo.ru service.<br/>
                            The provider of the yutovo.ru service reserves the right to change these Terms of Use at any time.
                        </div>
                        <div class="q-pa-md q-gutter-sm" style="text-align: center">
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
    }
}
</script>

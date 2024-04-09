<template>
<q-dialog ref="downloadDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-form @submit="onSubmit">
                    <q-card-section>
                        <div class="text-blue text-h5" style="text-align: center">{{ $t('Download PC version') }}</div>
                        <div class="text-h10">
                            <table class="q-pt-md q-pb-md">
                                <tr>
                                    <th>{{ $t('Target OS') }}</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>Ubuntu 22.04 amd64</td>
                                    <td class="q-pl-md">
                                        <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" @click="onDownloadUbuntu22_04();">{{ $t('Download') }}</q-btn>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </q-card-section>
                    <div class="q-pa-md q-gutter-sm" style="text-align: center">
                        <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" label="Close" />
                    </div>
                </q-form>
            </q-card>
        </div>
    </div>
</q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import { api } from 'boot/boot'

export default {
    name: 'DownloadDialog',

    setup()
    {
        const downloadDialog = ref(null);

        const onSubmit = () =>
        {
            downloadDialog.value.hide();
        };

        const onDownloadUbuntu22_04 = () =>
        {
            console.log('onDownloadUbuntu22_04()');
            var d = downloadDialog;

            api.get('/downloads/yutovo-desktop_1.0.1-1_amd64.deb', 
                {
                    responseType: 'blob'
                }
                ).then(
                    function(response)
                    {
                        const href = URL.createObjectURL(response.data);
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', 'yutovo-desktop_1.0.1-1_amd64.deb');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                        d.value.hide();
                    }
                );
        };

        return {
            downloadDialog,
            onSubmit,
            onDownloadUbuntu22_04
        }
    }
}
</script>

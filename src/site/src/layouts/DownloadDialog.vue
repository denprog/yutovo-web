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
                                    <td>Ubuntu 24</td>
                                    <td class="q-pl-md">
                                        <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" 
                                            @click="onDownload('yutovo-desktop_1.0.3-1_ubuntu24_amd64.deb');">{{ $t('Download') }}</q-btn>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Flatpak</td>
                                    <td class="q-pl-md">
                                        <a class="q-pa-none" target="_blank" rel="noopener noreferrer" 
                                            href="https://flathub.org/apps/com.yutovo.yutovo">{{ $t('Link') }}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Windows 10</td>
                                    <td class="q-pl-md">
                                        <q-btn no-caps square dense color='blue' class="q-pl-md q-pr-md" 
                                            @click="onDownload('yutovo-desktop_1.0.3-1_win10_amd64.exe');">{{ $t('Download') }}</q-btn>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </q-card-section>
                    <div class="q-pa-md q-gutter-sm" style="text-align: center">
                        <q-btn unelevated class="bg-primary text-white" id="submit" type="submit" v-bind:label="$t('Close')"/>
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

export default
{
    name: 'DownloadDialog',

    setup()
    {
        const downloadDialog = ref(null);

        const onSubmit = () =>
        {
            downloadDialog.value.hide();
        };

        const onDownload = (filename) =>
        {
            var d = downloadDialog;
            api.get('/downloads/' + filename, 
                {
                    responseType: 'blob'
                }
                ).then(
                    function(response)
                    {
                        const href = URL.createObjectURL(response.data);
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', filename);
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
            onDownload
        }
    }
}
</script>

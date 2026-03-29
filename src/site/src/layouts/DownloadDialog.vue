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

                                <tr v-for="item in downloads" :key="item.system">
                                    <td>{{ item.system }}</td>
                                    <td class="q-pl-md">
                                        <q-btn v-if="isLocalDownload(item.link)" no-caps square dense color="blue" class="q-pl-md q-pr-md"
                                            @click="onDownloadFromLink(item.link)">
                                            {{ $t('Download') }}
                                        </q-btn>
                                        <a v-else class="q-pa-none" target="_blank" rel="noopener noreferrer" :href="item.link">
                                            {{ $t('Link') }}
                                        </a>
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
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface DownloadItem
{
    system: string
    link: string
}

export default
{
    name: 'DownloadDialog',

    setup()
    {
        const downloadDialog = ref(null);
        const { t } = useI18n();
        const downloads = ref<DownloadItem[]>([]);

        const onSubmit = () =>
        {
            downloadDialog.value.hide();
        };

        const loadDownloads = async () =>
        {
            try
            {
                const resp = await fetch('/downloads/downloads.json');
                downloads.value = await resp.json();
            }
            catch (err)
            {
                console.error('Error loading downloads:', err);
            }
        }

        const isLocalDownload = (link: string) =>
        {
            return /\.(deb|exe|AppImage|rpm)$/i.test(link);
        }

        const onDownloadFromLink = async (link: string) =>
        {
            try
            {
                const resp = await fetch(link, { method: 'HEAD' });
                if (!resp.ok)
                    throw new Error(`${resp.status} ${resp.statusText}`);

                const filename = link.split('/').pop() || 'download';
                const a = document.createElement('a');
                a.href = link;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            catch (err)
            {
                console.error('Error downloading file:', err);
                alert(t('Error downloading file'));
            }

            downloadDialog.value.hide();
        }

        onMounted(loadDownloads);

        return {
            downloadDialog,
            onSubmit,
            downloads,
            onDownloadFromLink,
            isLocalDownload            
        }
    }
}
</script>

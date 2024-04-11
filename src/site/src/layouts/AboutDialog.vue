<template>
<q-dialog ref="aboutDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="q-pb-md text-blue text-h5" style="text-align: center">{{$t('About')}}</div>
                        <div class="text-h10">
                            {{ $t('about_yutovo') }}<br/>
                            {{ $t('support') }}: <a class="q-pa-none" href="mailto:support@yutovo.ru">support@yutovo.ru</a>.
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

export default {
    name: 'AboutDialog',

    setup()
    {
        const aboutDialog = ref(null);

        const onSubmit = () =>
        {
            aboutDialog.value.hide();
        };

        return {
            aboutDialog,
            onSubmit
        }
    }
}
</script>

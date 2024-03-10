<template>
<q-dialog ref="aboutDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm">
                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="text-blue text-h5" style="text-align: center">About</div>
                        <div class="text-h10">Yutovo is a powerful and simple calculator for solving various mathematical, physical and daily tasks.
                            Unlike any other such programs, Yutovo does calculations the same way you do them on paper.
                            That’s because it uses conventional graphical mathematics syntax instead of string one.
                            Because Yutovo is an all-in-one solution to everything from everyday arithmetic to engineering solving,
                            different people can use it for various jobs.<br/>
                            Support: <a class="q-pa-none" href="mailto:support@yutovo.ru">support@yutovo.ru</a>.
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

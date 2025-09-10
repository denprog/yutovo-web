<template>
<q-dialog ref="dialog">
    <div class="row">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">{{ title }}</div>
                <div>{{ message }}</div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Yes" color="primary" @click="onYes" />
                <q-btn flat label="No" color="primary" @click="onNo" />
                <q-btn flat label="Cancel" color="primary" @click="onCancel" />
            </q-card-actions>
        </q-card>
    </div>
</q-dialog>
</template>

<script>
export default
{
    props: ['title', 'message'],
    methods:
    {
        onYes()
        {
            this.$emit('ok', 'yes');
            this.$refs.dialog.hide();
        },

        onNo()
        {
            this.$emit('ok', 'no');
            this.$refs.dialog.hide();
        },

        onCancel()
        {
            this.$emit('ok', 'cancel');
            this.$refs.dialog.hide();
        }
    }
};
</script>

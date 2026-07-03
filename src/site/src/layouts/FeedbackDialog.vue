<template>
<q-dialog ref="feedbackDialog">
    <div class="column row justify-center items-center">
        <div class="row">
            <q-card square bordered class="q-sm" style="min-width: 400px; max-width: 90vw">
                <q-card-section>
                    <q-form @submit="onSubmit" @reset="onReset">
                        <div class="text-blue text-h5">{{ $t('Send Feedback') }}</div>

                        <q-input ref="nameRef" square v-model="name" :label="$t('Your name')" />

                        <q-input ref="emailRef" square v-model="email" lazy-rules :rules="[required, emailRule]"
                            :label="$t('Email *')" />

                        <q-select ref="topicRef" square v-model="topic" :options="topicOptions" lazy-rules
                            :rules="[required]" :label="$t('Topic *')" />

                        <q-input ref="messageRef" square v-model="message" type="textarea" lazy-rules
                            :rules="[required, maxLengthRule]" :label="$t('Message *')"
                            :hint="$t('Characters: {current} / {max}', { current: message.length, max: maxLength })" />

                        <div class="q-pt-sm">
                            <q-btn unelevated class="text-blue" size="sm" no-caps flat @click="onAttachFile"
                                :label="$t('Attach file...')" />
                            <span class="q-ml-sm text-grey-7">{{ attachmentName }}</span>
                            <input ref="fileInput" type="file" style="display: none" @change="onFileSelected" />
                        </div>

                        <div class="q-pt-sm">
                            <q-checkbox v-model="attachCurrentDocument" :label="$t('Attach current document')" />
                        </div>

                        <p class="text-grey-6" v-if="lastErrorState != ''">{{ lastErrorState }}</p>

                        <div class="q-pa-md q-gutter-sm" style="text-align: center">
                            <q-btn unelevated class="bg-primary text-white" id="submit" type="submit"
                                :label="$t('Send')" :loading="sending" />
                            <q-btn unelevated class="text-blue" type="reset" :label="$t('Cancel')" />
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
import { api } from 'boot/boot'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default
{
    name: 'FeedbackDialog',

    setup()
    {
        const feedbackDialog = ref(null);
        const name = ref('');
        const email = ref('');
        const topic = ref('');
        const message = ref('');
        const attachment = ref(null);
        const attachmentName = ref('');
        const attachCurrentDocument = ref(false);
        const sending = ref(false);
        const fileInput = ref(null);
        const nameRef = ref(null);
        const emailRef = ref(null);
        const topicRef = ref(null);
        const messageRef = ref(null);

        const store = useStore();
        const tr = useI18n();
        const maxLength = 5000;

        store.commit('editor/setLastError', '');

        const topicOptions = [
            tr.t('Bug report'),
            tr.t('Feature request'),
            tr.t('General feedback'),
            tr.t('Other')
        ];

        const required = (val) =>
        {
            return (val && val.length > 0 || tr.t('The field must be filled'));
        };

        const emailRule = (val) =>
        {
            return (!val || val.includes('@') || tr.t('Please enter a valid email address'));
        };

        const maxLengthRule = (val) =>
        {
            return (!val || val.length <= maxLength || tr.t('Message is too long'));
        };

        const onAttachFile = () =>
        {
            fileInput.value.click();
        };

        const onFileSelected = (event) =>
        {
            const file = event.target.files[0];
            if (!file)
                return;

            attachmentName.value = file.name;
            const reader = new FileReader();
            reader.onload = () =>
            {
                const base64 = btoa(
                    new Uint8Array(reader.result as ArrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                attachment.value =
                {
                    filename: file.name,
                    content_type: file.type || 'application/octet-stream',
                    data: base64
                };
            };
            reader.readAsArrayBuffer(file);
        };

        const getCurrentDocument = () =>
        {
            return new Promise((resolve, reject) =>
            {
                const module = (window as any).Module;
                if (!module || !module.cwrap)
                {
                    reject(new Error('Editor not available'));
                    return;
                }

                const onSave = (event: any) =>
                {
                    window.removeEventListener('saveDocument', onSave);
                    const json = event.detail.json;
                    if (!json)
                    {
                        reject(new Error('Document data is empty'));
                        return;
                    }
                    const base64 = btoa(
                        json.reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    const documentName = store.state.editor.document_name || 'document.yut';
                    const filename = documentName.endsWith('.yut') ? documentName : documentName + '.yut';
                    resolve({
                        filename: filename,
                        content_type: 'application/octet-stream',
                        data: base64
                    });
                };

                window.addEventListener('saveDocument', onSave, { once: true });
                module.cwrap('OnSave', 'void', ['int'])(0);

                setTimeout(() =>
                {
                    window.removeEventListener('saveDocument', onSave);
                    reject(new Error('Timeout getting document'));
                }, 
                5000);
            });
        };

        const buildPayload = (documentAttachment: any) =>
        {
            const payload: any =
            {
                name: name.value,
                email: email.value,
                topic: topic.value,
                message: message.value,
                version: '1.3.2',
                platform: navigator.userAgent
            };
            const attachments = [];
            if (attachment.value)
                attachments.push(attachment.value);
            if (documentAttachment)
                attachments.push(documentAttachment);
            if (attachments.length > 0)
                payload.attachments = attachments;
            return payload;
        };

        const sendFeedback = (documentAttachment: any) =>
        {
            api.post('/service/send-feedback', buildPayload(documentAttachment))
                .then(
                    function()
                    {
                        sending.value = false;
                        feedbackDialog.value.hide();
                    }
                )
                .catch(
                    function(response)
                    {
                        sending.value = false;
                        console.log(response);
                        store.commit('editor/setLastError', response.response?.data?.error || tr.t('Failed to send feedback'));
                    }
                );
        };

        const onSubmit = () =>
        {
            emailRef.value.validate();
            topicRef.value.validate();
            messageRef.value.validate();

            if (emailRef.value.hasError || topicRef.value.hasError || messageRef.value.hasError)
                return;

            sending.value = true;

            if (attachCurrentDocument.value)
            {
                getCurrentDocument()
                    .then((documentAttachment: any) =>
                    {
                        sendFeedback(documentAttachment);
                    })
                    .catch((error) =>
                    {
                        sending.value = false;
                        console.log(error);
                        store.commit('editor/setLastError', tr.t('Failed to attach current document'));
                    });
            }
            else
            {
                sendFeedback(null);
            }
        };

        const onReset = () =>
        {
            feedbackDialog.value.hide();
        };

        const lastErrorState = computed({
            get: () => (store.state.editor.last_error)
        });

        return {
            store,
            feedbackDialog,
            name,
            email,
            topic,
            message,
            attachment,
            attachmentName,
            attachCurrentDocument,
            sending,
            fileInput,
            nameRef,
            emailRef,
            topicRef,
            messageRef,
            topicOptions,
            required,
            emailRule,
            maxLengthRule,
            onAttachFile,
            onFileSelected,
            onSubmit,
            onReset,
            lastErrorState,
            maxLength,
            tr
        }
    }
}
</script>

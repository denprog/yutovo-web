<template>
    <div class="q-sm">
        <q-input class="q-pa-sm" dense ref="documentsFilterRef" v-model="documentsFilter">
            <template v-slot:append>
                <q-icon v-if="documentsFilter !== ''" name="clear" class="cursor-pointer" @click="resetDocumentsFilter" />
            </template>
        </q-input>
        <q-tree :nodes="documents" dense v-model:selected="selectedDocument" ref="documentsRef" node-key="id" label-key="label" 
            :filter="documentsFilter" @update:selected="onDocumentSelected" default-expand-all>
        </q-tree>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'
import { Cookies } from 'quasar'

export default
{
    created()
    {
        if (window.addEventListener)
        {
            window.addEventListener('listDocuments', this.listDocuments, false);
        }
        else
        {
            window.attachEvent('listDocuments', this.listDocuments);
        }
    },

    setup()
    {
        const documentsFilter = ref('');
        const documentsFilterRef = ref(null);
        const documentsNodes = [
            {
                label: 'Documents'
            }
        ];
        const documents = ref(documentsNodes);
        const documentsRef = ref(null);

        const store = useStore();

        const updateDocuments = (obj) =>
        {
            if (obj == null)
                return;
            obj.sort(function(a, b)
                {
                    return a.name.localeCompare(b.name);
                });
            for (var prop in obj)
            {
                documents.value.push({
                    'id': obj[prop]['id'],
                    'label': obj[prop]['name'] == '' ? '(no name)' : obj[prop]['name'],
                    'selectable': true
                });
            }
        };

        const resetDocumentsFilter = () =>
        {
            documentsFilter.value = '';
            documentsFilterRef.value.focus();
        };

        const listDocuments = () =>
        {
            api.post('/service/list-documents', {}, 
                {
                    headers:
                    {
                        access_token: store.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        documents.value = [];
                        updateDocuments(response.data);
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
        };

        const onDocumentSelected = (target) =>
        {
            window.dispatchEvent(new CustomEvent('loadDocument', 
                {
                    detail: 
                    {
                        document_id: target,
                        last_document: Cookies.get('document_id')
                    }
                }));
        };

        return {
            store,
            documentsFilter,
            documentsFilterRef,
            resetDocumentsFilter,
            documentsNodes,
            documents,
            documentsRef,
            selectedDocument: ref(null),
            onDocumentSelected,
            listDocuments
        }
    },

    mounted()
    {
        this.listDocuments();
    },

    methods:
    {
        onRename()
        {
                canvas.focus();
        }
    }
}
</script>

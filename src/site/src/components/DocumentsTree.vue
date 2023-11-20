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

        <q-menu touch-position square context-menu auto-close>
            <q-list dense style="min-width: 100px">
                <q-item id="rename-menu" clickable @click='onRename();'>
                    <q-item-section>Rename</q-item-section>
                </q-item>
                <q-item id="delete-menu" clickable @click='onDelete();'>
                    <q-item-section>Delete</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
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
        const router = useRouter();

        const $q = useQuasar();

        const updateDocuments = (obj) =>
        {
            if (obj == null)
                return;
            for (var prop in obj)
            {
                documents.value.push({
                    'id': obj[prop]["id"],
                    'label': obj[prop]["name"] == "" ? "(no name)" : obj[prop]["name"],
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
                        last_document: Cookies.get("document_id")
                    }
                }));
        };

        function onDelete()
        {
            $q.dialog({
                title: 'Confirm',
                message: 'Delete the document?',
                cancel: true
            }).onOk(() => {
                api.post('/service/delete-document', 
                    {
                        document_id: target,
                    }
                    ).then(
                        function(response)
                        {
                            console.log(response);
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                        }
                    );
            });
        }

        return {
            store,
            router,
            documentsFilter,
            documentsFilterRef,
            resetDocumentsFilter,
            documentsNodes,
            documents,
            documentsRef,
            selectedDocument: ref(null),
            onDocumentSelected,
            listDocuments,
            onDelete
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

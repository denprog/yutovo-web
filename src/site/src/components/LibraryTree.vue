<template>
    <div class="q-pa-md" style="height:100%;">
        <div class="row">
            <div class="text-blue no-margin no-padding text-h6">{{ $t('Library') }}</div>
        </div>
        <div class="row" style="height:100%;">
            <div style="overflow-y:hidden;">
                <q-input class="q-pa-none" dense ref="documentsFilterRef" v-model="documentsFilter" v-bind:label="$t('Filter')">
                    <template v-slot:append>
                        <q-icon v-if="documentsFilter !== ''" name="clear" class="cursor-pointer" @click="resetLibraryFilter" />
                    </template>
                </q-input>
            </div>
            <div style="height:85%;width:100%;overflow:auto;">
                <q-tree :nodes="library" dense v-model:selected="selectedDocument" ref="documentsRef" node-key="id" label-key="label" 
                    :filter="documentsFilter" @update:selected="onDocumentSelected" default-expand-all no-selection-unset />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'

export default
{
    created()
    {
        if (window.addEventListener)
        {
            window.addEventListener('clearLibraryDocumentSelection', this.clearLibraryDocumentSelection, false);
        }
        else
        {
            window.attachEvent('clearLibraryDocumentSelection', this.clearLibraryDocumentSelection);
        }
    },

    setup()
    {
        const documentsFilter = ref('');
        const documentsFilterRef = ref(null);
        const libraryNodes = [
            {
                label: 'Library'
            }
        ];
        const library = ref(libraryNodes);
        const documentsRef = ref(null);
        const selectedDocument = ref(null);

        const store = useStore();

        const updateLibrary = (obj, t, path) =>
        {
            if (obj == null)
                return;
            for (var prop in obj)
            {
                if (prop != 'files')
                {
                    let p = path + prop + '/';
                    t.push({
                        'id': p,
                        'label': prop,
                        'selectable': false,
                        'children': []
                    });
                    updateLibrary(obj[prop], t[t.length - 1]['children'], p);
                }
            }
            for (var prop in obj)
            {
                if (prop == 'files')
                {
                    for (var i = 0; i < obj[prop].length; ++i)
                    {
                        let p = path + obj[prop][i];
                        t.push({
                            'id': p,
                            'label': obj[prop][i],
                            'selectable': true
                        });
                    }
                }
            }
        };

        const resetLibraryFilter = () =>
        {
            documentsFilter.value = '';
            documentsFilterRef.value.focus();
        };

        const loadLibrary = () =>
        {
            api.post('/service/get-library-documents', 
                {
                    language: store.state.editor.language == '' ? 'en' : store.state.editor.language
                }
                ).then(
                    function(response)
                    {
                        library.value = [];
                        updateLibrary(response.data, library.value, '/');
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
            window.dispatchEvent(new CustomEvent('clearDocumentSelection', {}));
            window.dispatchEvent(new CustomEvent('loadLibraryDocument', 
                {
                    'detail': 
                    {
                        document: target, 
                        language: store.state.editor.language == '' ? 'en' : store.state.editor.language
                    }
                }));
        };

        const clearLibraryDocumentSelection = () =>
        {
            selectedDocument.value = ref(null);
        };

        loadLibrary();

        return {
            store,
            documentsFilter,
            documentsFilterRef,
            resetLibraryFilter,
            libraryNodes,
            library,
            documentsRef,
            selectedDocument,
            onDocumentSelected,
            clearLibraryDocumentSelection,
            loadLibrary
        }
    },

    watch:
    {
        'store.state.editor.language': function()
        {
            this.loadLibrary();
            canvas.focus();
        }
    }
}
</script>

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
                    :filter="documentsFilter" @update:selected="onDocumentSelected" default-expand-all no-selection-unset>
                    <template v-slot:default-header="props">
                        <a :href="props.node.link" class="text-body text-decoration-none">
                            {{ props.node.label }}
                        </a>
                    </template>
                </q-tree>
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
            window.addEventListener('libraryDocumentOpen', this.libraryDocumentOpen, false);
        }
        else
        {
            window.attachEvent('clearLibraryDocumentSelection', this.clearLibraryDocumentSelection);
            window.attachEvent('libraryDocumentOpen', this.libraryDocumentOpen);
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

            if (obj['dirs'] != null)
            {
                for (var i = 0; i < obj['dirs'].length; ++i)
                {
                    var dir = obj['dirs'][i];
                    var p = path + dir['name'] + '/';
                    t.push({
                        'id': p,
                        'label': dir['name'],
                        'selectable': false,
                        'children': []
                    });
                    updateLibrary(dir, t[t.length - 1]['children'], p);
                }
            }

            if (obj['files'] != null)
            {
                for (var i = 0; i < obj['files'].length; ++i)
                {
                    let p = path + obj['files'][i];
                    t.push({
                        'id': p,
                        'label': obj['files'][i],
                        'selectable': true
                    });
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

        const libraryDocumentOpen = (event) =>
        {
            var s = event.detail.name;
            var node = documentsRef.value.getNodeByKey(s);
            if (typeof node !== 'undefined')
            {
                var i = s.lastIndexOf('/');
                if (i != -1)
                {
                    s = s.substr(0, i) + '/';
                    node = documentsRef.value.getNodeByKey(s);
                    if (typeof node !== 'undefined')
                    {
                        const nodes = s.split('/');
                        var n = '/';
                        for (i = 1; i < nodes.length - 1; ++i)
                        {
                            n = n + nodes[i] + '/';
                            documentsRef.value.setExpanded(n, true);
                        }
                    }
                }
            }
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
            libraryDocumentOpen,
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

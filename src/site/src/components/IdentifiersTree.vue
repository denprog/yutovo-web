<template>
    <div class="q-sm">
        <q-input class="q-pa-sm" dense ref="identifiersFilterRef" v-model="identifiersFilter">
            <template v-slot:append>
                <q-icon v-if="identifiersFilter !== ''" name="clear" class="cursor-pointer" @click="resetIdentifiersFilter" />
            </template>
        </q-input>
        <q-tree :nodes="identifiers" dense v-model:selected="selectedIdentifier" ref="identifiersRef" node-key="id" label-key="label" 
            :filter="identifiersFilter" @update:selected="onIdentifierSelected" default-expand-all />
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'

export default {
    name: 'IdentifiersTree',

    created()
    {
        if (window.addEventListener)
            window.addEventListener('updateIdentifiersTree', this.updateIdentifiersTree, false);
        else
            window.attachEvent('updateIdentifiersTree', this.updateIdentifiersTree);
    },

    setup()
    {
        const identifiersFilter = ref('');
        const identifiersFilterRef = ref(null);
        const identifiersNodes = [
            {
                label: 'Identifiers'
            }
        ];
        const identifiers = ref(identifiersNodes);
        const identifiersRef = ref(null);

        const addIdentifiers = (data, id, label) =>
        {
            identifiers.value.push({
                'id': id,
                'label': label,
                'selectable': false,
                'children': []
            });
            var t = identifiers.value[identifiers.value.length - 1]['children'];
            for (var prop in data[id])
            {
                var name = data[id][prop].name;
                t.push({
                    'id': id + '/' + name,
                    'label': name,
                    'selectable': true
                });
            }
        };

        const updateIdentifiers = (data) =>
        {
            addIdentifiers(data, 'builtin_functions', 'Builtin functions');
            addIdentifiers(data, 'user_functions', 'User functions');
            addIdentifiers(data, 'builtin_variables', 'Builtin variables');
            addIdentifiers(data, 'user_variables', 'User variables');
        };

        const resetIdentifiersFilter = () =>
        {
            identifiersFilter.value = '';
            identifiersFilterRef.value.focus();
        };

        const loadIdentifiers = (code_id, solver_guid) =>
        {
            if (code_id == 0)
            {
                identifiers.value = [];
            }
            else
            {
                api.post('/service/list-identifiers', 
                    {
                        "code_id": code_id,
                        "guid": solver_guid,
                        "solver_type": 1
                    }
                    ).then(
                        function(response)
                        {
                            console.log(response);
                            identifiers.value = [];
                            updateIdentifiers(response.data);
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            identifiers.value = [];
                        }
                    );
            }
        };

        const onIdentifierSelected = (target) =>
        {
            console.log(target);
        };

        return {
            identifiersFilter,
            identifiersFilterRef,
            resetIdentifiersFilter,
            identifiersNodes,
            identifiers,
            identifiersRef,
            selectedIdentifier: ref(null),
            onIdentifierSelected,
            loadIdentifiers
        }
    },

    methods:
    {
        updateIdentifiersTree(event)
        {
            this.loadIdentifiers(event.detail.code_id, event.detail.solver_guid);
        }
    }
}
</script>
<template>
    <div class="q-pa-md" style="height:100%;">
        <div class="row">
            <div class="text-blue no-margin no-padding text-h6">{{ $t('Identifiers') }}</div>
        </div>
        <div class="row" style="height:100%;">
            <div style="height:10%;overflow-y:hidden;">
                <q-input class="q-pa-none" dense ref="identifiersFilterRef" v-model="identifiersFilter" v-bind:label="$t('Filter')">
                    <template v-slot:append>
                        <q-icon v-if="identifiersFilter !== ''" name="clear" class="cursor-pointer" @click="resetIdentifiersFilter" />
                    </template>
                </q-input>
            </div>
            <div style="height:90%;overflow:auto;">
                <q-tree :nodes="identifiers" dense v-model:selected="selectedIdentifier" ref="identifiersRef" node-key="id" label-key="label" 
                    :filter="identifiersFilter" @update:selected="onIdentifierSelected" default-expand-all />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/boot'

export default {
    name: 'IdentifiersTree',

    created()
    {
        if (window.addEventListener)
        {
            window.addEventListener('updateIdentifiersTree', this.updateIdentifiersTree, false);
            window.addEventListener('updateLanguage', this.updateLanguage, false);
        }
        else
        {
            window.attachEvent('updateIdentifiersTree', this.updateIdentifiersTree);
            window.attachEvent('updateLanguage', this.updateLanguage);
        }
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

        var last_code_id;
        var last_solver_guid;

        const addIdentifiers = (obj, t, path, tr, arr) =>
        {
            if (obj == null)
                return;
            for (var prop in obj)
            {
                if (arr)
                {
                    addIdentifiers(obj[prop], t, path, tr, !arr);
                    continue;
                }
                if (prop == 'name')
                {
                    let p = path + obj[prop];
                    t.push({
                        'id': p,
                        'label': obj[prop],
                        'selectable': true
                    });
                }
                else
                {
                    let p = path + prop + '/';
                    t.push({
                        'id': p,
                        'label': tr(prop),
                        'selectable': false,
                        'children': []
                    });
                    addIdentifiers(obj[prop], t[t.length - 1]['children'], p, tr, !arr);
                }
            }
        };

        const resetIdentifiersFilter = () =>
        {
            identifiersFilter.value = '';
            identifiersFilterRef.value.focus();
        };

        const loadIdentifiers = (code_id, solver_guid, t) =>
        {
            if (code_id == 0)
            {
                identifiers.value = [];
                return;
            }

            if (code_id == -1)
                code_id = last_code_id;
            if (solver_guid == -1)
                solver_guid = last_solver_guid;
            last_code_id = code_id;
            last_solver_guid = solver_guid;

            api.post('/service/list-identifiers', 
                {
                    'code_id': code_id,
                    'guid': solver_guid,
                    'solver_type': 1
                }
                ).then(
                    function(response)
                    {
                        identifiers.value = [];
                        if (response.data.error == null)
                            addIdentifiers(response.data, identifiers.value, '/', t, false);
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        identifiers.value = [];
                    }
                );
        };

        const onIdentifierSelected = (target) =>
        {
            var s = target.split('/');
            if (s[1] == 'Functions')
                window.Module.cwrap('InsertFunction', 'void', ['string'])(s[2]);
            else
                window.Module.cwrap('InsertString', 'void', ['string'])(s[s.length - 1]);
            var canvas = document.getElementById('canvas');
            canvas.focus();
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
            this.loadIdentifiers(event.detail.code_id, event.detail.solver_guid, this.$t);
        },

        updateLanguage()
        {
            this.loadIdentifiers(-1, -1, this.$t);
        }
    }
}
</script>
<template>
    <div id="identifiers-tree" class="q-pa-md" style="height:100%;">
        <div class="row">
            <div class="text-blue no-margin no-padding text-h6">{{ $t('Identifiers') }}</div>
        </div>
        <div class="row" style="height:90%;">
            <div style="overflow-y:hidden;">
                <q-input class="q-pa-none" dense ref="identifiersFilterRef" v-model="identifiersFilter" v-bind:label="$t('Search')">
                    <template v-slot:append>
                        <q-icon v-if="identifiersFilter !== ''" name="clear" class="cursor-pointer" @click="resetIdentifiersFilter" />
                    </template>
                </q-input>
            </div>
            <div style="height:100%;width:100%;overflow:auto;">
                <q-tree :nodes="identifiers" dense v-model:selected="selectedIdentifier" ref="identifiersRef" node-key="id" label-key="label" 
                    :filter="identifiersFilter" @update:selected="onIdentifierSelected" no-selection-unset
                    :no-results-label="$t('NoMatchingNodes')">
                    <template v-slot:default-header="props">
                        <span class="identifers-item">
                            {{ props.node.label }}
                        </span>
                    </template>
                </q-tree>
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
        window.remote_solver = this.$REMOTE_SOLVER;
        if (window.addEventListener)
        {
            window.addEventListener('updateIdentifiersTree', this.updateIdentifiersTree, false);
            window.addEventListener('updateLanguage', this.updateLanguage, false);
            window.addEventListener('listIdentifiersTree', this.listIdentifiersTree, false);
        }
        else
        {
            window.attachEvent('updateIdentifiersTree', this.updateIdentifiersTree);
            window.attachEvent('updateLanguage', this.updateLanguage);
            window.attachEvent('listIdentifiersTree', this.listIdentifiersTree);
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
        const selectedIdentifier = ref(null);

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
                    var n = obj['name'];
                    if (typeof(obj['description']) != 'undefined')
                        n += ' (' + obj['description'] + ')';
                    t.push({
                        'id': p,
                        'label': n,
                        'selectable': true
                    });
                }
                else if (prop != 'description')
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

            if (window.remote_solver)
            {
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
            }
            else
            {
                window.Module.cwrap('ListIdentifiers', 'void', ['int'])(code_id);
            }
        };

        const onIdentifierSelected = (target) =>
        {
            var s = target.split('/');
            if (s[1] == 'Functions')
                window.Module.cwrap('InsertFunction', 'void', ['string'])(s[2]);
            else
                window.Module.cwrap('InsertString', 'void', ['string'])(s[s.length - 1]);
            selectedIdentifier.value = '';
            var canvas = document.getElementById('canvas');
            canvas.focus();
        };

        const listIdentifiers = (json, t) =>
        {
            identifiers.value = [];
            var c = JSON.parse(json);
            addIdentifiers(c, identifiers.value, '/', t, false);
        };

        return {
            identifiersFilter,
            identifiersFilterRef,
            resetIdentifiersFilter,
            identifiersNodes,
            identifiers,
            identifiersRef,
            selectedIdentifier,
            onIdentifierSelected,
            loadIdentifiers,
            listIdentifiers
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
        },

        listIdentifiersTree(event)
        {
            this.listIdentifiers(event.detail.json, this.$t);
        }
    }
}
</script>


<style>
.identifiers-title {
    font-size: 1.3rem;
    font-weight: 500;
}

.identifiers-item {
    font-size: 1.1rem;
}
</style>

<template>
    <div class="q-pa-md" style="height:100%;">
        <div class="row">
            <div class="text-blue no-margin no-padding text-h6">{{ $t('Tasks') }}</div>
        </div>
        <div class="row" style="height:100%;">
            <div style="overflow-y:hidden;">
                <q-input class="q-pa-none" dense ref="tasksFilterRef" v-model="tasksFilter" v-bind:label="$t('Filter')">
                    <template v-slot:append>
                        <q-icon v-if="tasksFilter !== ''" name="clear" class="cursor-pointer" @click="resetTasksFilter" />
                    </template>
                </q-input>
            </div>
            <div style="height:85%;width:100%;overflow:auto;">
                <q-tree :nodes="tasks" dense v-model:selected="selectedTask" ref="tasksRef" node-key="id" label-key="label" 
                    :filter="tasksFilter" @update:selected="onTaskSelected" default-expand-all no-selection-unset />
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
            window.addEventListener('clearTaskSelection', this.clearTaskSelection, false);
        }
        else
        {
            window.attachEvent('clearTaskSelection', this.clearTaskSelection);
        }
    },

    setup()
    {
        const tasksFilter = ref('');
        const tasksFilterRef = ref(null);
        const tasksNodes = [
            {
                label: 'Tasks'
            }
        ];
        const tasks = ref(tasksNodes);
        const tasksRef = ref(null);
        const selectedTask = ref(null);

        const store = useStore();

        const updateTasks = (obj, t, path) =>
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
                    updateTasks(obj[prop], t[t.length - 1]['children'], p);
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

        const resetTasksFilter = () =>
        {
            tasksFilter.value = '';
            tasksFilterRef.value.focus();
        };

        const loadTasks = () =>
        {
            api.post('/service/get-tasks', 
                {
                    language: store.state.editor.language == '' ? 'en' : store.state.editor.language
                }
                ).then(
                    function(response)
                    {
                        tasks.value = [];
                        updateTasks(response.data, tasks.value, '/');
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
        };

        const onTaskSelected = (target) =>
        {
            window.dispatchEvent(new CustomEvent('clearDocumentSelection', {}));
            window.dispatchEvent(new CustomEvent('loadTask', 
                {
                    'detail': 
                    {
                        task: target, 
                        language: store.state.editor.language == '' ? 'en' : store.state.editor.language
                    }
                }));
        };

        const clearTaskSelection = () =>
        {
            selectedTask.value = ref(null);
        };

        loadTasks();

        return {
            store,
            tasksFilter,
            tasksFilterRef,
            resetTasksFilter,
            tasksNodes,
            tasks,
            tasksRef,
            selectedTask,
            onTaskSelected,
            clearTaskSelection,
            loadTasks
        }
    },

    watch:
    {
        'store.state.editor.language': function()
        {
            this.loadTasks();
            canvas.focus();
        }
    }
}
</script>

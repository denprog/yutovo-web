<template>
    <div class="q-sm">
        <q-input class="q-pa-sm" dense ref="tasksFilterRef" v-model="tasksFilter">
            <template v-slot:append>
                <q-icon v-if="tasksFilter !== ''" name="clear" class="cursor-pointer" @click="resetTasksFilter" />
            </template>
        </q-input>
        <q-tree :nodes="tasks" dense v-model:selected="selectedTask" ref="tasksRef" node-key="id" label-key="label" 
            :filter="tasksFilter" @update:selected="onTaskSelected" default-expand-all />
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/boot'

export default
{
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

        const store = useStore();

        const updateTasks = (obj, t, path) =>
        {
            if (obj == null)
                return;
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
                else
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
        };

        const resetTasksFilter = () =>
        {
            tasksFilter.value = '';
            tasksFilterRef.value.focus();
        };

        const loadTasks = () =>
        {
            api.get('/service/get-tasks', 
                {
                }
                ).then(
                    function(response)
                    {
                        console.log(response);
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
            console.log(target);
            api.post('/service/load-task', 
                {
                    task: target
                }
                ).then(
                    function(response)
                    {
                        store.dispatch('service/updateTaskFile', response.data);
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
        };

        loadTasks();

        return {
            tasksFilter,
            tasksFilterRef,
            resetTasksFilter,
            tasksNodes,
            tasks,
            tasksRef,
            selectedTask: ref(null),
            onTaskSelected
        }
    }
}
</script>

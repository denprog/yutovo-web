import { MutationTree } from 'vuex';
import { ServiceInterface } from './state';

const mutation: MutationTree<ServiceInterface> =
{
    setTaskFile(state, task_file)
    {
        state.task_file = task_file;
    }
};

export default mutation;

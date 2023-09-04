import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ServiceInterface } from './state';

const actions: ActionTree<ServiceInterface, StateInterface> =
{
    updateTaskFile({commit, dispatch}, task_file)
    {
        commit('setTaskFile', task_file);
    }
};

export default actions;

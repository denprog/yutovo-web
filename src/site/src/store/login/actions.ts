import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { LoginStateInterface } from './state';

const actions: ActionTree<LoginStateInterface, StateInterface> = {
    someAction (/* context */) {
        // your code
    }
};

export default actions;

import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { LoginStateInterface } from './state';

const getters: GetterTree<LoginStateInterface, StateInterface> = {
    someGetter (/* context */) {
        // your code
    }
};

export default getters;

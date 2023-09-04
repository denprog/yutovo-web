import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ServiceInterface } from './state';

const getters: GetterTree<ServiceInterface, StateInterface> =
{
    someGetter (/* context */)
    {
        // your code
    }
};

export default getters;

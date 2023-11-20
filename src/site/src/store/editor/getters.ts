import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { EditorInterface } from './state';

const getters: GetterTree<EditorInterface, StateInterface> = 
{
    // lastDocument(state)
    // {
    //     if (state.last_documents.length == 0)
    //         return 0;
    //     const i = state.last_documents.pop();
    //     for (let j = 0; j < state.last_documents.length;)
    //     {
    //         if (state.last_documents[j] == i)
    //             state.last_documents.splice(j, 1);
    //         else
    //             ++j;
    //     }
    //     console.log("getter state.last_documents=", state.last_documents);
    //     return i;
    // }
};

export default getters;

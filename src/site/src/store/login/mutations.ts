import { MutationTree } from 'vuex';
import { LoginStateInterface } from './state';

const mutation: MutationTree<LoginStateInterface> = {
    updateLogin(state, login)
    {
        state.login = login;
    },
    
    updateAccessToken(state, access_token)
    {
        state.access_token = access_token;
    }
};

export default mutation;

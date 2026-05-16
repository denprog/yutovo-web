import { MutationTree } from 'vuex';
import { LoginStateInterface, Payload } from './state';
import jwt_decode from 'jwt-decode';

const mutation: MutationTree<LoginStateInterface> = 
{
    setLogin(state, login)
    {
        state.login = login;
    },

    setAccessToken(state, access_token)
    {
        state.access_token = access_token;
        if (access_token == '')
        {
            state.login = '';
            console.log('Logout');
            return;
        }

        try
        {
            const decoded = jwt_decode<Payload>(access_token);
            state.login = decoded.login;
        }
        catch (e)
        {
            console.error('Failed to decode access token:', e);
            state.access_token = '';
            state.login = '';
        }
    },

    setLastError(state, last_error)
    {
        state.last_error = last_error;
    }
};

export default mutation;

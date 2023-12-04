import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { LoginStateInterface, Payload } from './state';
import jwt_decode from 'jwt-decode';
import { api } from 'boot/boot'

let timer: any;

const actions: ActionTree<LoginStateInterface, StateInterface> =
{
    updateAccessToken({commit, dispatch}, access_token)
    {
        if (typeof timer !== 'undefined')
            clearTimeout(timer);

        commit('setAccessToken', access_token);
        if (access_token == '')
            return;

        const decoded = jwt_decode<Payload>(access_token);
        //update the access token before it expires
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp > now + 1)
        {
            timer = setTimeout(() =>
            {
                api.post('/auth/refresh-token', {}).then(
                    function(response)
                    {
                        dispatch('updateAccessToken', response.headers['access_token']);
                        commit('setLastError', '');
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        dispatch('setAccessToken', '');
                    }
                );
            },
            decoded.exp - now - 10 > 0 ? (decoded.exp - now - 10) * 1000 : (decoded.exp - now - 1) * 1000);
        }
    }
};

export default actions;

import { MutationTree } from 'vuex';
import { EditorInterface } from './state';

const mutation: MutationTree<EditorInterface> =
{
    setDialogColor(state, dialog_color)
    {
        state.dialog_color = dialog_color;
    },

    setLanguage(state, language)
    {
        if (language == '')
        {
            //set system language
            if (navigator.language)
                language = navigator.language;
        }
        if (language.startsWith('ru'))
            state.language = 'ru';
        else if (language.startsWith('es'))
            state.language = 'es';
        else
            state.language = 'en';
    },

    setConfig(state, config)
    {
        state.config = config;
    },

    setSettings(state, settings)
    {
        state.settings = settings;
    },

    setDocumentName(state, document_name)
    {
        state.document_name = document_name;
    },
    
    setLastError(state, last_error)
    {
        state.last_error = last_error;
    },
    
    setLoading(state, loading)
    {
        state.loading = loading;
    },

    setResizing(state, resizing)
    {
        state.resizing = resizing;
    }
};

export default mutation;

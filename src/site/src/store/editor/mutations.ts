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
        state.language = language;
    },

    setDocumentName(state, document_name)
    {
        state.document_name = document_name;
    }
};

export default mutation;

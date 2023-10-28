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
    }
};

export default mutation;

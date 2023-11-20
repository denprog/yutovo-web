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

    // setLastDocument(state, last_document)
    // {
    //     state.last_documents.push(last_document);
    //     console.log("setter state.last_documents=", state.last_documents);
    // },

    setDocumentName(state, document_name)
    {
        state.document_name = document_name;
    }
};

export default mutation;

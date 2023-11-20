export interface EditorInterface
{
    dialog_color: string;
    language: string;
    //last_documents: number[];
    document_name: string;
}

function state(): EditorInterface
{
    return {
        dialog_color: '',
        language: '',
        //last_documents: [],
        document_name: ''
    };
}

export default state;

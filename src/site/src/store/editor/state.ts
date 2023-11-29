export interface EditorInterface
{
    dialog_color: string;
    language: string;
    document_name: string;
}

function state(): EditorInterface
{
    return {
        dialog_color: '',
        language: '',
        document_name: ''
    };
}

export default state;

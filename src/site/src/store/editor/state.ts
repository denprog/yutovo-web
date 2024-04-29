export interface EditorInterface
{
    dialog_color: string;
    language: string;
    config: string;
    settings: string;
    document_name: string;
    last_error: string;
}

function state(): EditorInterface
{
    return {
        dialog_color: '',
        language: '',
        config: '',
        settings: '',
        document_name: '',
        last_error: ''
    };
}

export default state;

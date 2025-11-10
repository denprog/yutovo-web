export interface EditorInterface
{
    dialog_color: string;
    language: string;
    config: string;
    settings: string;
    document_name: string;
    document_changed: boolean;
    last_error: string;
    loading: boolean;
    resizing: boolean;
}

function state(): EditorInterface
{
    return {
        dialog_color: '',
        language: '',
        config: '',
        settings: '',
        document_name: '',
        document_changed: false,
        last_error: '',
        loading: true,
        resizing: false
    };
}

export default state;

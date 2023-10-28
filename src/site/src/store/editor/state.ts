export interface EditorInterface
{
    dialog_color: string;
    language: string;
}

function state(): EditorInterface
{
    return {
        dialog_color: '',
        language: ''
    };
}

export default state;

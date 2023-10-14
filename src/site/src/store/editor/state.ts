export interface EditorInterface
{
    dialog_color: string;
}

function state(): EditorInterface
{
    return {
        dialog_color: ''
    };
}

export default state;

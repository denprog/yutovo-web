export interface ServiceInterface
{
    task_file: string;
}

function state(): ServiceInterface
{
    return {
        task_file: ''
    };
}

export default state;

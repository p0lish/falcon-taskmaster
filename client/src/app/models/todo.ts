export class Todo {
    id: string;
    title = '';
    description?: string;
    completed = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}

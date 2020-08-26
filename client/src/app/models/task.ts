export class Task {
    id: number;
    title = '';
    description?: string;
    completed = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}

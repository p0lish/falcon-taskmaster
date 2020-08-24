import { Injector } from '@angular/core';
import { UtilsService } from '../services/utils.service';
export class Todo {
    id: number;
    title = '';
    description?: string;
    completed = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}

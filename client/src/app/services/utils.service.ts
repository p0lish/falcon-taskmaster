import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateId(): number {
    return parseFloat(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
  }
}

import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from './utils.service';


@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private utils: UtilsService) {}

  private errorHandler(error: any): Observable<Error> {
    return  throwError(error.error);
  }


  addTask(todo: Todo): Observable<object> {
    todo.id = this.utils.generateId();
    return this.http.post(`${this.baseUrl}/tasks`, todo)
    .pipe(catchError(this.errorHandler));
  }

  deleteTaskById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  updateTaskById(id: number, values: object = {}): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}`, values)
    .pipe(catchError(this.errorHandler));

  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`)
    .pipe(catchError(this.errorHandler));

  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`)
    .pipe(catchError(this.errorHandler));

  }

  toggleTaskStatus(id: number, status: boolean): Observable<any> {
      return this.updateTaskById(id, {completed: !status})
      .pipe(catchError(this.errorHandler));
  }

}

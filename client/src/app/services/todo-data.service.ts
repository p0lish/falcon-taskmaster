import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  baseUrl: string = environment.apiBaseUrl;
  tasks: Todo[] = [];

  constructor(private http: HttpClient) {}

  private errorHandler(error: any): Observable<Error> {
    return  throwError(error.error);
  }


  addTask(todo: Todo): Observable<object> {
    return this.http.post(`${this.baseUrl}/tasks`, todo)
    .pipe(catchError(this.errorHandler));
  }

  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  updateTaskById(id: string, values: object = {}): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}`, values)
    .pipe(catchError(this.errorHandler));

  }

  getAllTasks(): Observable<object> {
    return this.http.get(`${this.baseUrl}/tasks`)
    .pipe(catchError(this.errorHandler));

  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`)
    .pipe(catchError(this.errorHandler));

  }

  toggleTaskStatus(id: string): Observable<any> {
    const togglableTask = this.tasks.filter(task => task.id = id)[0];
    if (togglableTask) {
      togglableTask.completed = !togglableTask.completed;
      return this.updateTaskById(id, {completed: togglableTask.completed})
      .pipe(catchError(this.errorHandler));
    } else {
      return of({});
    }
  }

}

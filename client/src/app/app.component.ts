import { Component, ElementRef, ViewChild } from '@angular/core';
import {TaskDataService} from './services/task-data.service';
import { first } from 'rxjs/operators';
import { Todo } from './models/todo';

enum ListState {
  listing,
  editing,
  add,
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  tasks: Todo[] = [];
  listStates = ListState;
  descriptionMaxLength = 100;

  descriptionValue = '';
  titleValue = '';

  descriptionLength = this.descriptionMaxLength;

  listState = this.listStates.listing;

  constructor(private taskDataService: TaskDataService) {
    this.getTasks();
  }

  getTasks(): void {
    this.taskDataService.getAllTasks().pipe(first()).subscribe(tasks => {
      this.tasks = tasks.sort((a: any, b: any) => a.createdAt > b.createdAt ? 1 : -1);
    });
  }

  clearInputs(): void {
    this.descriptionValue = '';
    this.titleValue = '';
    this.descriptionLength = this.descriptionMaxLength;
  }

  toggleListState(): void {
    this.listState = ListState.add;
  }

  checkLength(): void {
    this.descriptionLength = this.descriptionMaxLength - this.descriptionValue.length;
  }
  submitTask(event): void {
    console.log('this.titleValue', this.titleValue)
    const title = this.titleValue;
    const description = this.descriptionValue;
    const currentTodo = new Todo({title, description});
    if (title.length > 0){
      this.taskDataService.addTask(currentTodo).pipe(first()).subscribe(result => {
        console.log('result', result);
        this.getTasks();
        this.clearInputs();
      });
    }
  }

  deleteTask(id): void {
    this.taskDataService.deleteTaskById(id).pipe(first()).subscribe(result => {
      console.log('result', result);
      this.getTasks();

    });
  }

}

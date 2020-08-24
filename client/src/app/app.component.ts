import { Component } from '@angular/core';
import {TodoDataService} from './services/todo-data.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private taskDataService: TodoDataService) {

    taskDataService.getAllTasks().pipe(first()).subscribe(task => {
      console.log('task', task);
    });
  }

  title = 'taskmaster-app';


}

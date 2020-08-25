import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Todo } from 'src/app/models/todo';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnChanges {

  @Input() refreshList!: boolean;
  tasks: Todo[] = [];

  constructor(private taskDataService: TaskDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskDataService.getAllTasks().pipe(first()).subscribe(tasks => {
      this.tasks = tasks.sort((a: any, b: any) => a.createdAt > b.createdAt ? 1 : -1);
    });
  }

  removeAllTask(): void {
    this.tasks.map(task => {
      this.taskDataService.deleteTaskById(task.id).pipe(first()).subscribe();

    });
    this.tasks = [];
  }

}

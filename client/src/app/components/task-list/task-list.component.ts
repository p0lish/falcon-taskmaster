import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Task } from 'src/app/models/task';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnChanges {

  @Input() refreshList!: boolean;
  tasks: Task[] = [];
  beOnline = true;

  constructor(private taskDataService: TaskDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskDataService.getAllTasks().pipe(first()).subscribe(tasks => {
      this.tasks = tasks.sort((a: any, b: any) => a.createdAt > b.createdAt ? 1 : -1);
    }, error => { this.beOnline = false; });
  }

  removeAllTask(): void {
    this.tasks.map(task => {
      this.taskDataService.deleteTaskById(task.id).pipe(first()).subscribe();
    });
    this.tasks = [];
  }

  markAllDone(): void {
    this.tasks.map(task => {
      task.completed = true;
      this.taskDataService.updateTaskById(task.id, {completed: task.completed}).pipe(first()).subscribe();
    });
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { first } from 'rxjs/operators';
import { TaskDataService } from 'src/app/services/task-data.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: Task;
  @Output() update: EventEmitter<number> = new EventEmitter();
  @ViewChild(TaskFormComponent) taskForm: TaskFormComponent;

  underEdit = false;

  constructor(private taskDataService: TaskDataService) { }

  ngOnInit(): void {
  }

  editTask(): void {
    this.underEdit = true;
  }

  closeAndSave(): void {
    this.underEdit = false;
    const updatedTitle = this.taskForm.titleValue;
    const updatedDescription = this.taskForm.descriptionValue;
    const updatedTask: {[k: string]: any} = {};

    if ( updatedTitle !== this.task.title ) {
      updatedTask.title = updatedTitle;
    }

    if ( updatedDescription !== this.task.description ) {
      updatedTask.description = updatedDescription;
    }

    if (Object.keys(updatedTask).length > 0) {
      this.taskDataService.updateTaskById(
        this.task.id,
        {
          title: updatedTitle,
          description: updatedDescription
        }).pipe(first()).subscribe(result => {
          this.update.emit();
        });
    }

  }

  toggleStatus(id, event): Task {
    this.taskDataService.toggleTaskStatus(id, event.target.checked).pipe(first()).subscribe(result => {
      this.update.emit();
     });
    const task = new Task(this.task);
    task.completed = event.target.checked;
    return task;
  }

  deleteTask(id): void {
    this.taskDataService.deleteTaskById(id).pipe(first()).subscribe(result => {
      this.update.emit();
    });
  }

}

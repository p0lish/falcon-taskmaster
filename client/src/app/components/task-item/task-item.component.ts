import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { first } from 'rxjs/operators';
import { TaskDataService } from 'src/app/services/task-data.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: Todo;
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
    const updatedTodo: {[k: string]: any} = {};

    if ( updatedTitle !== this.task.title ) {
      updatedTodo.title = updatedTitle;
    }
    if ( updatedDescription !== this.task.description ) {
      updatedTodo.description = updatedDescription;
    }

    if (Object.keys(updatedTodo).length > 0) {
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

  toggleStatus(id): void {
    this.taskDataService.toggleTaskStatus(id, this.task.completed).pipe(first()).subscribe(result => {
      this.update.emit();
    });
  }


  deleteTask(id): void {
    this.taskDataService.deleteTaskById(id).pipe(first()).subscribe(result => {
      this.update.emit();
    });
  }

}

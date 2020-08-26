import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Task } from 'src/app/models/task';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() task!: Task;
  @Output() addTask: EventEmitter<any> = new EventEmitter();

  editMode = false;
  descriptionMaxLength = 150;
  descriptionLength = this.descriptionMaxLength;

  titleValue: string;
  descriptionValue: string;

  constructor(private taskDataService: TaskDataService) {}

  ngOnInit(): void {
    this.descriptionValue = this.task?.description || '';
    this.titleValue = this.task?.title || '';
    if (this.task) {
      this.editMode = true;
    }
  }

  clearInputs(): void {
    this.descriptionValue = '';
    this.titleValue = '';
    this.descriptionLength = this.descriptionMaxLength;
  }

  checkLength(): void {
    this.descriptionLength = this.descriptionMaxLength - this.descriptionValue.length;
  }

  preventNewLine(event): void {
    event.preventDefault();
  }

  submitTask(event): void {
    event.preventDefault();
    const title = this.titleValue;
    const description = this.descriptionValue;
    const currentTask = new Task({title, description});
    if (!this.editMode) {
      if (title.length > 0){
        this.taskDataService.addTask(currentTask).pipe(first()).subscribe(result => {
        this.clearInputs();
        this.addTask.emit();
      });
    }
  } else {
      this.taskDataService.updateTaskById(
        this.task.id,
        {
        title, description}).pipe(first()).subscribe(result => {
        this.addTask.emit();
      });
  }
  }
}

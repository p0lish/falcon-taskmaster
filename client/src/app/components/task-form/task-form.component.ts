import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Todo } from 'src/app/models/todo';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() task!: Todo;
  @Output() addTask: EventEmitter<any> = new EventEmitter();

  descriptionMaxLength = 100;
  descriptionLength = this.descriptionMaxLength;

  titleValue: string;
  descriptionValue: string;

  constructor(private taskDataService: TaskDataService) {}

  ngOnInit(): void {
    this.descriptionValue = this.task?.description || '';
    this.titleValue = this.task?.title || '';
  }

  clearInputs(): void {
    this.descriptionValue = '';
    this.titleValue = '';
    this.descriptionLength = this.descriptionMaxLength;
  }

  checkLength(): void {
    this.descriptionLength = this.descriptionMaxLength - this.descriptionValue.length;
  }

  submitTask(event): void {
    const title = this.titleValue;
    const description = this.descriptionValue;
    const currentTodo = new Todo({title, description});
    if (title.length > 0){
      this.taskDataService.addTask(currentTodo).pipe(first()).subscribe(result => {
        this.clearInputs();
        this.addTask.emit();
      });
    }
  }
}

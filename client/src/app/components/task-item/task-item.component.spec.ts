import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskItemComponent } from './task-item.component';
import { Task } from 'src/app/models/task';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test if has input but empty', () => {
    component.task = new Task({});
  } );

  it('should be a completed task after one toggleStatus call', () => {
    const task = new Task({title: 'test', description: 'description'});
    const taskCompleted: Task = Object.assign(task);
    taskCompleted.completed = true;
    const eventMock = {target:  {checked: true}};
    component.task = task;

    component.toggleStatus(task.id, eventMock);
    expect(component.toggleStatus(task.id, eventMock)).toEqual(taskCompleted);

  });


});

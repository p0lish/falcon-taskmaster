import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskFormComponent } from './task-form.component';
import { Task } from 'src/app/models/task';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit mode should be true if there is input task', () => {
    const task = new Task({
      title: 'hello',
      completed: false,
    });
    component.task = task;
    component.ngOnInit();

    expect(task.title).toEqual('hello');
    expect(task.completed).toEqual(false);
    expect(component.editMode).toEqual(true);
  });

});

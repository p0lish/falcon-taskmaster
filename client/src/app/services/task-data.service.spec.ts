import { TestBed } from '@angular/core/testing';
import { TaskDataService } from './task-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskDataService', () => {
  let service: TaskDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskDataService]
    }).compileComponents();
    service = TestBed.inject(TaskDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

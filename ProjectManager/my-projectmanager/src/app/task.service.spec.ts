import { TaskService } from "./task.service";
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import Task from './Task';

describe('TaskService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TaskService]
    });
  });

  it('Service should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it("should add task", inject([TaskService], (service: TaskService) => {
    let len: number;
    let tasks: Task[];
    service.addtask('abc', 'abc parent', '11/11/2019', '11/11/2019', '1').subscribe(res => {
      service.gettasks().subscribe(
        (data: Task[]) => { 
          tasks = data;
          expect(tasks.length).toBeGreaterThanOrEqual(1);
        });
    })      
   
  }));

});
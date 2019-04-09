import { TaskService } from "./task.service";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import Task from './Task';

describe('TaskService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TaskService, HttpClient, HttpHandler]
      });
    });

    it('Service should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
      }));
    

// describe("TaskService", () => {
//   let service: TaskService;
//   let http: HttpClient;
  
//   beforeEach(() => {
//       http = new HttpClient(handler);
//     service = new TaskService(http);
//   });

  it("should add task", inject([TaskService], (service: TaskService) => {
      let len : number;
      let tasks: Task[];
    service.addtask('abc','abc parent', '11/11/2019','11/11/2019','1' );
    service.gettasks().subscribe(
        (data: Task[])=>
        {
            tasks = data;    
            expect(tasks.length).toBeGreaterThanOrEqual(1);         
        },
            
    );       
   
  }));

});
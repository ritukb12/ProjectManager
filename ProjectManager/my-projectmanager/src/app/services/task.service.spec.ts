import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import User from '../User';
import { mockTasks } from '../mockdata/Tasks.mock'
import { TaskService } from './task.service'
import { Observable } from 'rxjs/Rx';


describe('TaskService', () => {
    
    let injector: TestBed;
    let taskService: TaskService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [TaskService]
        });
        injector = getTestBed();
        taskService = injector.get(TaskService);
        httpMock = injector.get(HttpTestingController);
      });
      afterEach(() => {
        httpMock.verify();
      });

      it('Get Tasks should return an Observable<Tasks[]>', () => {    
        taskService.gettasks().subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/viewTasks`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
      });


      it('Get Tasks by Project should return an Observable<Tasks[]>', () => {    
        taskService.getAllTasksForProject(1).subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/gettasksbyproject/1`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
      });


      it('Edit Task should return an Observable<Task[]>', () => {    
        taskService.editTask(1).subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/getTask/1`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
      });

      it('Sort Tasks should return an Observable<Tasks[]>', () => {    
        taskService.sortdata('task_name').subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/sorttasks/task_name`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
      });

      it('Delete Task should return an Observable<Tasks[]>', () => {    
        taskService.deleteTask(1).subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/delete/1`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
      });

      it('Update Task should return an Observable<Tasks[]>', () => {    
        taskService.updateTask('abc','pqr','12-12-1985',
        '12-12-1985','50','1').subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/update/1`);
        expect(req.request.method).toBe("POST");
        req.flush(mockTasks);
      });


      it('End Task should return an Observable<Tasks[]>', () => {    
        taskService.endTask('1').subscribe(tasks => {
          expect(tasks.length).toBe(2);
          expect(tasks).toEqual(mockTasks);
        });    
        const req = httpMock.expectOne(`${taskService.uri}/endTask/1`);
        expect(req.request.method).toBe("POST");
        req.flush(mockTasks);
      });
});
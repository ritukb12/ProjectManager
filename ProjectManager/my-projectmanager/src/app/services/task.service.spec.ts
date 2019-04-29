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
        const req = httpMock.expectOne(`${taskService.uri}/viewtasks`);
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


      it('Edit User should return an Observable<Users[]>', () => {    
        userService.editUser(1).subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });    
        const req = httpMock.expectOne(`${userService.uri}/getuser/1`);
        expect(req.request.method).toBe("GET");
        req.flush(mockUsers);
      });

      it('Sort User should return an Observable<Users[]>', () => {    
        userService.sortdata('user_fname').subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });    
        const req = httpMock.expectOne(`${userService.uri}/sortusers/user_fname`);
        expect(req.request.method).toBe("GET");
        req.flush(mockUsers);
      });

      it('Delete User should return an Observable<Users[]>', () => {    
        userService.deleteUser(1).subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });    
        const req = httpMock.expectOne(`${userService.uri}/delete/1`);
        expect(req.request.method).toBe("GET");
        req.flush(mockUsers);
      });

      it('Update User should return an Observable<Users[]>', () => {    
        userService.updateUser('abc','pqr','1','1').subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });    
        const req = httpMock.expectOne(`${userService.uri}/updateuser/1`);
        expect(req.request.method).toBe("POST");
        req.flush(mockUsers);
      });
});
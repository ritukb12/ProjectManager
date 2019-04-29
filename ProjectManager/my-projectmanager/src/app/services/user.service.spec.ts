import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import User from '../User';
import { mockUsers } from '../mockdata/Users.mock'
import { UserService } from './user.service'
import { Observable } from 'rxjs/Rx';


describe('UserService', () => {
    
    let injector: TestBed;
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [UserService]
        });
        injector = getTestBed();
        userService = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);
      });
      afterEach(() => {
        httpMock.verify();
      });

      it('GetAllUsers should return an Observable<Users[]>', () => {    
        userService.getUsers().subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });    
        const req = httpMock.expectOne(`${userService.uri}/getallusers`);
        expect(req.request.method).toBe("GET");
        req.flush(mockUsers);
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
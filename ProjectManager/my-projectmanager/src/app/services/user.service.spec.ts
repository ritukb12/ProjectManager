import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import Task from '../Task';
import { mockUsers } from '../mockdata/Users.mock'
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service'
import { Observable } from 'rxjs/Rx';

beforeEach(async(() => {

    let httpClient: HttpClient
    let userService: UserService
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [HttpClient, UserService]
    })
    httpClient = TestBed.get(HttpClient);
    userService = TestBed.get(UserService);
    //userServiceSpy = TestBed.get(UserService);
}));

describe('UserService', () => {
    let httpClient: HttpClient;
    it('should get users', () => {
        const spy = spyOn(httpClient, 'getallusers').and.returnValue(Observable.of(mockUsers));
        userService.getUsers().subscribe(
            res => {
                expect(res).toEqual(mockUsers);
            }
        );
        expect(spy.calls.any()).toEqual(true);
    })


});
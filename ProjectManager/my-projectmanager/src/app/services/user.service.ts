import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs'
//import {mockTasks} from '../Tasks.mock'
@Injectable({
  providedIn: 'root'
})

//Service class to perform CRUD operations on Tasks
export class UserService {
  uri = 'http://localhost:4000/user';
  constructor(private http: HttpClient) { }

  //Function  to Add a user
  addUser(user_fname,user_lname, user_empId): Observable<any> {
    const obj = {
      "user_fname": user_fname,
      "user_lname": user_lname,
      "user_empID": user_empId
    };

    return this.http.post(`${this.uri}/adduser`, obj);
     
  }

//Function  to get all users
  getUsers(): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/getallusers`);
  }


  sortdata(byCol): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/sortusers/${byCol}`);
  }

  //Function to edit a task
  editUser(id): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/getuser/${id}`);
  }

  //Function to delete a task
  deleteUser(id): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
   

  //Function to update a task
  updateUser(user_fname,user_lname, user_empId,id): Observable<any>  {

    const obj = {
        "user_fname": user_fname,
        "user_lname": user_lname,
        "user_empid": user_empId
    };
    return this
      .http
      .post(`${this.uri}/updateuser/${id}`, obj);
  }

  

// //Mock Function  to get all tasks
// getMockTasks(): Observable<any>  {
//   return of(mockTasks);
// }


}

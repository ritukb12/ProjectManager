import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs'
import {mockTasks} from '../Tasks.mock'
@Injectable({
  providedIn: 'root'
})

//Service class to perform CRUD operations on Tasks
export class TaskService {
  uri = 'http://localhost:4000/task';
  constructor(private http: HttpClient) { }

  //Function  to Add a task
  addtask(task_name, parent_task_name, start_date, end_date, priority): Observable<any> {
    const obj = {
      "task_name": task_name,
      "parent_task_name": parent_task_name,
      "start_date": start_date,
      "end_date": end_date,
      "priority": priority,
      "taskended": false
    };

    return this.http.post(`${this.uri}/add`, obj);
     
  }

//Function  to get all tasks
  gettasks(): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/viewTasks`);
  }

  //Function to edit a task
  editTask(id): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/getTask/${id}`);
  }

  //Function to delete a task
  deleteTask(id): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  //Function to End a task
  endTask(id): Observable<any>  {
    
        const obj = {
          "taskended": true
        };
        return this
          .http
          .post(`${this.uri}/endTask/${id}`, obj);
      }
    

  //Function to update a task
  updateTask(task_name, parent_task_name, start_date, end_date, priority, id): Observable<any>  {

    const obj = {
      "task_name": task_name,
      "parent_task_name": parent_task_name,
      "start_date": start_date,
      "end_date": end_date,
      "priority": priority
    };
    return this
      .http
      .post(`${this.uri}/update/${id}`, obj);
  }

  

//Mock Function  to get all tasks
getMockTasks(): Observable<any>  {
  return of(mockTasks);
}


}

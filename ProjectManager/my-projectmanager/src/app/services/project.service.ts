import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

//Service class to perform CRUD operations on Tasks
export class ProjectService {
    uri = 'http://localhost:4000/project';
    constructor(private http: HttpClient) { }

    
//Function  to get all users
  getAllProjects(): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/getallprojects`);
  }

  
  //Function  to Add a task
  addproject(project_name, priority, start_date, end_date, managerid): Observable<any> {
    const obj = {
      "Project_name":project_name,
      "start_date":start_date,
      "end_date": end_date,
      "priority":priority,
      "projectended": false,
      "manager_ID":  managerid
     
    };

    return this.http.post(`${this.uri}/addproject`, obj);

  }
  sortdata(byCol): Observable<any>  {
    return this
      .http
      .get(`${this.uri}/sortprojects/${byCol}`);
  }

  
}
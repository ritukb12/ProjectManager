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
}
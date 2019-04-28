import { async, fakeAsync,ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import { SearchTaskPipe } from '../pipes/search-task.pipe'
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs/Rx';
import Task from '../Task';
import {mockTasks} from '../mockdata/Tasks.mock'
import { of } from 'rxjs'
import { mockProjects } from '../mockdata/Projects.mock'
import { ProjectService } from '../services/project.service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let taskService: TaskService;
  let projectService: ProjectService;
let tasks :  Task[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent,SearchTaskPipe],
      imports: [FormsModule, ReactiveFormsModule,RouterTestingModule,HttpClientModule],
      providers:[DatePipe]
    })
      .compileComponents();
      taskService = TestBed.get(TaskService);
      projectService = TestBed.get(ProjectService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'View Task'`, () => {  
    expect(component.title).toEqual('View Task');
  });

  it('should get tasks', () => {
    fixture.detectChanges();
    const spy = spyOn(taskService, 'gettasks').and.returnValue(Observable.of(mockTasks));
    component.getAllTasks();
    fixture.detectChanges();
    expect(component.tasks).toEqual(mockTasks);
    expect(spy.calls.any()).toEqual(true);
  })
  

  it('should get projects', () => {
    fixture.detectChanges();
    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(Observable.of(mockProjects));
    component.getAllProjects();
    fixture.detectChanges();
    expect(component.projects).toEqual(mockProjects);
    expect(spy.calls.any()).toEqual(true);
  })



  it('should sort tasks based on task name', () => {
    fixture.detectChanges();
    const spy = spyOn(taskService, 'sortdata').and.returnValue(Observable.of(mockTasks));
    component.sortdata('task_name');
    fixture.detectChanges();
    expect(component.tasks).toEqual(mockTasks);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should set the selected project', () => {
    fixture.detectChanges();
    component.projectSelected(mockProjects[0]);
    expect(component.selectedProject).toEqual(mockProjects[0]);
  })

})
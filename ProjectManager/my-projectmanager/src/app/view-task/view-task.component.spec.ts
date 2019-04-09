import { async, fakeAsync,ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import { SearchTaskPipe } from '../search-task.pipe'
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs/Rx';
import Task from '../Task';
import {mockTasks} from '../Tasks.mock'
import { of } from 'rxjs'

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
let tasks :  Task[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent,SearchTaskPipe],
      imports: [FormsModule, ReactiveFormsModule,RouterTestingModule,HttpClientModule],
      providers:[DatePipe]
    })
      .compileComponents();
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

  it('should fetch all data from service in async manner', fakeAsync(() => {  
    let taskService: TaskService = fixture.debugElement.injector.get(TaskService);
    const spy = spyOn(taskService, 'getMockTasks').and.returnValue(of(mockTasks));
    
    component.mockTest();
    fixture.detectChanges();
    //fixture.whenStable().then({
      expect(component.mockTasks).toEqual(mockTasks);
    //});
    expect(spy.calls.any()).toEqual(true);
  }));
});

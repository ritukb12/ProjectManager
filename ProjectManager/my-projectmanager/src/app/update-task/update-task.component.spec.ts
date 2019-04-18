import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task.component';

import { By } from '@angular/platform-browser';
//import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
//import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Directive } from '@angular/core';
import { TaskService } from "../services/task.service";

// @Directive({
//   selector: '[routerLink], [routerLinkActive]'
// })
// class DummyRouterLinkDirective {}

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  //let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskComponent],// DummyRouterLinkDirective],
      imports: [
        CommonModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
   
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it(`should have as title 'Update Task'`, () => {  
    expect(component.title).toEqual('Update Task');
  });

  it('Task Name cannot be empty', () => {  
    component.ValidateTaskName("");
    expect(component.tasknameErr).toBeTruthy();
  });

  it('form should be invalid', async(() => {
    component.angForm1.controls['task_name'].setValue('');
    component.angForm1.controls['parent_task_name'].setValue('');    
    component.angForm1.controls['priority'].setValue('');
    component.angForm1.controls['start_date'].setValue('');
    component.angForm1.controls['end_date'].setValue('');
    expect(component.angForm1.valid).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('form should be valid', async(() => {
    component.angForm1.controls['task_name'].setValue('test');
    component.angForm1.controls['parent_task_name'].setValue('test1');    
    component.angForm1.controls['priority'].setValue('1');
    component.angForm1.controls['start_date'].setValue('11/11/1985');
    component.angForm1.controls['end_date'].setValue('11/11/1985');
    expect(component.angForm1.valid).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date cannot be greater than End Date', async(() => {     
    component.angForm1.controls['start_date'].setValue('11/11/1986');
    component.angForm1.controls['end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date should be lesser than End Date', async(() => {     
    component.angForm1.controls['start_date'].setValue('11/11/1985');
    component.angForm1.controls['end_date'].setValue('11/11/1986');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date can be equal to End Date', async(() => {     
    component.angForm1.controls['start_date'].setValue('11/11/1985');
    component.angForm1.controls['end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));


});

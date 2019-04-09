import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';


import { AddTask } from './AddTask.component';

describe('Add Task Component', () => {
  let component: AddTask;
  let fixture: ComponentFixture<AddTask>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTask],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,      
        HttpClientModule,
           ],
      providers: [
        {
          provide: Router,
          useClass: class {
            public navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTask);
    component = fixture.componentInstance;   
    fixture.detectChanges();
  });

   it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('form should be invalid', async(() => {
    component.angForm.controls['task_name'].setValue('');
    component.angForm.controls['parent_task_name'].setValue('');    
    component.angForm.controls['priority'].setValue('');
    component.angForm.controls['start_date'].setValue('');
    component.angForm.controls['end_date'].setValue('');
    expect(component.angForm.valid).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('form should be valid', async(() => {
    component.angForm.controls['task_name'].setValue('test');
    component.angForm.controls['parent_task_name'].setValue('test1');    
    component.angForm.controls['priority'].setValue('1');
    component.angForm.controls['start_date'].setValue('11/11/1985');
    component.angForm.controls['end_date'].setValue('11/11/1985');
    expect(component.angForm.valid).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

});

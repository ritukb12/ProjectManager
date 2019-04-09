import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      imports :[FormsModule,ReactiveFormsModule,HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Add Task'`, () => {  
    expect(component.title).toEqual('Add Task');
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

  it('Start date cannot be greater than End Date', async(() => {     
    component.angForm.controls['start_date'].setValue('11/11/1986');
    component.angForm.controls['end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date should be lesser than End Date', async(() => {     
    component.angForm.controls['start_date'].setValue('11/11/1985');
    component.angForm.controls['end_date'].setValue('11/11/1986');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date can be equal to End Date', async(() => {     
    component.angForm.controls['start_date'].setValue('11/11/1985');
    component.angForm.controls['end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));


});

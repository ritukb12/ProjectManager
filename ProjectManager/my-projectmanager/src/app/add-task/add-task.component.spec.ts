import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchUserPipe } from '../pipes/search-user.pipe';
import { SearchProjectPipe } from '../pipes/search-project.pipe';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent,SearchUserPipe,SearchProjectPipe ],
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
    component.angFormAddTask.controls['addTask_txtTaskName'].setValue('');
    component.angFormAddTask.controls['addTask_selectParentTask'].setValue('');    
    component.angFormAddTask.controls['addTask_sliPriority'].setValue('');
    component.angFormAddTask.controls['addTask_txtStartDate'].setValue('');
    component.angFormAddTask.controls['addTask_txtEndDate'].setValue('');
    expect(component.angFormAddTask.valid).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('form should be valid', async(() => {
    component.angFormAddTask.controls['addTask_txtTaskName'].setValue('test');
    component.angFormAddTask.controls['addTask_selectParentTask'].setValue('test1');    
    component.angFormAddTask.controls['addTask_sliPriority'].setValue('1');
    component.angFormAddTask.controls['addTask_txtStartDate'].setValue('11/11/1985');
    component.angFormAddTask.controls['addTask_txtEndDate'].setValue('11/11/1985');
    component.angFormAddTask.controls['addTask_txtProjectName'].setValue('abc');
    component.angFormAddTask.controls['addTask_txtUser'].setValue('user1');
    expect(component.angFormAddTask.valid).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date cannot be greater than End Date', async(() => {     
    component.angFormAddTask.controls['addTask_txtStartDate'].setValue('11/11/1986');
    component.angFormAddTask.controls['addTask_txtEndDate'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date should be lesser than End Date', async(() => {     
    component.angFormAddTask.controls['addTask_txtStartDate'].setValue('11/11/1985');
    component.angFormAddTask.controls['addTask_txtEndDate'].setValue('11/11/1986');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date can be equal to End Date', async(() => {     
    component.angFormAddTask.controls['addTask_txtStartDate'].setValue('11/11/1985');
    component.angFormAddTask.controls['addTask_txtEndDate'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));


});

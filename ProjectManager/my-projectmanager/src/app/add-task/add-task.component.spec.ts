import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchUserPipe } from '../pipes/search-user.pipe';
import { SearchProjectPipe } from '../pipes/search-project.pipe';
import { mockUsers } from '../mockdata/Users.mock'
import { mockProjects } from '../mockdata/Projects.mock'
import { mockTasks } from '../mockdata/Tasks.mock'
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs/Rx';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let userService: UserService;
  let projectService: ProjectService;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent,SearchUserPipe,SearchProjectPipe ],
      imports :[FormsModule,ReactiveFormsModule,HttpClientModule]
    })
    .compileComponents();
    userService = TestBed.get(UserService);
    taskService = TestBed.get(TaskService);
    projectService = TestBed.get(ProjectService);
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


  it('should get projects', () => {
    fixture.detectChanges();
    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(Observable.of(mockProjects));
    component.  getAllProjects();
    fixture.detectChanges();
    expect(component.projects).toEqual(mockProjects);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should get users', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'getUsers').and.returnValue(Observable.of(mockUsers));
    component.getAllUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })

  it('should get tasks', () => {
    fixture.detectChanges();
    const spy = spyOn(taskService, 'gettasks').and.returnValue(Observable.of(mockTasks));
    component.getAllTasks();
    fixture.detectChanges();
    expect(component.tasks).toEqual(mockTasks);
    expect(spy.calls.any()).toEqual(true);
  })


  it('should set the selected user', () => {
    fixture.detectChanges();
    component.userSelected(mockUsers[0]);
    expect(component.selectedUser).toEqual(mockUsers[0]);
  })


  it('should validate task name is not empty', () => {
    fixture.detectChanges();
    component.ValidateTaskName('abc');
    expect(component.projNameError).toBeFalsy();
  })

  it('should show error when task name is empty', () => {
    fixture.detectChanges();
    component.ValidateTaskName('');
    expect(component.projNameError).toBeTruthy();
  })

  it('should set the selected project', () => {
    fixture.detectChanges();
    component.projectSelected(mockProjects[0]);
    expect(component.selectedProject).toEqual(mockProjects[0]);
  })
  
  

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

  it('Add method should call respective service calls', () => {
    fixture.detectChanges();
    const spy1 = spyOn(taskService, 'addtask').and.returnValue(Observable.of({ 'status':200, 'Message': 'Task added successfully' }));    
    component.addtask('1', 'task abc', 'parent task abc', '11-12-2019', '12-12-2019', '1','1');
    fixture.detectChanges();
    expect(spy1.calls.any()).toEqual(true);   
  })


});

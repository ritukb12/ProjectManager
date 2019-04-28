import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { SearchProjectPipe } from '../pipes/search-project.pipe';
import { SearchUserPipe } from '../pipes/search-user.pipe';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs/Rx';
import { mockUsers } from '../mockdata/Users.mock'
import { mockProjects } from '../mockdata/Projects.mock'

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let userService: UserService;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent, SearchProjectPipe, SearchUserPipe],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [DatePipe, UserService]
    })
      .compileComponents();
    userService = TestBed.get(UserService);
    projectService = TestBed.get(ProjectService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    fixture.detectChanges();
    const spy = spyOn(userService, 'getUsers').and.returnValue(Observable.of(mockUsers));
    component.getAllUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
    expect(spy.calls.any()).toEqual(true);
  })


  it('should get projects', () => {
    fixture.detectChanges();
    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(Observable.of(mockProjects));
    component.getallprojects();
    fixture.detectChanges();
    expect(component.projects).toEqual(mockProjects);
    expect(spy.calls.any()).toEqual(true);
  })


  it('should sort projects based on start date', () => {
    fixture.detectChanges();
    const spy = spyOn(projectService, 'sortdata').and.returnValue(Observable.of(mockProjects));
    component.sortdata('start_date');
    fixture.detectChanges();
    expect(component.projects).toEqual(mockProjects);
    expect(spy.calls.any()).toEqual(true);
  })


  it('should set values for edit project', async(() => {
    var project = mockProjects[0];
  component.editproject(project);
  expect(component.proj_Name).toEqual(project.Project_name);
  expect(component.proj_priority).toEqual(project.priority);
  expect(component.proj_start_date).toEqual(project.start_date);
  expect(component.proj_end_date).toEqual(project.end_date);
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('should set the selected user', () => {
    fixture.detectChanges();
    component.userSelected(mockUsers[0]);
    expect(component.selectedUser).toEqual(mockUsers[0]);
  })

  it('form should be valid', async(() => {
    component.angFormAddProject.controls['AddProj_projName'].setValue('test');
    component.angFormAddProject.controls['AddProj_start_date'].setValue('');
    component.angFormAddProject.controls['AddProj_priority'].setValue('1');
    component.angFormAddProject.controls['Addproj_manager'].setValue('abc');
    component.angFormAddProject.controls['AddProj_end_date'].setValue('');
    component.angFormAddProject.controls['AddProj_date_flag'].setValue('');
    component.angFormAddProject.controls['txt_search'].setValue('');
    expect(component.angFormAddProject.valid).toBeTruthy();

  }));

  it('Start date cannot be greater than End Date', async(() => {
    component.angFormAddProject.controls['AddProj_start_date'].setValue('11/11/1986');
    component.angFormAddProject.controls['AddProj_end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeTruthy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date should be lesser than End Date', async(() => {
    component.angFormAddProject.controls['AddProj_start_date'].setValue('11/11/1985');
    component.angFormAddProject.controls['AddProj_end_date'].setValue('11/11/1986');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));

  it('Start date can be equal to End Date', async(() => {
    component.angFormAddProject.controls['AddProj_start_date'].setValue('11/11/1985');
    component.angFormAddProject.controls['AddProj_end_date'].setValue('11/11/1985');
    component.compareTwoDates();
    expect(component.error.isError).toBeFalsy();
    //expect(component.angForm.valid).toBeTruthy();
  }));


});

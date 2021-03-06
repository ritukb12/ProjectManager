import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Task from '../Task';
import Project from '../Project';
import User from '../User';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  selectUndefinedOptionValue: any;
  tasks: Task[];
  angFormAddTask: FormGroup;
  angFormSearchProj: FormGroup;
  angFormSearchUser: FormGroup;
  title = 'Add Task';
  error: any = { isError: false, errorMessage: '' };
  projNameError: boolean = false;
  parentVisible: boolean = false;
  projects: Project[]
  // = [{
  //   Project_name: 'abc',
  //   start_date: 'fsada',
  //   end_date: 'dasdasds',
  //   priority: 'asdasd',
  //   projectended: false,
  //   manager_ID : '1234'
  // }];
  users: User[];
  selectedProject: Project = {
    Project_name: '',
    start_date: '',
    end_date: '',
    priority: '',
    projectended: false,
    manager_ID: ''
  };

  selectedUser: User = {
    user_fname: '',
    user_lname: '',
    user_empID: ''
  };


  constructor(private userService: UserService, private projectService: ProjectService, private ts: TaskService, private fb: FormBuilder) { this.createForm(); }

  //Function to create the Form
  createForm() {
    this.angFormAddTask = this.fb.group({
      addTask_txtTaskName: ['', Validators.required],
      addTask_txtProjectName: ['', Validators.required],
      addTask_txtUser: ['', Validators.required],
      addTask_sliPriority: ['',  Validators.required],
      addTask_selectParentTask: [''],
      addTask_txtStartDate: ['', Validators.required],
      addTask_txtEndDate: ['', Validators.required]
    });
    this.angFormSearchProj = this.fb.group({
      addTask_txtSearchProj: ['']
    })

    this.angFormSearchUser = this.fb.group({
      addTask_txtSearchUser: ['']
    });
  }


  parentFlagChanged(event: any) {
    this.parentVisible = event.target.checked;
  }

  projectSelected(project) {
    this.selectedProject = project;
  }

  userSelected(user) {
    this.selectedUser = user;
  }

  getAllProjects() {
    this.projectService.getAllProjects()
      .subscribe((data: Project[]) => {
        this.projects = data;
      });
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }


  getAllTasks() {
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  ValidateTaskName(val) {
    if (val == undefined || val.length == 0)
      this.projNameError = true;
    else
      this.projNameError = false;
  }

  compareTwoDates() {
    if (new Date(this.angFormAddTask.controls['addTask_txtEndDate'].value) < new Date(this.angFormAddTask.controls['addTask_txtStartDate'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
    }
    else { this.error = { isError: false, errorMessage: "" }; }
  }
  //Function to Add a task
  addtask(project_id, task_name, parent_task_name, start_date, end_date, priority, user_id) {
    this.ts.addtask(project_id, task_name, parent_task_name, start_date, end_date, priority, user_id).subscribe(
      res => {
        if (res)
          window.confirm(res.Message);
      }
    );

  }

  reset() {
    this.error = { isError: false, errorMessage: "" };
  }

 

  //Get All tasks on Init
  ngOnInit() {
    this.getAllTasks();
    this.getAllProjects();
    this.getAllUsers();
  }
}

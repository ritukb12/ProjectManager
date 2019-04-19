import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import Project from '../Project';
import User from '../User';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  isDateEntryEnabled: boolean = false;
  angFormAddProject: FormGroup;
  title = 'Add Project';
  error: any = { isError: false, errorMessage: '' };
  users: User[];
  selectedUser: User = {
    user_fname: '',
    user_lname: '',
    user_empID: ''
  };

  constructor(private userService: UserService,private fb: FormBuilder,private projectService: ProjectService) {this.createForm(); }

  ngOnInit() {
    this.getallprojects();
    this.getAllUsers();
  }

  toggleFlag() {//if()

  }

  userSelected(user) {
    this.selectedUser = user;
  }


  getAllUsers() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  createForm() {
    this.angFormAddProject = this.fb.group({
      AddProj_projName: ['', Validators.required],
      AddProj_start_date: ['' ],
      AddProj_priority:['',Validators.required],
      Addproj_manager: ['',Validators.required],
      AddProj_end_date: [''],
      AddProj_date_flag:['',''],
      txt_search :['','']


    });
  }

  compareTwoDates() {
    if (new Date(this.angFormAddProject.controls['AddProj_end_date'].value) < new Date(this.angFormAddProject.controls['AddProj_start_date'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
    }
    else { this.error = { isError: false, errorMessage: "" }; }
  }

  getallprojects() {
    this.projectService
      .getAllProjects()
      .subscribe((data: Project[]) => {
        this.projects = data;
      });
  }

//Function to Add a task
addproject(project_name, priority, start_date, end_date, managerid) {
  
      this.projectService.addproject(project_name, priority, start_date, end_date, managerid).subscribe(
        res => {
          if (res)
            window.confirm(res.Message);
        }
      );
  
    }
  

  sortdata(param) {
    this.projectService.sortdata(param).subscribe(
      (data: Project[]) => {
        this.projects = data;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import Project from '../Project';
import User from '../User';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  isDateEntryEnabled: boolean = false;
  //date = new Date();
  proj_Name: String = "";
  proj_priority: String = "";
  proj_manager: String = "";
  proj_manager_id: String = "";
  proj_start_date: String;
  proj_end_date: String;
  _ID: String = "";
  
  updateMode: boolean = false;

  angFormAddProject: FormGroup;
  angFormSearchUser: FormGroup;
  title = 'Add Project';
  error: any = { isError: false, errorMessage: '' };
  users: User[];
  selectedUser: User = {
    user_fname: '',
    user_lname: '',
    user_empID: '',
  };

  constructor(private datepipe: DatePipe, private userService: UserService, private fb: FormBuilder, private projectService: ProjectService) { this.createForm(); }

  ngOnInit() {
    this.getallprojects();
    this.getAllUsers();
  }

  userSelected(user) {
    this.selectedUser = user;
    
  }

  dateFlagChanged(event: any) {
    this.isDateEntryEnabled = event.target.checked;
    if (this.isDateEntryEnabled) {
      var end_date: Date = new Date();
      this.proj_start_date = (new Date()).toISOString().substr(0, 10);
      end_date.setDate(end_date.getDate() + 1);
      this.proj_end_date = end_date.toISOString().substr(0, 10);
      //this.datepipe.transform(new Date(),"MM/dd/yyyy");
      //this.proj_end_date = this.datepipe.transform(new Date(),"MM/dd/yyyy");
    }
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
      AddProj_start_date: [''],
      AddProj_priority: ['', Validators.required],
      Addproj_manager: ['', Validators.required],
      AddProj_end_date: [''],
      AddProj_date_flag: ['', ''],
      txt_search: ['', '']
    });

    this.angFormSearchUser = this.fb.group({
      txt_SearchUser: ['']
    });
  }

  //Function to update Task
  suspendProject(projectID) {
    this.projectService.suspendProject(projectID).subscribe(
      res => {
        if (res) {
          window.confirm(res.Message);
          this.getallprojects();
        }

      });
  }

  editproject(project) {

    this.proj_Name = project.Project_name;
    this.proj_priority = project.priority;
    this.proj_start_date = project.start_date
    this.proj_end_date = project.end_date;
    this._ID = project._id;

    if (project.start_date != "" || project.end_date != "") {
      this.isDateEntryEnabled = true;
    }
    else {

      this.isDateEntryEnabled = false;
    }

    this.userService.editUser(project.manager_ID).subscribe(
      user => {
        this.selectedUser = user;
        this.proj_manager = user.user_fname;        
        this.proj_manager_id = user._id;
      }
    );
    this.updateMode = true;
  }

  updateproject(project_name, priority, start_date, end_date, managerid) {
    this.projectService.updateProject(project_name, priority, start_date, end_date, managerid, this._ID)
      .subscribe(res => {
        this.projectService
          .getAllProjects()
          .subscribe((data: Project[]) => {
            this.projects = data;
            window.confirm("Project updated Sucessfully!!");
          })
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
        if (res) {
          window.confirm(res.Message);
          this.getallprojects();
        }
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

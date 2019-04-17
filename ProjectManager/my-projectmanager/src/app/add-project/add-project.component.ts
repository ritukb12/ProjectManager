import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  isDateEntryEnabled: boolean = false;
  angFormAddProject: FormGroup;
  title = 'Add Project';
  error: any = { isError: false, errorMessage: '' };
  constructor(private fb: FormBuilder) {this.createForm(); }

  ngOnInit() {
  }

  toggleFlag() {//if()

  }

  createForm() {
    this.angFormAddProject = this.fb.group({
      AddProj_projName: ['', Validators.required],
      AddProj_start_date: [''],
      AddProj_priority:['',''],
      Addproj_manager: [''],
      AddProj_end_date: ['', ''],
      AddProj_date_flag:['',''],
      txt_AddProj_searchProj :['','']


    });
  }

  compareTwoDates() {
    if (new Date(this.angFormAddProject.controls['end_date'].value) < new Date(this.angFormAddProject.controls['start_date'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
    }
    else { this.error = { isError: false, errorMessage: "" }; }
  }

}

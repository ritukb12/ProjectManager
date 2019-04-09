import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Task from '../Task';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  selectUndefinedOptionValue:any;
  title = 'Update Task';
  task: any = {};
  allTasks: Task[];
  error: any = { isError: false, errorMessage: '' };
  angForm1: FormGroup;
  tasknameErr: boolean = false;
  constructor(private ts: TaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { this.createForm(); }

  //Funtion to create the Form
  createForm() {
    this.angForm1 = this.fb.group({
      task_name: ['', Validators.required],
      priority: ['', Validators.required],
      parent_task_name: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  reset() {
    this.error = { isError: false, errorMessage: "" };
  }

  ValidateTaskName(val) {
    if (val == undefined || val.length == 0)
      this.tasknameErr = true;
    else
      this.tasknameErr = false;
  }

  //Function to update Task
  updateTask(task_name, parent_task_name, start_date, end_date, priority) {
    this.route.params.subscribe(params => {
      this.ts.updateTask(task_name, parent_task_name, start_date, end_date, priority, params['id']).subscribe(
        res => {
          if (res)
            window.confirm(res.Message)
        });


    });
  }

  compareTwoDates() {
    if (new Date(this.angForm1.controls['end_date'].value) < new Date(this.angForm1.controls['start_date'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
    }
    else { this.error = { isError: false, errorMessage: "" }; }
  }

  //Load task to be edited on init
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ts.editTask(params['id']).subscribe(res => {
        this.task = res;
      });
    });

    //Get All tasks to load in the Parent Task drop down
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.allTasks = data;
      });

  }
}

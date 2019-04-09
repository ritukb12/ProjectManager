import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Task from '../Task';

@Component({
  selector: 'add-task',
  templateUrl: './AddTask.component.html',
  styleUrls: ['./AddTask.component.css']
})
export class AddTask {
  tasks: Task[];
  angForm: FormGroup;
  title = 'Add Task';
  error: any = { isError: false, errorMessage: '' };
  tasknameErr: boolean = false;
  constructor(private ts: TaskService, private fb: FormBuilder) { this.createForm(); }

  //Function to create the Form
  createForm() {
    this.angForm = this.fb.group({
      task_name: ['', Validators.required],
      priority: [''],
      parent_task_name: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]


    });
  }

  ValidateTaskName(val) {
    if (val == undefined || val.length == 0)
      this.tasknameErr = true;
      else
      this.tasknameErr = false;
  }

  compareTwoDates() {
    if (new Date(this.angForm.controls['end_date'].value) < new Date(this.angForm.controls['start_date'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
    }
    else { this.error = { isError: false, errorMessage: "" }; }
  }
  //Function to Add a task
  addtask(task_name, parent_task_name, start_date, end_date, priority) {

    this.ts.addtask(task_name, parent_task_name, start_date, end_date, priority).subscribe(
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
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }
}

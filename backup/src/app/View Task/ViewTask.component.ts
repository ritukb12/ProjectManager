import { Component } from '@angular/core';
import Task from '../Task';
import { TaskService } from '../task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SearchTask} from '../searchTask.pipe'

@Component({
  selector: 'view-task',
  templateUrl: './ViewTask.component.html',
  styleUrls: ['./ViewTask.component.css']
})
export class ViewTask {
  tasks: Task[];
  title = 'View Task';
  task_name = '';
  parent_task_name = '';
  priorityFrom = '';
  priorityTo = '';
  startDate: Date;
  endDate: Date;
  angForm: FormGroup;
  constructor(private ts: TaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { this.createForm(); }

  //Function to create the form
  createForm() {
    this.angForm = this.fb.group({
      task_name: [''],
      parent_task_name: [''],
      priorityfrom: [''],
      priorityto: [''],
      startdate: [''],
      enddate: ['']

    });
  }


  //Function to delete task
  deleteTask(task_id) {
    if (window.confirm("Are you sure you want to delete this Task?")) {
      this.ts.deleteTask(task_id).subscribe(res => {
        this.ts
          .gettasks()
          .subscribe((data: Task[]) => {
            this.tasks = data;           
          });
          window.confirm("Task Deleted Successfully!!")
      });
    }
  }

  //Function to end task
  endTask(task_id) {
    this.ts.endTask(task_id);
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
        window.confirm("Task Ended Sucessfully!!");
      });
  }

  //Get all tasks on  init
  ngOnInit() {
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }
}

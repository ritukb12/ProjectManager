import { Component, OnInit } from '@angular/core';
import Task from '../Task';
import { TaskService } from '../task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchTaskPipe } from '../search-task.pipe'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  mockTasks: Task[];
  title = 'View Task';
  task_name = '';
  parent_task_name = '';
  priorityFrom = '';
  priorityTo = '';
  startDate: Date;
  endDate: Date;
  angFormViewTask: FormGroup;
  constructor(private ts: TaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { this.createForm(); }

  //Function to create the form
  createForm() {
    this.angFormViewTask = this.fb.group({
      ViewTask_txt_projname: [''],
    

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
    this.ts.endTask(task_id).subscribe(res => {;
    this.ts
      .gettasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
        window.confirm("Task Ended Sucessfully!!");
      })
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

  //Mock test function to check HTTP response
  mockTest() {
    this.ts.getMockTasks().subscribe(data => 
      { 
        this.mockTasks = data }
    )
  }
}

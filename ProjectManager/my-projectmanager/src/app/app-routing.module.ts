import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTaskComponent} from './add-task/add-task.component'
import {ViewTaskComponent} from './view-task/view-task.component'
import {HomeComponent} from './home/home.component'
import {UpdateTaskComponent} from './update-task/update-task.component'

const routes: Routes = [
  {path:"AddTask", component:AddTaskComponent},
{path:"ViewTask", component:ViewTaskComponent},
{path:"editTask/:id", component:UpdateTaskComponent},
{path:"", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

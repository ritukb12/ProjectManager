import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTask} from './Add Task/AddTask.component'
import {ViewTask} from './View Task/ViewTask.component'
import {UpdateTask} from './Update Task/UpdateTask.component'
import {HomeComponent} from './home/home.component'

const routes: Routes = [
  {path:"AddTask", component:AddTask},
{path:"ViewTask", component:ViewTask},
{path:"editTask/:id", component:UpdateTask},
{path:"", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

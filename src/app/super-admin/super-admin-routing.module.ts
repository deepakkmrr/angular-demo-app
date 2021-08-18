import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
    {
      path:'dashboard',
      component:DashboardComponent,
      data: {
          title:'Dashboard'
      }
    },
    {
        path:'students',
        component:StudentsComponent,
        data: {
            title:'Students'
        }
    }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
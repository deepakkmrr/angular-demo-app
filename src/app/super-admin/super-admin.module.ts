import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { MaterialModule } from '../material.module';
import { StudentsComponent } from './students/students.component';
import { PopupStudentComponent } from './students/popup-student/popup-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    StudentsComponent,
    PopupStudentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SuperAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SuperAdminModule { }

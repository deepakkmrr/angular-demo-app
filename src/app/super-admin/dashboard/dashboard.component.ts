import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/state-service/state.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentCount:number=0;
  constructor(private state:StateService,
    private studentService:StudentService) {
    

    this.getStudentCount();
  }

  ngOnInit(): void {
    this.state.onStudentCountChanged.subscribe(
      (res) => {
        debugger;
        this.studentCount = res;
      }
    );
  }

  getStudentCount(){
    this.studentService.getStudentCount().subscribe(
      (res) => {
        this.studentCount = res;
      }
    );
  }

}

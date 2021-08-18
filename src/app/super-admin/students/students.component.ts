import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MessageBarService, MessageType } from 'src/app/services/message-bar.service';
import { StateService } from 'src/app/state-service/state.service';
import { StudentService } from '../services/student.service';
import { PopupStudentComponent } from './popup-student/popup-student.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
 
  @ViewChild(MatSort)
  sort!: MatSort;
  REQUESTS = [];

  dataSource = new MatTableDataSource(this.REQUESTS);
  columnsToDisplay = ['firstName', 'lastName', 'fatherName', 'motherName', 'addedDateTime', 'actions'];
  dataSubject = new BehaviorSubject<Element[]>([]);

  constructor(
    public dialog: MatDialog,
    private studentService:StudentService,
    private mesageBar:MessageBarService,
    private state: StateService) {
   
    
    this.getStudentList();
  }

  getStudentList(){
    this.studentService.getStudentlist().subscribe(
      (res) => {
        console.log(res);
        this.REQUESTS = res;
        this.state.onStudentCountChanged.next(res.length);
        this.dataSource.data = this.REQUESTS;
        this.dataSource.filterPredicate = 
  (data: any, filter: string) => data.firstName.toLowerCase().indexOf(filter) != -1;
      },
      (err) => {
        console.log(err);
      })
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addNewStudent(){
    this.openStudentPopup(null);
  }

  editStudent(student:any){
    this.openStudentPopup(student, "Edit");
  }

  viewStudent(student:any){
    this.openStudentPopup(student, "View");
  }

  deleteStudent(id:string){
    if(confirm('Are you sure to delete this student detail?')){
      this.studentService.deleteStudent(id).subscribe(
        (res) => {
          this.mesageBar.showMessageBar(MessageType.SUCCESS,"Student details deteled successfully!");
          this.getStudentList();
        },
        (err) => {
          this.mesageBar.showMessageBar(MessageType.ERROR,"Error deleting student details!");
        }
      );
    }

  }

  openStudentPopup(student:any,mode:string="add"){
    const dialogRef = this.dialog.open(PopupStudentComponent, {
      width: '60%',
      data: {data:student,mode:mode}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getStudentList();
      }
      console.log(result);
    });
  }

  applyFilter(filterValue: any) {
    // debugger;
    console.log(filterValue);
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

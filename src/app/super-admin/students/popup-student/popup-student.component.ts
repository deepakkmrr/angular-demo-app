import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MessageBarService, MessageType } from 'src/app/services/message-bar.service';
import { StudentService } from '../../services/student.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-student',
  templateUrl: './popup-student.component.html',
  styleUrls: ['./popup-student.component.scss']
})
export class PopupStudentComponent implements OnInit {
  studentForm!: FormGroup;
  title:string="Student";
  constructor(private messageBar: MessageBarService,
    private studentService: StudentService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<PopupStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
      this.createForm(this.data.data);
      this.title = this.data.mode + " " + this.title;
  }

  ngOnInit(): void {
  }

  createForm(student: any) {
    this.studentForm = new FormGroup({
      id: new FormControl(student?.id ? student.id : '00000000-0000-0000-0000-000000000000', Validators.required),
      firstName: new FormControl(student?.firstName ? student.firstName : '', Validators.required),
      lastName: new FormControl(student?.lastName ? student.lastName : '', Validators.required),
      fatherName: new FormControl(student?.fatherName ? student.fatherName : '', Validators.required),
      motherName: new FormControl(student?.motherName ? student.motherName : '', Validators.required),
      contact: new FormControl(student?.contact ? student.contact : '', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]),
      email: new FormControl(student?.email ? student.email : '', [Validators.required, Validators.email]),
      address: new FormControl(student?.address ? student.address : '', Validators.required),
    });

    if(this.data.mode.toLowerCase() === "view"){
      this.studentForm.controls['firstName'].disable();
      this.studentForm.controls['lastName'].disable();
      this.studentForm.controls['fatherName'].disable();
      this.studentForm.controls['motherName'].disable();
      this.studentForm.controls['contact'].disable();
      this.studentForm.controls['email'].disable();
      this.studentForm.controls['address'].disable();
    }
  }

  submit() {
    if (!this.studentForm.valid) {
      this.messageBar.showMessageBar(MessageType.ERROR, 'Please fill all required fields!');
      return;
    }
    else {
      console.log(this.studentForm.value);
      var obj = this.studentForm.value;
      obj.logId = this.auth.user.id;
      if(this.data.mode.toLowerCase() == "add"){
        this.studentService.saveStdudentDetails(obj).subscribe(
          (res) => {
            this.messageBar.showMessageBar(MessageType.SUCCESS,"Student details added successfully!")
            this.dialogRef.close(true);
          },
          (err) => {
            this.messageBar.showMessageBar(MessageType.SUCCESS,"Error adding student details!")
          }
        )
      }
      else if(this.data.mode.toLowerCase() == "edit"){
        this.studentService.updateStudentDetails(obj).subscribe(
          (res) => {
            this.messageBar.showMessageBar(MessageType.SUCCESS,"Student details updated successfully!")
            this.dialogRef.close(true);
          },
          (err) => {
            this.messageBar.showMessageBar(MessageType.SUCCESS,"Error updating student details!")
          }
        )
      }
    }
  }

}

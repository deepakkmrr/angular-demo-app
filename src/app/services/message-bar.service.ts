import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



export enum MessageType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success"
}

@Injectable({
  providedIn: 'root'
})
export class MessageBarService {

  duration:number=2000;

  constructor(private snackBar: MatSnackBar) { }

  showMessageBar(messageType: MessageType, content:string){
    this.snackBar.open(content, "", {
      duration: 2000,
      verticalPosition: "top", 
      horizontalPosition: "end",
      panelClass:[messageType]
    });
  }
}

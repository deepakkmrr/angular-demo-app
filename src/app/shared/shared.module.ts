import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmYesNoComponent } from './popup-confirm-yes-no/popup-confirm-yes-no.component';



@NgModule({
  declarations: [
    PopupConfirmYesNoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopupConfirmYesNoComponent
  ]
})
export class SharedModule { }

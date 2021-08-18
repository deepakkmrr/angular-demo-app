import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatMenuModule,
  FlexLayoutModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  FormsModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}

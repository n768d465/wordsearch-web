import { NgModule } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
  ],
  entryComponents: [FormDialogComponent],
  declarations: [FormDialogComponent],
})
export class NavbarModule {}

import { NgModule } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, CommonModule],
  entryComponents: [FormDialogComponent],
  declarations: [FormDialogComponent],
})
export class DialogModule {}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'ws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(FormDialogComponent, {
      width: '500px',
    });
  }
}

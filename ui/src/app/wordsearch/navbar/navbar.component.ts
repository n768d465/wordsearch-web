import { Component, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import { IWordSearchParams } from "src/app/shared/word-search-form-data";

@Component({
  selector: "ws-settings-dialog",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(FormDialogComponent, {
      width: "500px",
    });
  }
}

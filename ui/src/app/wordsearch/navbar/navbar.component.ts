import { Component, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import { IWordSearchFormData } from "src/app/shared/word-search-form-data";

@Component({
  selector: "ws-settings-dialog",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  formData: IWordSearchFormData;
  @Output() onSubmitted: EventEmitter<IWordSearchFormData> = new EventEmitter<
    IWordSearchFormData
  >();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.formData = {
      wordsearchSize: "10",
      maxWordLength: "7",
      showWordsOnly: false
    };
    this.onSubmitted.emit(this.formData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "500px",
      data: this.formData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formData = result;
        this.onSubmitted.emit(this.formData);
      }
    });
  }
}

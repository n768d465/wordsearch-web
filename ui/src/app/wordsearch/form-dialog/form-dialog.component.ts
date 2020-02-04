import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IWordSearchFormData } from "src/app/shared/word-search-form-data";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { gridSizeValidator } from "src/app/validators/grid-size.validator";
import { wordLengthValidator } from "src/app/validators/word-length.validator";
import { IWordSearchData } from "src/app/shared/word-search-data";

@Component({
  selector: "wordsearch-form",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.css"]
})
export class FormDialogComponent implements OnInit {
  wordsearchFormData: IWordSearchFormData;
  wordsearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IWordSearchFormData
  ) {}

  ngOnInit() {
    this.wordsearchFormData = this.data;
    this.wordsearchForm = this.fb.group({
      wordsearchSize: [
        this.wordsearchFormData.wordsearchSize,
        gridSizeValidator()
      ],
      maxWordLength: [
        this.wordsearchFormData.maxWordLength,
        wordLengthValidator()
      ],
      showWordsOnly: [this.wordsearchFormData.showWordsOnly]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!(this.wordsearchForm.status === "INVALID")) {
      this.wordsearchFormData = {
        wordsearchSize: this.wordsearchForm.get("wordsearchSize").value,
        maxWordLength: this.wordsearchForm.get("maxWordLength").value,
        showWordsOnly: this.wordsearchForm.get("showWordsOnly").value
      };
      this.dialogRef.close(this.wordsearchFormData);
    }
  }
}

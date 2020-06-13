import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IWordSearchParams } from 'src/app/shared/word-search-form-data';
import { gridSizeValidator } from 'src/app/validators/grid-size.validator';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectWsParams } from 'src/app/store/wordsearch.selectors';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SaveWordsearchParams } from 'src/app/store/wordsearch.actions';

@Component({
  selector: 'wordsearch-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent implements OnInit {
  wordsearchFormData$: Observable<IWordSearchParams>;
  wordsearchForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>
  ) {}

  ngOnInit() {
    this.wordsearchFormData$ = this.store.select(selectWsParams).pipe(
      tap((data) => {
        this.wordsearchForm = this.fb.group({
          wordsearchSize: [data.wordsearchSize, gridSizeValidator()],
          minWordLength: [data.minWordLength],
          maxWordLength: [data.maxWordLength],
        });
      })
    );
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!(this.wordsearchForm.status === 'INVALID')) {
      this.store.dispatch(
        SaveWordsearchParams({
          wordsearchSize: this.wordsearchForm.get('wordsearchSize').value,
          minWordLength: this.wordsearchForm.get('minWordLength').value,
          maxWordLength: this.wordsearchForm.get('maxWordLength').value,
        })
      );
      this.dialogRef.close();
    }
  }
}

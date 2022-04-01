import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ClearFoundWords, FetchWordsearch } from 'src/app/store/wordsearch.actions';
import { gridSizeValidator, wordLengthValidator } from 'src/app/validators/grid-size.validator';

@Component({
  selector: 'wordsearch-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormDialogComponent implements OnInit {
  @Input() categories: string[];
  wsForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.wsForm = this.fb.group(
      {
        wordsearchSize: '10',
        minWordLength: '3',
        maxWordLength: '7',
        category: 'Animals',
      },
      { validators: [gridSizeValidator(), wordLengthValidator()], updateOn: 'blur' }
    );
  }

  onNewWordsearchBtnClicked(formGroup: FormGroup) {
    if (!(formGroup.status === 'INVALID')) {
      const { wordsearchSize, minWordLength, maxWordLength, category } = formGroup.value;
      this.store.dispatch(
        FetchWordsearch({
          wordsearchSize,
          minWordLength,
          maxWordLength,
          category,
        })
      );
      this.store.dispatch(ClearFoundWords());
    }
  }
}

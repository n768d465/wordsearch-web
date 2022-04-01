import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { WordsearchDataService } from 'src/app/services/wordsearch-data.service';
import { ClearFoundWords, FetchWordsearch } from 'src/app/store/wordsearch.actions';
import { gridSizeValidator, wordLengthValidator } from 'src/app/validators/grid-size.validator';

@Component({
  selector: 'wordsearch-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  @Input() categories: string[];
  wsForm$: { formGroup: FormGroup; categories: string[] };
  isLoading$: Observable<boolean>;
  wsForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private dataService: WordsearchDataService) {}

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
      this.store.dispatch(
        FetchWordsearch({
          wordsearchSize: formGroup.get('wordsearchSize').value,
          minWordLength: formGroup.get('minWordLength').value,
          maxWordLength: formGroup.get('maxWordLength').value,
          category: formGroup.get('category').value,
        })
      );
      this.store.dispatch(ClearFoundWords());
    }
  }
}

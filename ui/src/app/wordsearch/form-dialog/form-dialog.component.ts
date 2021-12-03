import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IWordSearchParams } from 'src/app/shared/word-search-form-data';
import { gridSizeValidator, wordLengthValidator } from 'src/app/validators/grid-size.validator';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectWsParams } from 'src/app/store/wordsearch.selectors';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FetchWordsearch, SaveWordsearchParams } from 'src/app/store/wordsearch.actions';
import { WordsearchDataService } from 'src/app/services/wordsearch-data.service';

@Component({
  selector: 'wordsearch-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  wordsearchFormData$: Observable<IWordSearchParams>;
  wordsearchForm: FormGroup;
  categories$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private dataService: WordsearchDataService
  ) { }

  ngOnInit() {
    this.wordsearchFormData$ = this.store.select(selectWsParams).pipe(
      tap(data => {
        this.wordsearchForm = this.fb.group(
          {
            wordsearchSize: [data.wordsearchSize],
            minWordLength: [data.minWordLength],
            maxWordLength: [data.maxWordLength],
            category: [data.category],
          },
          { validators: [gridSizeValidator(), wordLengthValidator()] }
        );
      })
    );

    this.categories$ = this.dataService.getCategories().pipe(
      map(categories => categories)
    );
  }

  onNewWordsearchBtnClicked() {
    if (!(this.wordsearchForm.status === 'INVALID')) {
      this.store.dispatch(
        SaveWordsearchParams({
          wordsearchSize: this.wordsearchForm.get('wordsearchSize').value,
          minWordLength: this.wordsearchForm.get('minWordLength').value,
          maxWordLength: this.wordsearchForm.get('maxWordLength').value,
          category: this.wordsearchForm.get('category').value,
        })
      );
      this.store.dispatch(FetchWordsearch())
    }
  }

}

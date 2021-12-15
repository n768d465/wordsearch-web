import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { combineLatest, Observable, throwError } from 'rxjs';
import { IWordSearchData } from 'src/app/shared/word-search-data';
import { selectWsData, selectWsParams } from '../store/wordsearch.selectors';
import { catchError, filter, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { gridSizeValidator, wordLengthValidator } from '../validators/grid-size.validator';
import { WordsearchDataService } from '../services/wordsearch-data.service';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.scss'],
})
export class WordsearchComponent implements OnInit {
  wordSearchData$: Observable<IWordSearchData>;
  wordBank: string[];
  constructor(private store: Store<AppState>, private dataService: WordsearchDataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.wordSearchData$ = combineLatest([
      this.store.select(selectWsData),
      this.store.select(selectWsParams),
      this.dataService.getCategories(),
    ]).pipe(
      filter(data => !!data),
      map(([data, params, categories]) => {
        return {
          ...data,
          categories,
          wordsearchForm: this.fb.group(
            {
              wordsearchSize: [params.wordsearchSize],
              minWordLength: [params.minWordLength],
              maxWordLength: [params.maxWordLength],
              category: [params.category],
            },
            { validators: [gridSizeValidator(), wordLengthValidator()], updateOn: 'blur' }
          ),
        };
      })
    );
  }
}

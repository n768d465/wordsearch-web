import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { WordsearchDataService } from '../services/wordsearch-data.service';
import { FetchCategories, FetchCategoriesSuccess, FetchWordsearch, FetchWordsearchSuccess } from './wordsearch.actions';

@Injectable()
export class WordsearchEffects {
  fetchWordsearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchWordsearch),
      switchMap(({ category, wordsearchSize, minWordLength, maxWordLength }) =>
        this.dataService.getWordSearch({ category, wordsearchSize, minWordLength, maxWordLength })
      ),
      map(data => FetchWordsearchSuccess(data))
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchCategories),
      switchMap(() => this.dataService.getCategories()),
      map(categories => FetchCategoriesSuccess({ categories }))
    )
  );

  constructor(private actions$: Actions, private dataService: WordsearchDataService) {}
}

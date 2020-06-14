import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { FetchWordsearch, FetchWordsearchSuccess } from './wordsearch.actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { WordsearchDataService } from '../services/wordsearch-data.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectWsParams } from './wordsearch.selectors';

@Injectable()
export class WordsearchEffects {
  fetchWordsearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchWordsearch),
      withLatestFrom(this.store.select(selectWsParams)),
      mergeMap(([action, params]) =>
        this.dataService.getWordSearch(params).pipe(
          map(data => {
            return FetchWordsearchSuccess(data);
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: WordsearchDataService,
    private store: Store<AppState>
  ) {}
}

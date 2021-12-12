import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { FetchWordsearch, FetchWordsearchSuccess, SetLoading } from './wordsearch.actions';
import { mergeMap, map, withLatestFrom, tap, switchMap, finalize, timeout, take } from 'rxjs/operators';
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
      tap(() => this.store.dispatch(SetLoading({ isLoading: true }))),
      switchMap(([, params]) => this.dataService.getWordSearch(params).pipe(map(data => FetchWordsearchSuccess(data)))),
      finalize(() => this.store.dispatch(SetLoading({ isLoading: false })))
    )
  );

  constructor(private actions$: Actions, private dataService: WordsearchDataService, private store: Store<AppState>) {}
}

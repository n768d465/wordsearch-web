import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  FetchWordsearch,
  FetchWordsearchSuccess,
  ScanFoundWord,
  SetLoading,
  WordFoundSuccess,
} from './wordsearch.actions';
import { map, withLatestFrom, tap, switchMap, finalize } from 'rxjs/operators';
import { WordsearchDataService } from '../services/wordsearch-data.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectWsData, selectWsParams } from './wordsearch.selectors';

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

  scanText$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScanFoundWord),
      withLatestFrom(this.store.select(selectWsData)),
      map(([{ elementIds, scannedText, scannedTextReversed }, { wordConfigurationData }]) => {
        const coords = elementIds.map(c => JSON.parse(c));
        const foundWord = wordConfigurationData.find(
          wordConfig => wordConfig.word === scannedText || wordConfig.word === scannedTextReversed
        );
        if (foundWord && arePositionsEqual(coords, foundWord.positions)) {
          return WordFoundSuccess({ word: foundWord.word });
        } else {
          return { type: '[Wordsearch] Found Word Failure' };
        }
      })
    )
  );

  constructor(private actions$: Actions, private dataService: WordsearchDataService, private store: Store<AppState>) {}
}

function arePositionsEqual(arr1: number[][], arr2: number[][]) {
  if (arr1.length != arr2.length) {
    return false;
  }

  return arr1.every(pos => {
    const p1 = pos[0];
    const p2 = pos[1];

    return arr2.some(pos2 => pos2[0] === p1 && pos2[1] === p2);
  });
}

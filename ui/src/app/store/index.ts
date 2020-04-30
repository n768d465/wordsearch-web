import { IWordSearchParams } from '../shared/word-search-form-data';
import { Action, createFeatureSelector, createSelector, createAction, props, createReducer, on } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { WordsearchDataService } from '../services/wordsearch-data.service';
import { AppState } from '../app.state';
import { mergeMap, map } from 'rxjs/operators';
import { IWordSearchData } from '../shared/word-search-data';
import { Injectable } from '@angular/core';

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams
}

const initialWordSearchParamsState = {
  isLoading: false,
  params: null
}

export const getWsData = createFeatureSelector<AppState, WordSearchParamsState>('wsState');
export const selectWsData = createSelector(getWsData, (data: WordSearchParamsState) => data);

export const FetchWordsearch = createAction("[Wordsearch] Fetch Wordsearch")
export const FetchWordsearchSuccess = createAction("[Wordsearch] Fetch Wordsearch Success", props<IWordSearchData>())

@Injectable()
export class WordsearchEffects {
  fetchWordsearch$ = createEffect(() => this.actions$.pipe(
    ofType(FetchWordsearch),
    mergeMap(() => this.dataService.getWordSearch({ wordsearchSize: '10', maxWordLength: '7', showWordsOnly: false }).pipe(
      map(data => ({ type: '[Wordsearch] Fetch Wordsearch Success', payload: data }))
    ))
  ));

  constructor(private actions$: Actions, private dataService: WordsearchDataService) { }
}

export const wordsearchReducer = createReducer(
  initialWordSearchParamsState,
  on(FetchWordsearchSuccess, (state, payload) => {
    return {
      ...state,
      payload
    }
  })
)
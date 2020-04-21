import { IWordSearchParams } from '../shared/word-search-form-data';
import { Action } from '@ngrx/store';

export enum WordsearchActionTypes {
  FetchWordsearch = "[Wordsearch] Fetch Wordsearch",
  FetchWordsearchSuccess = "[Wordsearch] Fetch Wordsearch Success",
  FetchWordsearchFailure = "[Wordsearch] Fetch Wordsearch Failure"
}

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams
}

const initialWordSearchParamsState = {
  isLoading: false,
  params: null
}

export class FetchWordsearch implements Action {
  readonly type = WordsearchActionTypes.FetchWordsearch
}

export class FetchWordsearchSuccess implements Action {
  readonly type = WordsearchActionTypes.FetchWordsearchSuccess

  constructor(readonly payload: { wsParams: IWordSearchParams }) { }
}

export class FetchWordsearchFailure implements Action {
  readonly type = WordsearchActionTypes.FetchWordsearchFailure

  constructor(readonly payload: { error: string }) { }
}

export type WordsearchActions = FetchWordsearch | FetchWordsearchSuccess | FetchWordsearchFailure;

export function wordsearchReducer(state: WordSearchParamsState = initialWordSearchParamsState, action: WordsearchActions) {
  switch (action.type) {
    case WordsearchActionTypes.FetchWordsearch:
    case WordsearchActionTypes.FetchWordsearchSuccess:
    case WordsearchActionTypes.FetchWordsearchFailure:
      break;
    default:
      break;
  }
}
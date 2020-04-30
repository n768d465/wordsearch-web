import { createAction, props } from '@ngrx/store';
import { IWordSearchData } from '../shared/word-search-data'

export const FetchWordsearch = createAction("[Wordsearch] Fetch Wordsearch")
export const FetchWordsearchSuccess = createAction("[Wordsearch] Fetch Wordsearch Success", props<IWordSearchData>())
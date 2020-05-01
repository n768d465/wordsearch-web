import { createAction, props } from '@ngrx/store';
import { IWordSearchData } from '../shared/word-search-data'
import { IWordSearchParams } from '../shared/word-search-form-data';

export const FetchWordsearch = createAction("[Wordsearch] Fetch Wordsearch")
export const FetchWordsearchSuccess = createAction("[Wordsearch] Fetch Wordsearch Success", props<IWordSearchData>())
export const showWordsOnlyCheckboxToggled = createAction("[Wordsearch] Show Words Only Checkbox Toggled", props<{ showWordsOnly: boolean }>());
export const SaveWordsearchParams = createAction("[Wordsearch] Save Wordsearch Params", props<IWordSearchParams>())
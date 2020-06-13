import { createAction, props } from '@ngrx/store';
import { IWordSearchData } from '../shared/word-search-data';
import { IWordSearchParams } from '../shared/word-search-form-data';

export const FetchWordsearch = createAction('[Wordsearch] Fetch Wordsearch');
export const FetchWordsearchSuccess = createAction(
  '[Wordsearch] Fetch Wordsearch Success',
  props<IWordSearchData>()
);
export const SaveWordsearchParams = createAction(
  '[Wordsearch] Save Wordsearch Params',
  props<IWordSearchParams>()
);
export const MouseHoveredOnWord = createAction(
  '[Wordsearch] Mouse Hovered on Word',
  props<{ word: string }>()
);
export const MouseLeaveOnWord = createAction(
  '[Wordsearch] Mouse Leave on Word'
);

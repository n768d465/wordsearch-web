import { createAction, props } from '@ngrx/store';
import { IWordSearchData } from '../shared/word-search-data';
import { IWordSearchParams } from '../shared/word-search-form-data';

export const FetchWordsearch = createAction('[Wordsearch] Fetch Wordsearch', props<IWordSearchParams>());
export const FetchWordsearchSuccess = createAction('[Wordsearch] Fetch Wordsearch Success', props<IWordSearchData>());
export const FetchCategories = createAction('[Wordsearch] Fetch Categories');
export const FetchCategoriesSuccess = createAction(
  '[Wordsearch] Fetch Categories Success',
  props<{ categories: string[] }>()
);
export const SaveWordsearchParams = createAction('[Wordsearch] Save Wordsearch Params', props<IWordSearchParams>());
export const MouseHoveredOnWord = createAction('[Wordsearch] Mouse Hovered on Word', props<{ word: string }>());
export const MouseLeaveOnWord = createAction('[Wordsearch] Mouse Leave on Word', props<{ word: string }>());
export const SetLoading = createAction('[Wordsearch] Set Loading', props<{ isLoading: boolean }>());

export const ScanFoundWord = createAction(
  '[Wordsearch] Scan Found Word',
  props<{ elementIds: string[]; scannedText: string; scannedTextReversed: string }>()
);
export const WordFoundSuccess = createAction('[Wordsearch] Word Found Success', props<{ word: string }>());
export const ClearFoundWords = createAction('[Wordsearch] Clear Found Words');

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { WordSearchParamsState } from './wordsearch.state';
import { IWordSearchData } from '../shared/word-search-data';

export const selectWordsearchState = createFeatureSelector<WordSearchParamsState>('wsState');
export const selectWsData = createSelector(selectWordsearchState, (state: WordSearchParamsState) => state.data);
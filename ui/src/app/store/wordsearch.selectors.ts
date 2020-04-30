import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { WordSearchParamsState } from './wordsearch.state';

export const getWsData = createFeatureSelector<AppState, WordSearchParamsState>('wsState');
export const selectWsData = createSelector(getWsData, (data: WordSearchParamsState) => data);
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WordSearchState } from './wordsearch.state';

export const selectWordsearchState = createFeatureSelector<WordSearchState>('wsState');
export const selectLoading = createSelector(selectWordsearchState, (state: WordSearchState) => state.isLoading);
export const selectWsData = createSelector(selectWordsearchState, (state: WordSearchState) => state.data);
export const selectWsCategories = createSelector(selectWordsearchState, (state: WordSearchState) => state.categories);
export const selectHoveredWord = createSelector(selectWordsearchState, (state: WordSearchState) => state.hoveredWord);

export const selectFoundWords = createSelector(selectWordsearchState, (state: WordSearchState) => state.foundWords);

export const selectAllData = createSelector(selectWsData, selectWsCategories, (wsData, wsCategories) => {
  return {
    wsData,
    wsCategories: wsCategories?.categories ?? null,
  };
});

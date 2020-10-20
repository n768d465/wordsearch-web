import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WordSearchParamsState } from './wordsearch.state';

export const selectWordsearchState = createFeatureSelector<WordSearchParamsState>('wsState');
export const selectLoading = createSelector(selectWordsearchState, (state: WordSearchParamsState) => state.isLoading);
export const selectWsData = createSelector(selectWordsearchState, (state: WordSearchParamsState) => state.data);
export const selectHoveredWord = createSelector(
  selectWordsearchState,
  (state: WordSearchParamsState) => state.hoveredWord
);
export const selectWsParams = createSelector(selectWordsearchState, (state: WordSearchParamsState) => state.params);

export const selectSelectedGridItems = createSelector(
  selectWordsearchState,
  (state: WordSearchParamsState) => state.selectedGridItems
);

export const selectHighlightedPositions = createSelector(
  selectWordsearchState,
  (state: WordSearchParamsState) => state.highlightedPositions
);

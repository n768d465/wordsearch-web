import { createReducer, on, Action } from '@ngrx/store';
import {
  FetchWordsearchSuccess,
  FetchWordsearch,
  SaveWordsearchParams,
  MouseHoveredOnWord,
  MouseLeaveOnWord,
  GridItemsSelected,
  AddHighlightedGriditems,
} from './wordsearch.actions';
import { initialWordSearchParamsState, WordSearchParamsState } from './wordsearch.state';
import _ from 'lodash';

const reducer = createReducer(
  initialWordSearchParamsState,
  on(FetchWordsearch, (state, payload) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(FetchWordsearchSuccess, (state, payload) => {
    return {
      ...state,
      isLoading: false,
      data: payload,
    };
  }),
  on(SaveWordsearchParams, (state, params) => {
    return { ...state, params };
  }),
  on(MouseHoveredOnWord, (state, payload) => {
    const wordData = state.data.wordConfigurationData.find(w => payload.word === w.word);
    return {
      ...state,
      hoveredWord: wordData
    };
  }),
  on(MouseLeaveOnWord, (state, payload) => {
    return { ...state, hoveredWord: null};
  }),
  on(GridItemsSelected, (state, payload) => {
    return { ...state, selectedGridItems: payload.text };
  }),
  on(AddHighlightedGriditems, (state, payload) => {
    const wordData = state.data.wordConfigurationData.find(w => payload.word === w.word);
    const positions = wordData.positions;
    const highlightedPositions = [...state.highlightedPositions, ...positions];
    return {
      ...state,
      highlightedPositions,
    };
  })
);

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
  return reducer(state, action);
}

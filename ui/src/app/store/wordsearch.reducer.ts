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
    const positions = wordData.positions[0];
    const highlightedPositions = [...state.highlightedPositions, positions];
    return {
      ...state,
      hoveredWord: { word: payload.word, coordinates: wordData.positions },
      highlightedPositions,
    };
  }),
  on(MouseLeaveOnWord, (state, payload) => {
    const wordData = state.data.wordConfigurationData.find(w => payload.word === w.word);
    const positions = wordData.positions[0];
    const newPositions = _.filter(state.highlightedPositions, pos => !_.isEqual(pos, positions));
    return { ...state, hoveredWord: { word: '', coordinates: [] }, highlightedPositions: newPositions };
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

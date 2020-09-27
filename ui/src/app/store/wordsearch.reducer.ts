import { createReducer, on, Action } from '@ngrx/store';
import {
  FetchWordsearchSuccess,
  FetchWordsearch,
  SaveWordsearchParams,
  MouseHoveredOnWord,
  MouseLeaveOnWord,
  GridItemsSelected,
} from './wordsearch.actions';
import { initialWordSearchParamsState, WordSearchParamsState } from './wordsearch.state';

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
    const coordinates = state.data.wordConfigurationData.find(w => payload.word === w.word);
    return {
      ...state,
      hoveredWord: { word: payload.word, coordinates: coordinates.positions },
    };
  }),
  on(MouseLeaveOnWord, state => {
    return { ...state, hoveredWord: { word: '', coordinates: [] } };
  }),
  on(GridItemsSelected, (state, payload) => {
    return { ...state, selectedGridItems: payload.text };
  })
);

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
  return reducer(state, action);
}

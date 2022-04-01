import { Action, createReducer, on } from '@ngrx/store';
import {
  ClearFoundWords,
  FetchCategoriesSuccess,
  FetchWordsearch,
  FetchWordsearchSuccess,
  MouseHoveredOnWord,
  MouseLeaveOnWord,
  SaveWordsearchParams,
  SetLoading,
  WordFoundSuccess,
} from './wordsearch.actions';
import { initialWordSearchState, WordSearchState } from './wordsearch.state';

const reducer = createReducer(
  initialWordSearchState,
  on(FetchWordsearch, (state, payload) => {
    return {
      ...state,
      isLoading: true,
      hoveredWord: null,
      foundWords: new Set(),
    };
  }),
  on(FetchWordsearchSuccess, (state, payload) => {
    return {
      ...state,
      isLoading: false,
      data: { ...state.data, grid: payload.grid, wordConfigurationData: payload.wordConfigurationData },
      hoveredWord: null,
      foundWords: new Set(),
    };
  }),
  on(FetchCategoriesSuccess, (state, payload) => {
    return {
      ...state,
      categories: payload.categories,
    };
  }),
  on(SetLoading, (state, payload) => {
    return {
      ...state,
      isLoading: payload.isLoading,
    };
  }),
  on(SaveWordsearchParams, (state, params) => {
    return { ...state, params };
  }),
  on(MouseHoveredOnWord, (state, payload) => {
    return {
      ...state,
      hoveredWord: { config: payload.word, mouseLeave: false },
    };
  }),
  on(MouseLeaveOnWord, (state, payload) => {
    return { ...state, hoveredWord: { config: payload.word, mouseLeave: true } };
  }),
  on(WordFoundSuccess, (state, payload) => {
    return { ...state, foundWords: new Set([...state.foundWords, payload.word]) };
  }),
  on(ClearFoundWords, state => {
    return { ...state, foundWords: new Set() };
  })
);

export function wordsearchReducer(state: WordSearchState, action: Action) {
  return reducer(state, action);
}

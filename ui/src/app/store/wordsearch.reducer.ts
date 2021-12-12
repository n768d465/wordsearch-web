import { createReducer, on, Action } from '@ngrx/store';
import {
  FetchWordsearchSuccess,
  FetchWordsearch,
  SaveWordsearchParams,
  MouseHoveredOnWord,
  MouseLeaveOnWord,
  WordFoundSuccess,
  ClearFoundWords,
  SetLoading,
} from './wordsearch.actions';
import { initialWordSearchParamsState, WordSearchParamsState } from './wordsearch.state';

const reducer = createReducer(
  initialWordSearchParamsState,
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
      data: payload,
      hoveredWord: null,
      foundWords: new Set(),
    };
  }),
  on(SetLoading, (state, payload) => {
    return {
      ...state,
      isLoading: payload.isLoading
    }
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

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
  return reducer(state, action);
}


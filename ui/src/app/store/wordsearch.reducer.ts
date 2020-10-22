import { createReducer, on, Action } from '@ngrx/store';
import {
  FetchWordsearchSuccess,
  FetchWordsearch,
  SaveWordsearchParams,
  MouseHoveredOnWord,
  MouseLeaveOnWord,
  WordFoundSuccess,
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
    const wordData = state.data.wordConfigurationData.find(w => payload.word === w.word);
    return {
      ...state,
      hoveredWord: wordData
    };
  }),
  on(MouseLeaveOnWord, (state, payload) => {
    return { ...state, hoveredWord: null};
  }),
  on(WordFoundSuccess, (state, payload) => {
    return {...state, foundWords: [...state.foundWords, payload.word]}
  })
);

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
  return reducer(state, action);
}

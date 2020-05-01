import { createReducer, on, Action } from '@ngrx/store'
import { FetchWordsearchSuccess, FetchWordsearch, showWordsOnlyCheckboxToggled, SaveWordsearchParams } from './wordsearch.actions'
import { initialWordSearchParamsState, WordSearchParamsState } from './wordsearch.state'

const reducer = createReducer(
    initialWordSearchParamsState,
    on(FetchWordsearch, (state, payload) => {
        return {
            ...state,
            isLoading: true,
        }
    }),
    on(FetchWordsearchSuccess, (state, payload) => {
        return {
            ...state,
            isLoading: false,
            data: payload
        }
    }),
    on(showWordsOnlyCheckboxToggled, (state, payload) => {
        return { ...state, showWordsOnly: payload.showWordsOnly }
    }),
    on(SaveWordsearchParams, (state, params) => {
        return { ...state, params }
    })
)

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
    return reducer(state, action);
}
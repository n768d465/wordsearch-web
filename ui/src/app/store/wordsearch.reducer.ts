import { createReducer, on, Action } from '@ngrx/store'
import { FetchWordsearchSuccess } from './wordsearch.actions'
import { initialWordSearchParamsState, WordSearchParamsState } from './wordsearch.state'

const reducer = createReducer(
    initialWordSearchParamsState,
    on(FetchWordsearchSuccess, (state, payload) => {
        return {
            ...state,
            data: payload
        }
    })
)

export function wordsearchReducer(state: WordSearchParamsState, action: Action) {
    return reducer(state, action);
}
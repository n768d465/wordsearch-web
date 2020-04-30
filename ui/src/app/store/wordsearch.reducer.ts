import { createReducer, on } from '@ngrx/store'
import { FetchWordsearchSuccess } from './wordsearch.actions'
import { initialWordSearchParamsState } from './wordsearch.state'

export const wordsearchReducer = createReducer(
    initialWordSearchParamsState,
    on(FetchWordsearchSuccess, (state, payload) => {
        return {
            ...state,
            payload
        }
    })
)
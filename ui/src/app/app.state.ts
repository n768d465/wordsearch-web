import { IWordSearchParams } from './shared/word-search-form-data';
import { WordSearchParamsState } from './store/wordsearch.state';

export interface AppState {
    wsState: WordSearchParamsState
}
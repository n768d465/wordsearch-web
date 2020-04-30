import { IWordSearchParams } from './shared/word-search-form-data';
import { WordSearchParamsState } from './store';

export interface AppState {
    wsState: WordSearchParamsState
}
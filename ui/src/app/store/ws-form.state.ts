import { IWordSearchParams } from '../shared/word-search-form-data';

export interface WordSearchParamsState {
    isLoading: boolean;
    params: IWordSearchParams
}

const initialWordSearchParamsState = {
    isLoading: false,
    params: null
}
import { IWordSearchParams } from '../shared/word-search-form-data';

export interface WordSearchParamsState {
    isLoading: boolean;
    params: IWordSearchParams
}

export const initialWordSearchParamsState = {
    isLoading: false,
    params: null
}
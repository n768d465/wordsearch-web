import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData } from '../shared/word-search-data';

export interface WordSearchParamsState {
    isLoading: boolean;
    params: IWordSearchParams
    data: IWordSearchData
}

export const initialWordSearchParamsState = {
    isLoading: false,
    params: null,
    data: null
}
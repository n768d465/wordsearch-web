import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData } from '../shared/word-search-data';

export interface WordSearchParamsState {
    isLoading: boolean;
    params: IWordSearchParams
    data: IWordSearchData
    hoveredWord: { word: string, coordinates: number[][] }
}

export const initialWordSearchParamsState = {
    isLoading: false,
    params: { maxWordLength: "7", wordsearchSize: "10" },
    data: null,
    hoveredWord: { word: '', coordinates: [] }
}
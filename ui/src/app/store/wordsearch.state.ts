import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData, IWordConfiguration } from '../shared/word-search-data';
import { ElementRef } from '@angular/core';

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams;
  data: IWordSearchData;
  hoveredWord: IWordConfiguration;
  foundWords: string[]
}

export const initialWordSearchParamsState = {
  isLoading: false,
  params: null,
  data: null,
  hoveredWord: null,
  foundWords: []
};

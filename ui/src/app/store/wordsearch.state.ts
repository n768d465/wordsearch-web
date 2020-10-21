import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData, IHoveredWord, IWordConfiguration } from '../shared/word-search-data';

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams;
  data: IWordSearchData;
  hoveredWord: IWordConfiguration;
  selectedGridItems: string;
  highlightedPositions: string[];
}

export const initialWordSearchParamsState = {
  isLoading: false,
  params: null,
  data: null,
  hoveredWord: null,
  selectedGridItems: '',
  highlightedPositions: [],
};

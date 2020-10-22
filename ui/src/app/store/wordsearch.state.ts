import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData, IWordConfiguration, IHoveredWord } from '../shared/word-search-data';

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams;
  data: IWordSearchData;
  hoveredWord: IHoveredWord;
  foundWords: string[];
}

export const initialWordSearchParamsState = {
  isLoading: false,
  params: null,
  data: null,
  hoveredWord: null,
  foundWords: [],
};

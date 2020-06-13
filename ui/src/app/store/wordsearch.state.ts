import { IWordSearchParams } from '../shared/word-search-form-data';
import { IWordSearchData, IHoveredWord } from '../shared/word-search-data';

export interface WordSearchParamsState {
  isLoading: boolean;
  params: IWordSearchParams;
  data: IWordSearchData;
  hoveredWord: IHoveredWord;
}

export const initialWordSearchParamsState = {
  isLoading: false,
  params: null,
  data: null,
  hoveredWord: null,
};

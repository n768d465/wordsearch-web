import { IHoveredWord, IWordSearchData } from '../shared/word-search-data';
import { IWordSearchParams } from '../shared/word-search-form-data';

export interface WordSearchState {
  isLoading: boolean;
  params: IWordSearchParams;
  data: IWordSearchData;
  categories: string[];
  hoveredWord: IHoveredWord;
  foundWords: Set<string>;
}

export const initialWordSearchState = {
  isLoading: false,
  params: null,
  categories: null,
  data: null,
  hoveredWord: null,
  foundWords: null,
};

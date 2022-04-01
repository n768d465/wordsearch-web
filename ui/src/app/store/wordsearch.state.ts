import { IHoveredWord, IWordSearchData } from '../models/word-search-data';
import { IWordSearchParams } from '../models/word-search-form-data';

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

import { IWordSearchParams } from './word-search-form-data';

export interface IWordSearchData {
  currentCategory: string;
  grid: string[][];
  wordBank: string[];
  gridWordsOnly: string[][];
  wordConfigurationData: IWordConfiguration[];
}

export interface IWordConfiguration {
  word: string;
  reversed: boolean;
  positions: number[][];
}

export interface IHoveredWord {
  config: IWordConfiguration,
  mouseLeave: boolean
}

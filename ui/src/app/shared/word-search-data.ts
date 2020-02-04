export interface IWordSearchData {
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

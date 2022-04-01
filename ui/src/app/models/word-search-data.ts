export interface IWordSearchData {
  grid: string[][];
  wordConfigurationData: IWordConfiguration[];
}

export interface IWordConfiguration {
  word: string;
  positions: number[][];
}

export interface IScannedText {
  elementIds: string[];
  scannedText: string;
  scannedTextReversed: string;
}

export interface IHoveredWord {
  config: IWordConfiguration;
  mouseLeave: boolean;
}

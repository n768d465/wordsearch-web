export interface IWordSearchData {
  grid: string[][];
  wordConfigurationData: IWordConfiguration[];
}

export interface IWordConfiguration {
  word: string;
  positions: number[][];
}

export interface IHoveredWord {
  config: IWordConfiguration;
  mouseLeave: boolean;
}

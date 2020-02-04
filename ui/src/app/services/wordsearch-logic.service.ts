import { Injectable } from "@angular/core";
import { WordsearchDataService } from "./wordsearch-data.service";
import { IWordSearchFormData } from "../shared/word-search-form-data";
import { Observable } from "rxjs";
import {
  IWordSearchData,
  IWordConfiguration
} from "../shared/word-search-data";
import { map, finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WordsearchLogicService {
  constructor(private dataService: WordsearchDataService) {}
  isLoading = false;
  buildWordSearch(formData: IWordSearchFormData): Observable<IWordSearchData> {
    this.isLoading = true;
    return this.dataService.getWordSearch(formData).pipe(
      map(data => {
        return {
          grid: data.grid,
          gridWordsOnly: data.gridWordsOnly,
          wordBank: data.wordBank,
          wordConfigurationData: data.wordConfigurationData
        };
      }),
      finalize(() => (this.isLoading = false))
    );
  }

  setGrid(wordsearchData, showWordsOnly): string[][] {
    return showWordsOnly ? wordsearchData.gridWordsOnly : wordsearchData.grid;
  }

  getHoveredWord(
    configurationData: IWordConfiguration[],
    word: string
  ): IWordConfiguration {
    return configurationData.find(configItem => configItem.word === word);
  }

  setBorderColor(positions: any, refs: any) {
    if (positions) {
      positions.map(coords => {
        const i = coords[0];
        const j = coords[1];
        const ref = refs.find(item => item.nativeElement.id === `${i}_${j}`);
        ref.nativeElement.style.borderColor = "#304ffe";
      });
    } else {
      refs.map(ele => (ele.nativeElement.style.borderColor = "white"));
    }
  }

  computeCellHeight = (grid: string[][]): number => 100 / grid.length;
}

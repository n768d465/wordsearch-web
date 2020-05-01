import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  IWordSearchData,
} from "../shared/word-search-data";
import { map } from "rxjs/operators";
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectWsData, selectHoveredWord } from '../store/wordsearch.selectors';

@Injectable({
  providedIn: "root"
})
export class WordsearchLogicService {
  constructor(private store: Store<AppState>) { }

  buildWordSearch(): Observable<IWordSearchData> {
    return this.store.select(selectWsData).pipe(
      map(data => {
        if (data) {
          return {
            grid: data.grid,
            gridWordsOnly: data.gridWordsOnly,
            wordBank: data.wordBank,
            wordConfigurationData: data.wordConfigurationData,
          }
        }
      }),
    );
  }

  getHighlightedWord() {
    console.log('abc')
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

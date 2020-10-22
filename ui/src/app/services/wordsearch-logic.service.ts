import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { IWordSearchData } from '../shared/word-search-data';
import { map, filter } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectWsData, selectWsParams } from '../store/wordsearch.selectors';
import { BorderColors } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WordsearchLogicService {
  constructor(private store: Store<AppState>) {}

  buildWordSearch(): Observable<IWordSearchData> {
    return this.store.select(selectWsData).pipe(
      filter(data => !!data),
      map(data => {
        return {
          grid: data.grid,
          gridWordsOnly: data.gridWordsOnly,
          wordBank: data.wordBank,
          wordConfigurationData: data.wordConfigurationData,
          currentCategory: data.currentCategory,
        };
      })
    );
  }

  setBorderColors(coords: number[][], refs: ElementRef[], borderColor: BorderColors) {
    if (coords?.length && refs?.length) {
      const ref = refs.find(item => item.nativeElement.id === `(${coords[0]},${coords[1]})`);
      this.setBorderColor(ref, borderColor);
    }
  }

  setBorderByElementRef(refs: any[], borderColor: BorderColors) {
    refs.forEach(ref => this.setBorderColor(ref, borderColor));
  }

  setBorderColor(ref: ElementRef, borderColor: BorderColors) {
    ref.nativeElement.style.borderColor = borderColor;
  }

  computeCellHeight = (grid: string[][]): number => 100 / grid.length;
}

import { Component, Input, SimpleChanges, ViewChildren, QueryList, ElementRef, OnChanges, OnInit } from '@angular/core';
import { WordsearchLogicService } from 'src/app/services/wordsearch-logic.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading, selectHoveredWord } from 'src/app/store/wordsearch.selectors';
import { tap, map } from 'rxjs/operators';
import { IHoveredWord } from 'src/app/shared/word-search-data';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() gridData: string[][];
  isLoading$: Observable<boolean>;
  cellHeight: number;

  @ViewChildren('letters') letters: QueryList<ElementRef>;

  constructor(private logicService: WordsearchLogicService, private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .select(selectHoveredWord)
      .pipe(
        map((highlightedWord: IHoveredWord) => (highlightedWord ? highlightedWord.coordinates : [])),
        tap((coordinaties: number[][]) => {
          this.setBorderColor(coordinaties);
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.gridData?.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(changes.gridData.currentValue);
    }
  }

  setBorderColor = positions => {
    const letters: ElementRef<string>[] = this.letters?.toArray() ?? [];
    this.logicService.setBorderColor(positions, letters);
  };
}

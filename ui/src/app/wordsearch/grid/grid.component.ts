import {
  Component,
  Input,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { WordsearchLogicService } from 'src/app/services/wordsearch-logic.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectLoading,
  selectHoveredWord,
} from 'src/app/store/wordsearch.selectors';
import { tap } from 'rxjs/operators';
import { IHoveredWord } from 'src/app/shared/word-search-data';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() gridData: string[][];
  isLoading$: Observable<boolean>;
  cellHeight: any;

  @ViewChildren('letters') letters: QueryList<ElementRef>;

  constructor(
    private logicService: WordsearchLogicService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .select(selectHoveredWord)
      .pipe(
        tap((highlightedWord: IHoveredWord) => {
          if (highlightedWord?.coordinates.length) {
            this.setBorderColor(highlightedWord.coordinates);
          } else {
            this.setBorderColor(null);
          }
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.gridData?.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(
        changes.gridData.currentValue
      );
    }
  }

  setBorderColor = positions => {
    if (this.letters) {
      this.logicService.setBorderColor(positions, this.letters.toArray());
    }
  };
}

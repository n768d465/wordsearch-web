import {
  Component,
  Input,
  ViewChildren,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WordsearchLogicService } from 'src/app/services/wordsearch-logic.service';
import { AppState } from 'src/app/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading, selectHoveredWord, selectWsData } from 'src/app/store/wordsearch.selectors';
import { tap, map, filter } from 'rxjs/operators';
import { IHoveredWord } from 'src/app/shared/word-search-data';
import { WordFoundSuccess } from 'src/app/store/wordsearch.actions';
import { BorderColors } from 'src/app/shared/constants';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() gridData: string[][];
  isLoading$: Observable<boolean>;
  cellHeight: number;

  @ViewChild('draggable') draggable: ElementRef;
  @ViewChildren('letters') letters;

  constructor(private logicService: WordsearchLogicService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .pipe(
        select(selectHoveredWord),
        filter(highlightedWord => !!highlightedWord),
        map((highlightedWord: IHoveredWord) => {
          let coordinates = highlightedWord.config.positions[0];
          if (highlightedWord.config.positions && highlightedWord.config.reversed) {
            coordinates = highlightedWord.config.positions[highlightedWord.config.positions.length - 1];
          }
          if (highlightedWord.mouseLeave) {
            this.setBorderColors(coordinates, BorderColors.Default);
          } else {
            this.setBorderColors(coordinates, BorderColors.Highlighted);
          }
        })
      )
      .subscribe();
  }

  handleRendering(result: { refs: ElementRef[]; text: string }): void {
    this.store
      .select(selectWsData)
      .pipe(
        map(params => params.wordBank),
        map(wordBank => {
          const found = wordBank.includes(result.text);
          if (!found) {
            this.logicService.setBorderByElementRef(result.refs, BorderColors.Default);
          }
          return found;
        }),
        filter(found => found),
        tap(() => this.store.dispatch(WordFoundSuccess({ word: result.text })))
      )
      .subscribe();
  }

  setBorderColors(positions, color: BorderColors) {
    const letters: ElementRef<string>[] = this.letters?.toArray() ?? [];
    this.logicService.setBorderColors(positions, letters, color);
  }
}

import {
  Component,
  Input,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { WordsearchLogicService } from 'src/app/services/wordsearch-logic.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { selectLoading, selectHoveredWord } from 'src/app/store/wordsearch.selectors';
import { tap, map, takeUntil, switchMap, distinct, distinctUntilChanged, filter, reduce, scan, mergeMap } from 'rxjs/operators';
import { IHoveredWord, IWordConfiguration } from 'src/app/shared/word-search-data';
import { GridItemsSelected } from 'src/app/store/wordsearch.actions';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() gridData: string[][];
  isLoading$: Observable<boolean>;
  cellHeight: number;

  @ViewChild('draggable') draggable: ElementRef;
  @ViewChildren('letters') letters;

  constructor(private logicService: WordsearchLogicService, private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .select(selectHoveredWord)
      .pipe(
        map((highlightedWord: IWordConfiguration) => { 
          if(highlightedWord?.positions && highlightedWord?.reversed) {
            return highlightedWord.positions[highlightedWord.positions.length - 1]
          }

          return highlightedWord?.positions[0] ?? []
        }),
        tap((coordinaties: number[]) => {
          this.setBorderColors(coordinaties);
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent(this.draggable.nativeElement, 'mousedown')
      .pipe(
        switchMap(() => {
          return fromEvent(this.draggable.nativeElement, 'mousemove').pipe(
            distinct((e: MouseEvent) => e.target['id']),
            filter(e => !!e.target['id']),
            tap((e: MouseEvent) => {
              const ref = this.letters.toArray().find(item => item.nativeElement.id === e.target['id'])
              this.logicService.setBorderColor(ref);
            }),
            map(e => e.target['innerText']),
            scan((acc, cur) => acc + cur),
            takeUntil(fromEvent(this.draggable.nativeElement, 'mouseup')),
          );
        }),
        switchMap(res => {
          return fromEvent(this.draggable.nativeElement, 'mouseup').pipe(
            tap(() => console.log('Mouse up: ', res))
          )
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.gridData?.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(changes.gridData.currentValue);
    }
  }

  setBorderColors = positions => {
    const letters: ElementRef<string>[] = this.letters?.toArray() ?? [];
    this.logicService.setBorderColors(positions, letters);
  };
}

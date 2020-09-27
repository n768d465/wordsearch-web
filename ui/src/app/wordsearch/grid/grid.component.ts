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
import { tap, map, takeUntil, switchMap, distinct, distinctUntilChanged, filter } from 'rxjs/operators';
import { IHoveredWord } from 'src/app/shared/word-search-data';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() gridData: string[][];
  isLoading$: Observable<boolean>;
  cellHeight: number;
  path: string = '';

  @ViewChild('draggable') draggable: ElementRef;
  @ViewChildren('letters') letters;

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

  ngAfterViewInit() {
    fromEvent(this.draggable.nativeElement, 'mousedown')
      .pipe(
        switchMap((e: MouseEvent) => {
          return fromEvent(this.draggable.nativeElement, 'mousemove').pipe(
            takeUntil(
              fromEvent(this.draggable.nativeElement, 'mouseup').pipe(
                tap(() => {
                  console.log(this.path);
                  this.path = '';
                  this.setBorderColor([]);
                })
              )
            ),
            takeUntil(fromEvent(this.draggable.nativeElement, 'mouseleave').pipe(tap(() => (this.path = '')))),
            distinct((e: MouseEvent) => e.target['id']),
            filter(e => !!e.target['id']),
            tap((e: MouseEvent) => (e.target['style'].borderColor = 'blue'))
          );
        }),
        tap(e => {
          this.path += e.target['innerText'];
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

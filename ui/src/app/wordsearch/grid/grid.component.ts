import {
  Component,
  Input,
  SimpleChanges,
  ViewChildren,
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
import { selectLoading, selectHoveredWord, selectWsData } from 'src/app/store/wordsearch.selectors';
import { tap, map, takeUntil, switchMap, distinct, filter, scan } from 'rxjs/operators';
import { IWordConfiguration } from 'src/app/shared/word-search-data';
import { WordFoundSuccess } from 'src/app/store/wordsearch.actions';
import { BorderColors } from 'src/app/shared/constants';

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
          this.setBorderColors(coordinaties, BorderColors.Highlighted);
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
            map((e: MouseEvent) => {
              const ref = this.letters.toArray().find(item => item.nativeElement.id === e.target['id'])
              this.logicService.setBorderColor(ref, BorderColors.Highlighted);
              return {refs: [ref], text: e.target['innerText']}
            }),
            scan((acc, cur) => ({refs: [...acc.refs, ...cur.refs], text: acc.text + cur.text})),
            takeUntil(fromEvent(this.draggable.nativeElement, 'mouseup')),
          );
        }),
        switchMap(text => {
          return fromEvent(this.draggable.nativeElement, 'mouseup').pipe(
            tap(() => this.handleRendering(text))
          )
        })
      )
      .subscribe();
  }

  handleRendering(result: any): void {
    this.store.select(selectWsData).pipe(
      // map(params => params.wordBank),
      map(data => {
        const found = data.wordBank.includes(result.text) ? BorderColors.Highlighted : BorderColors.Default;
        this.logicService.setBorderByElementRef(result.refs, found);
        if(data.wordBank.includes(result.text)){
          console.log(result);
          this.store.dispatch(WordFoundSuccess({word: result.text}))
        }
      }),
    )
    .subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.gridData?.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(changes.gridData.currentValue);
    }
  }

  setBorderColors(positions, color: BorderColors) {
    const letters: ElementRef<string>[] = this.letters?.toArray() ?? [];
    this.logicService.setBorderColors(positions, letters, color);
  };
}

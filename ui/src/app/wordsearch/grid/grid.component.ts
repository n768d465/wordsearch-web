import {
  Component,
  Input,
  ViewChildren,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  QueryList,
} from '@angular/core';
import { AppState } from 'src/app/app.state';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { selectLoading, selectHoveredWord, selectWsData } from 'src/app/store/wordsearch.selectors';
import {
  tap,
  filter,
  takeUntil,
  switchMap,
  distinct,
  scan,
  map,
  mapTo,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import { IScannedText, IHoveredWord } from 'src/app/shared/word-search-data';
import { ScanFoundWord } from 'src/app/store/wordsearch.actions';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() gridData: string[][];
  @ViewChild('draggable') draggable;
  @ViewChildren('letters') letters: QueryList<ElementRef>;

  isLoading$: Observable<boolean>;
  foundWord$ = new Subject<IScannedText>();

  constructor(private store: Store<AppState>, private renderer: Renderer2) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .pipe(
        select(selectHoveredWord),
        filter(highlightedWord => !!highlightedWord?.config),
        tap((highlightedWord: IHoveredWord) => {
          let coordinates = highlightedWord.config.positions;
          if (highlightedWord.mouseLeave) {
            this.applyRender(coordinates, (el: any) => {
              this.renderer.removeClass(el, 'text-warning');
              this.renderer.addClass(el, 'text-white');
            });
          } else {
            this.applyRender(coordinates, (el: any) => {
              this.renderer.addClass(el, 'text-warning');
              this.renderer.removeClass(el, 'text-white');
            });
          }
        })
      )
      .subscribe();

    this.foundWord$
      .pipe(
        withLatestFrom(this.store.select(selectWsData)),
        tap(([foundWordData, wsData]) => {
          const bank = wsData.wordConfigurationData.map(w => w.word);
          if (!bank.some(w => w === foundWordData.scannedText || w === foundWordData.scannedTextReversed)) {
            const coords = foundWordData.elementIds.map(coords => JSON.parse(coords));
            this.applyRender(coords, (el: any) => {
              this.renderer.removeClass(el, 'text-info');
              this.renderer.addClass(el, 'text-white');
            });
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent(this.draggable.nativeElement, 'mousedown')
      .pipe(
        switchMap(() =>
          fromEvent(
            this.letters.toArray().map(ref => ref.nativeElement),
            'mousemove'
          ).pipe(
            distinct((e: MouseEvent) => e.target['id']),
            tap(e => this.renderer.addClass(e.target, 'text-info')),
            map(e => ({ elementIds: [e.target['id']], scannedText: e.target['innerText'] })),
            scan((acc, cur) => ({
              elementIds: [...acc.elementIds, ...cur.elementIds],
              scannedText: acc.scannedText + cur.scannedText,
            })),
            takeUntil(fromEvent(this.draggable.nativeElement, 'mouseup'))
          )
        ),
        switchMap(text =>
          fromEvent(this.draggable.nativeElement, 'mouseup').pipe(
            map(() => ({ ...text, scannedTextReversed: [...text.scannedText].reverse().join('') }))
          )
        ),
        tap(({ elementIds, scannedText, scannedTextReversed }) => {
          this.store.dispatch(ScanFoundWord({ elementIds, scannedText, scannedTextReversed }));
          this.foundWord$.next({ elementIds, scannedText, scannedTextReversed });
        })
      )
      .subscribe();
  }

  applyRender(coords: number[][], classFn: (el: any) => void) {
    const refs: ElementRef[] = this.letters?.toArray() ?? [];
    if (coords?.length && refs?.length) {
      coords.forEach(coord => {
        const ref = refs.find(item => item.nativeElement.id === `[${coord[0]}, ${coord[1]}]`);
        classFn(ref.nativeElement);
      });
    }
  }
}

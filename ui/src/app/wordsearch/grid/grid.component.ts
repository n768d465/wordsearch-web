import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { distinct, filter, map, scan, startWith, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { IHoveredWord, IScannedText } from 'src/app/models/word-search-data';
import { WordFoundSuccess } from 'src/app/store/wordsearch.actions';
import { selectHoveredWord, selectLoading, selectWsData } from 'src/app/store/wordsearch.selectors';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() gridData: string[][];
  @ViewChild('draggable') draggable: ElementRef;
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
          const foundWord = wsData.wordConfigurationData.find(
            w => w.word === foundWordData.scannedText || w.word === foundWordData.scannedTextReversed
          );

          if (
            foundWord &&
            arePositionsEqual(
              foundWordData.elementIds.map(c => JSON.parse(c)),
              foundWord.positions
            )
          ) {
            this.store.dispatch(WordFoundSuccess({ word: foundWord.word }));
          }
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
    this.letters.changes
      .pipe(
        startWith(this.letters),
        filter(letters => letters.length > 0),
        map(letters => letters.toArray().map(ref => ref.nativeElement)),
        switchMap(refs => {
          return fromEvent(refs, 'mousedown').pipe(
            addTextInfoClass(this.renderer),
            switchMap(() =>
              fromEvent(refs, 'mousemove').pipe(
                distinct((e: MouseEvent) => e.target['id']),
                addTextInfoClass(this.renderer),
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
              this.foundWord$.next({ elementIds, scannedText, scannedTextReversed });
            })
          );
        })
      )
      .subscribe(() => {});
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

function addTextInfoClass(renderer: Renderer2): MonoTypeOperatorFunction<MouseEvent> {
  return source => source.pipe(tap(e => renderer.addClass(e.target, 'text-info')));
}

function arePositionsEqual(arr1: number[][], arr2: number[][]) {
  if (arr1.length != arr2.length) {
    return false;
  }

  return arr1.every(pos => {
    const p1 = pos[0];
    const p2 = pos[1];

    return arr2.some(pos2 => pos2[0] === p1 && pos2[1] === p2);
  });
}

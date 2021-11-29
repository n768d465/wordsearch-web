import {
  Component,
  Input,
  ViewChildren,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppState } from 'src/app/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading, selectHoveredWord } from 'src/app/store/wordsearch.selectors';
import { tap, filter } from 'rxjs/operators';
import { IHoveredWord } from 'src/app/shared/word-search-data';
import { BorderColors } from 'src/app/shared/constants';

@Component({
  selector: 'wordsearch-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() gridData: string[][];
  @ViewChildren('letters') letters;

  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
    this.store
      .pipe(
        select(selectHoveredWord),
        filter(highlightedWord => !!highlightedWord?.config),
        tap((highlightedWord: IHoveredWord) => {
          let coordinates = highlightedWord.config.positions;
          if (highlightedWord.mouseLeave) {
            this.setBorderColors(coordinates, BorderColors.Default);
          } else {
            this.setBorderColors(coordinates, BorderColors.Highlighted);
          }
        })
      )
      .subscribe();
  }

  setBorderColors(coords, color: BorderColors) {
    const refs: ElementRef[] = this.letters?.toArray() ?? [];
    if (coords?.length && refs?.length) {
      coords.forEach(coord => {
        const ref = refs.find(item => item.nativeElement.id === `(${coord[0]},${coord[1]})`);
        ref.nativeElement.style['background-color'] = color;
      })
    }
  }
}

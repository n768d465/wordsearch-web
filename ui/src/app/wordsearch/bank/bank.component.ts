import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ClearFoundWords, MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { selectFoundWords } from 'src/app/store/wordsearch.selectors';
import { filter, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit, OnChanges {
  @Input() bank: string[];

  @ViewChildren('bankItem') bankItem: QueryList<ElementRef>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectFoundWords)
      .pipe(
        switchMap(words => from(words)),
        filter(word => !!word),
        tap(word => {
          const wordRef = this.bankItem?.toArray().find(w => w.nativeElement.innerText === word);
          wordRef.nativeElement.classList.add('bank-item-found');
        })
      )
      .subscribe();
  }

  ngOnChanges(): void {
    this.bankItem?.toArray().forEach(item => item.nativeElement.classList.remove('bank-item-found'));
    this.store.dispatch(ClearFoundWords());
  }

  onMouseHover(word: string) {
    this.store.dispatch(MouseHoveredOnWord({ word }));
  }

  onMouseLeave(word: string) {
    this.store.dispatch(MouseLeaveOnWord({ word }));
  }
}

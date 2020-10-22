import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { selectFoundWords } from 'src/app/store/wordsearch.selectors';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent {
  @Input() bank: string[];

  @ViewChildren('bankItem') bankItem: QueryList<ElementRef>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectFoundWords)
      .pipe(
        filter(words => !!words),
        tap(words => {
          words.forEach(word => {
            const wordRef = this.bankItem?.toArray().find(w => w.nativeElement.innerText === word)
            wordRef.nativeElement.classList.add('bank-item-found')
          })
        })
      )
      .subscribe();
  }

  onMouseHover(word: string) {
    this.store.dispatch(MouseHoveredOnWord({ word }));
  }

  onMouseLeave(word: string) {
    this.store.dispatch(MouseLeaveOnWord({ word }));
  }
}

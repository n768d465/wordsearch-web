import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { selectSelectedGridItems } from 'src/app/store/wordsearch.selectors';
import { filter, map, tap } from 'rxjs/operators';

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
      .select(selectSelectedGridItems)
      .pipe(
        map(items => this.bankItem?.toArray().find(word => word.nativeElement.innerText === items)),
        filter(res => !!res),
        tap(item => {
          item.nativeElement.classList.add('bank-item-found');
        })
      )
      .subscribe();
  }

  onMouseHover(word: string) {
    this.store.dispatch(MouseHoveredOnWord({ word }));
  }

  onMouseLeave() {
    this.store.dispatch(MouseLeaveOnWord());
  }
}

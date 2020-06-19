import { Component, Input } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent {
  @Input() bank: string[];

  constructor(private store: Store<AppState>) {}

  onMouseHover(word: string) {
    this.store.dispatch(MouseHoveredOnWord({ word }));
  }

  onMouseLeave() {
    this.store.dispatch(MouseLeaveOnWord());
  }
}

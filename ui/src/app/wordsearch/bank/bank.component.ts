import { Component, ElementRef, Input, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { IWordConfiguration } from 'src/app/shared/word-search-data';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent {
  @Input() wordConfigurationData: IWordConfiguration[];
  @ViewChildren('bankItem') bankItem: QueryList<ElementRef>;

  constructor(private store: Store<AppState>) {}

  onMouseHover(word: string) {
    this.store.dispatch(MouseHoveredOnWord({ word }));
  }

  onMouseLeave(word: string) {
    this.store.dispatch(MouseLeaveOnWord({ word }));
  }
}

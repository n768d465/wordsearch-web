import { AfterViewInit, Component, ElementRef, Input, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { IWordConfiguration } from 'src/app/shared/word-search-data';
import { selectFoundWords } from 'src/app/store/wordsearch.selectors';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements AfterViewInit {
  @Input() wordConfigurationData: IWordConfiguration[];
  @ViewChildren('bankItem') bankItem: QueryList<ElementRef>;

  allWordsFound: boolean;
  constructor(private store: Store<AppState>) {}

  ngAfterViewInit() {
    this.store
      .select(selectFoundWords)
      .pipe(
        tap(words => {
          const wordRefs = this.bankItem?.toArray().filter(w => words.has(w.nativeElement.innerText));
          wordRefs.forEach(wordRef => wordRef.nativeElement.classList.add('bank-item-found'));

          const wordBank = this.wordConfigurationData.filter(w => w.word);
          this.allWordsFound = wordBank.length === words.size;
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

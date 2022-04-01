import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { IWordConfiguration } from 'src/app/models/word-search-data';
import { MouseHoveredOnWord, MouseLeaveOnWord } from 'src/app/store/wordsearch.actions';
import { selectFoundWords } from 'src/app/store/wordsearch.selectors';

@Component({
  selector: 'wordsearch-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements AfterViewInit {
  @Input() wordConfigurationData: IWordConfiguration[];
  @ViewChildren('bankItem') bankItem: QueryList<ElementRef>;

  allWordsFound: boolean = false;
  isLoading$: Observable<boolean>;
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

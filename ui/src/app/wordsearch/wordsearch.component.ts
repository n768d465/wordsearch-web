import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { FetchWordsearch } from 'src/app/store/wordsearch.actions';
import { IWordSearchData } from 'src/app/shared/word-search-data';
import { map } from 'rxjs/operators';
import { selectWsData } from '../store/wordsearch.selectors';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.scss'],
})
export class WordsearchComponent implements OnInit {
  wordSearchData$: Observable<IWordSearchData>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.wordSearchData$ = this.store.select(selectWsData).pipe(
      map(data => data)
    );
  }
}

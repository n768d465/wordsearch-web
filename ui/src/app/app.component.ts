import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { FetchCategories, FetchWordsearch, SaveWordsearchParams } from './store/wordsearch.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      FetchWordsearch({
        category: 'Animals',
        wordsearchSize: '10',
        minWordLength: '3',
        maxWordLength: '7',
      })
    );

    this.store.dispatch(FetchCategories());
  }
}

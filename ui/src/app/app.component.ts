import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { SaveWordsearchParams } from './store/wordsearch.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      SaveWordsearchParams({
        category: 'Animals',
        wordsearchSize: '10',
        minWordLength: '3',
        maxWordLength: '7',
      })
    );
  }
}

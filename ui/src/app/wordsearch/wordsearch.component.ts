import { Component } from "@angular/core";
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { SaveWordsearchParams, FetchWordsearch } from '../store/wordsearch.actions';

@Component({
  selector: "app-wordsearch",
  templateUrl: "./wordsearch.component.html",
  styleUrls: ["./wordsearch.component.css"]
})
export class WordsearchComponent {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(SaveWordsearchParams({ wordsearchSize: "10", maxWordLength: "7" }))
  }
}

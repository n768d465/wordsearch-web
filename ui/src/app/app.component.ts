import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { SaveWordsearchParams } from './store/wordsearch.actions';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(SaveWordsearchParams({ wordsearchSize: "10", maxWordLength: "7" }))
  }
}

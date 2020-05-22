import {
  Component,
  OnInit,
} from "@angular/core";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { FetchWordsearch } from 'src/app/store/wordsearch.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IWordSearchData, } from 'src/app/shared/word-search-data';

@Component({
  selector: "app-wordsearch",
  templateUrl: "./wordsearch.component.html",
  styleUrls: ["./wordsearch.component.css"]
})
export class WordsearchComponent implements OnInit {
  wordSearchData$: Observable<IWordSearchData>;
  showWordsOnly: boolean = false;
  constructor(private store: Store<AppState>, public logicService: WordsearchLogicService) { }

  ngOnInit() {
    this.buildWordSearch();
  }

  buildWordSearch() {
    this.store.dispatch(FetchWordsearch())
    this.wordSearchData$ = this.logicService.buildWordSearch();
  }

  switchGrids(value: MatCheckboxChange) {
    this.showWordsOnly = value.checked;
  }
}
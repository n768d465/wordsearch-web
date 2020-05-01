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

@Component({
  selector: "ws-content",
  templateUrl: "./wordsearch-content.component.html",
  styleUrls: ["./wordsearch-content.component.css"]
})
export class WordsearchContentComponent implements OnInit {
  wordSearchData$: Observable<any>;
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

  getHoveredWord = (word: string) => { };
}

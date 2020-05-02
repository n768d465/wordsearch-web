import {
  Component,
  OnInit,
} from "@angular/core";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { MouseHoveredOnWord, MouseLeaveOnWord, FetchWordsearch } from 'src/app/store/wordsearch.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IWordSearchData, IHoveredWord } from 'src/app/shared/word-search-data';

@Component({
  selector: "ws-content",
  templateUrl: "./wordsearch-content.component.html",
  styleUrls: ["./wordsearch-content.component.css"]
})
export class WordsearchContentComponent implements OnInit {
  wordSearchData$: Observable<IWordSearchData>;
  showWordsOnly: boolean = false;
  highlightedWord: IHoveredWord;
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

  getHoveredWord = (word: string) => {
    if (word) {
      this.store.dispatch(MouseHoveredOnWord({ word }));
    }
    else {
      this.store.dispatch(MouseLeaveOnWord())
    }
    this.logicService.selectHighlightedWord().subscribe(w => this.highlightedWord = w)
  };
}

import {
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { IWordSearchParams } from "src/app/shared/word-search-form-data";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { FetchWordsearch } from 'src/app/store/wordsearch.actions';

@Component({
  selector: "ws-content",
  templateUrl: "./wordsearch-content.component.html",
  styleUrls: ["./wordsearch-content.component.css"]
})
export class WordsearchContentComponent implements OnInit {
  @Input() formData: IWordSearchParams;
  ab$: Observable<any>;
  constructor(private store: Store<AppState>, public logicService: WordsearchLogicService) { }

  ngOnInit() {
    this.store.dispatch(FetchWordsearch());
    this.ab$ = this.logicService.buildWordSearch();
  }

  buildWordSearch() {
    this.store.dispatch(FetchWordsearch())
  }

  getHoveredWord = (word: string) => {
    // this.selectedWord = this.logicService.getHoveredWord(
    //   this.wordsearchData.wordConfigurationData,
    //   word
    // );
  };
}

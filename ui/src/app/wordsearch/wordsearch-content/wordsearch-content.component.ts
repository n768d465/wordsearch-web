import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { IWordSearchParams } from "src/app/shared/word-search-form-data";
import {
  IWordSearchData,
  IWordConfiguration
} from "src/app/shared/word-search-data";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { selectWsData, WordSearchParamsState, FetchWordsearch } from 'src/app/store';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: "ws-content",
  templateUrl: "./wordsearch-content.component.html",
  styleUrls: ["./wordsearch-content.component.css"]
})
export class WordsearchContentComponent implements OnInit, OnChanges {
  @Input() formData: IWordSearchParams;
  gridToUse: string[][];
  selectedWord: IWordConfiguration;
  wordsearchData: IWordSearchData = {
    grid: [[]],
    wordBank: [],
    gridWordsOnly: [[]],
    wordConfigurationData: []
  };
  ab$: Observable<any>;
  constructor(private store: Store<AppState>, public logicService: WordsearchLogicService) { }

  ngOnInit() {
    this.buildGrid();
    this.store.dispatch(FetchWordsearch());
    this.ab$ = this.store.select(selectWsData).pipe(tap(data => console.log(data)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.formData?.currentValue) {
      this.gridToUse = this.setGrid();
    }
  }

  setGrid = () =>
    this.logicService.setGrid(this.wordsearchData, this.formData.showWordsOnly);

  buildGrid() {
    this.logicService.buildWordSearch(this.formData).subscribe(data => {
      this.wordsearchData = data;
      this.gridToUse = this.setGrid();
    });
  }

  getHoveredWord = (word: string) => {
    this.selectedWord = this.logicService.getHoveredWord(
      this.wordsearchData.wordConfigurationData,
      word
    );
  };
}

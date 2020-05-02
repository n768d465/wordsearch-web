import {
  Component,
  Input,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/wordsearch.selectors';

@Component({
  selector: "wordsearch-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent {
  @Input() gridData: string[][];
  @Input() highlightedWord: string;
  @ViewChildren("letters") letters: QueryList<ElementRef>;
  isLoading$: Observable<boolean>;
  cellHeight: any;
  color = "white";

  constructor(private logicService: WordsearchLogicService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.gridData && changes.gridData.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(
        changes.gridData.currentValue
      );
    }

    if (changes?.highlightedWord?.currentValue) {
      const currentValue = changes.highlightedWord.currentValue
      if (currentValue.word) {
        this.setBorderColor(changes.highlightedWord.currentValue.coordinates)
      }
      else {
        this.setBorderColor(null);
      }
    }
  }

  setBorderColor = positions => {
    if (this.letters) {
      this.logicService.setBorderColor(positions, this.letters.toArray());
    }
  };
}

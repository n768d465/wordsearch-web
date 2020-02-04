import {
  Component,
  Input,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";
import { WordsearchLogicService } from "src/app/services/wordsearch-logic.service";

@Component({
  selector: "wordsearch-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent {
  @Input() gridData: any;
  @Input() highlightedWord: any;
  @Input() isLoading: boolean;
  @ViewChildren("letters") letters: QueryList<ElementRef>;
  cellHeight: any;
  color = "white";

  constructor(private logicService: WordsearchLogicService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.gridData && changes.gridData.currentValue) {
      this.cellHeight = this.logicService.computeCellHeight(
        changes.gridData.currentValue
      );
    }

    if (changes && changes.highlightedWord) {
      if (changes.highlightedWord.currentValue) {
        this.setBorderColor(changes.highlightedWord.currentValue.positions);
      } else {
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

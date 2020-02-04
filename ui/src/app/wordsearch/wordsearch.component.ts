import { Component, OnInit, SimpleChanges, SimpleChange } from "@angular/core";
import { WordsearchDataService } from "../services/wordsearch-data.service";
import { IWordSearchFormData } from "../shared/word-search-form-data";

@Component({
  selector: "app-wordsearch",
  templateUrl: "./wordsearch.component.html",
  styleUrls: ["./wordsearch.component.css"]
})
export class WordsearchComponent {
  formData: IWordSearchFormData;

  retrieveFormData(formData: IWordSearchFormData) {
    this.formData = formData;
  }
}

import { Component } from "@angular/core";
import { IWordSearchParams } from "../shared/word-search-form-data";

@Component({
  selector: "app-wordsearch",
  templateUrl: "./wordsearch.component.html",
  styleUrls: ["./wordsearch.component.css"]
})
export class WordsearchComponent {
  formData: IWordSearchParams;

  retrieveFormData(formData: IWordSearchParams) {
    this.formData = formData;
  }
}

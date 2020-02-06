import { Component } from "@angular/core";
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

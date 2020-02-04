import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface IWordSearchFormData {
  wordsearchSize: string;
  maxWordLength: string;
  showWordsOnly: boolean;
}

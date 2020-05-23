import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function wordLengthValidator(wordLengthType: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control) {
      return null;
    }
    const value = Number(control.value);

    if (!value) {
      return {
        wordLengthValidator: {
          value: `A ${wordLengthType} word length is required.`
        }
      };
    }

    if (value < 3) {
      return {
        wordLengthValidator: {
          value: "Words must be 3 letters long or longer."
        }
      };
    }

    const parent = control.parent;
    if (parent) {
      const wordsearchSizeControl = parent.get("wordsearchSize");
      const sizeValue = Number(wordsearchSizeControl.value);
      if (sizeValue < value) {
        return {
          wordLengthValidator: {
            value: "Word size cannot be greater than the wordsearch size."
          }
        };
      }
      const minWordLength = Number(parent.get("minWordLength").value);
      const maxWordLength = Number(parent.get("maxWordLength").value);
      if (minWordLength > maxWordLength || maxWordLength < minWordLength) {
        return {
          wordLengthValidator: {
            value: "The word length range is invalid."
          }
        };
      } else {
        return null;
      }
    }

    return null;
  };
}

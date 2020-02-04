import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function gridSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control) {
      return null;
    }
    const value = Number(control.value);

    if (!value) {
      return {
        gridSizeValidator: {
          value: "A wordsearch size is required."
        }
      };
    }

    if (value < 3) {
      return {
        gridSizeValidator: {
          value: "Wordsearch size must be 3x3 long or longer."
        }
      };
    }

    const parent = control.parent;
    if (parent) {
      const wordsearchSizeControl = parent.get("maxWordLength");
      const sizeValue = Number(wordsearchSizeControl.value);
      if (sizeValue > value) {
        return {
          gridSizeValidator: {
            value: "Wordsearch size cannot be smaller than the max word length."
          }
        };
      }
    }

    return null;
  };
}

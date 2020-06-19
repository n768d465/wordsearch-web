import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function gridSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control) {
      return null;
    }
    const value = Number(control.value);

    if (!value) {
      return {
        gridSizeValidator: {
          value: 'A wordsearch size is required.',
        },
      };
    }

    if (value < 3) {
      return {
        gridSizeValidator: {
          value: 'Wordsearch size must be 3x3 long or longer.',
        },
      };
    }

    const parent = control.parent;
    if (parent) {
      const maxWordLength = Number(parent.get('maxWordLength').value);
      const minWordLength = Number(parent.get('minWordLength').value);
      if (minWordLength > value) {
        return {
          gridSizeValidator: {
            value: 'Wordsearch size must be greater than or equal to the min word length.',
          },
        };
      }
      if (value < maxWordLength) {
        return {
          gridSizeValidator: {
            value: 'Wordsearch size must greater than or equal to the max word length.',
          },
        };
      }
    }

    return null;
  };
}

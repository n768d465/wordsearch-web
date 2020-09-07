import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export function gridSizeValidator(): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors => {
    if (!formGroup) {
      return null;
    }
    const gridSize = formGroup.get('wordsearchSize');
    const value = Number(gridSize.value);

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

    const maxWordLength = Number(formGroup.get('maxWordLength').value);
    const minWordLength = Number(formGroup.get('minWordLength').value);
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

    return null;
  };
}

export function wordLengthValidator(): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors => {
    if (!formGroup) {
      return null;
    }
    const maxWordLength = Number(formGroup.get('maxWordLength').value);
    const minWordLength = Number(formGroup.get('minWordLength').value);

    if (minWordLength < 3) {
      return {
        minWordLengthValidator: {
          value: 'Words must be at least 3 letters long.',
        },
      };
    }

    if (maxWordLength < 3) {
      return {
        maxWordLengthValidator: {
          value: 'Words must be at least 3 letters long.',
        },
      };
    }
    if (minWordLength > maxWordLength) {
      return {
        minWordLengthValidator: {
          value: 'The minimum word length must be smaller than the maximum word length',
        },
      };
    }

    return null;
  };
}

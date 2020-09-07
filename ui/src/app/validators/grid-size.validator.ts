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

export function wordLengthValidator(type: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control) {
      return null;
    }

    const value = Number(control.value);

    if (value < 3) {
      return {
        wordLengthValidator: {
          value: 'Words must be at least 3 letters long.',
        },
      };
    }

    const parent = control.parent;

    if (parent) {
      const gridSize = Number(parent.get('wordsearchSize').value);
      if (type === 'minimum') {
        const maxWordLength = Number(parent.get('maxWordLength').value);
        if (control.value > maxWordLength) {
          return {
            wordLengthValidator: {
              value: 'The minimum word length must be smaller than the maximum word length',
            },
          };
        }

        if (control.value > gridSize) {
          return {
            wordLengthValidator: {
              value: 'The minimum word length must be smaller than the wordsearch size.',
            },
          };
        }
      }
      if (type === 'maximum') {
        const minWordLength = parent.get('minWordLength');
        if (control.value < minWordLength.value) {
          return {
            wordLengthValidator: {
              value: 'The maximum word length must be larger than the minimum word length',
            },
          };
        }
        if (control.value < gridSize) {
          return {
            wordLengthValidator: {
              value: 'The maximum word length must be larger than the wordsearch size.',
            },
          };
        }
      }
    }
    return null;
  };
}

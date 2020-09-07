import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/*
 * Messages from <mat-error> will only display if a form control is invalid.
 * However, the wordsearch form relies on a lot of cross field validation, so
 * validators are bound to the entire form, rather than the form controls.
 *
 * With validators bound to the form, messages from <mat-error> will never
 * display, even if the form is invalid. To get the errors to display when the form is invalid,
 * this error behavior has to be overridden by implementing an error state matcher.
 *
 * See this for more information: https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
 */
export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(form && form.invalid && (form.dirty || form.touched || isSubmitted));
  }
}

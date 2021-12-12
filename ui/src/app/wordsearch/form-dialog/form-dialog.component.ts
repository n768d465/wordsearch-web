import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { FetchWordsearch, SaveWordsearchParams } from 'src/app/store/wordsearch.actions';
import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/wordsearch.selectors';

@Component({
  selector: 'wordsearch-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  @Input() wordsearchForm: FormGroup;
  @Input() categories: string[];

  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectLoading);
  }

  onNewWordsearchBtnClicked() {
    if (!(this.wordsearchForm.status === 'INVALID')) {
      this.store.dispatch(
        SaveWordsearchParams({
          wordsearchSize: this.wordsearchForm.get('wordsearchSize').value,
          minWordLength: this.wordsearchForm.get('minWordLength').value,
          maxWordLength: this.wordsearchForm.get('maxWordLength').value,
          category: this.wordsearchForm.get('category').value,
        })
      );
      this.store.dispatch(FetchWordsearch());
    }
  }
}

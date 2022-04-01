import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { selectAllData } from '../store/wordsearch.selectors';

@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.scss'],
})
export class WordsearchComponent implements OnInit {
  wordSearchData$: Observable<any>;
  params: any;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.wordSearchData$ = this.store.pipe(
      select(selectAllData),
      skip(2),
      map(({ wsData, wsCategories }) => ({
        wsCategories,
        wsGrid: wsData.grid,
        wsConfigData: wsData.wordConfigurationData,
      }))
    );
  }
}

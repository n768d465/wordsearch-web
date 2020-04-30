import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { FetchWordsearch } from './wordsearch.actions';
import { mergeMap, map } from 'rxjs/operators';
import { WordsearchDataService } from '../services/wordsearch-data.service';

@Injectable()
export class WordsearchEffects {
    fetchWordsearch$ = createEffect(() => this.actions$.pipe(
        ofType(FetchWordsearch),
        mergeMap(() => this.dataService.getWordSearch({ wordsearchSize: '10', maxWordLength: '7', showWordsOnly: false }).pipe(
            map(data => ({ type: '[Wordsearch] Fetch Wordsearch Success', payload: data }))
        ))
    ));

    constructor(private actions$: Actions, private dataService: WordsearchDataService) { }
}
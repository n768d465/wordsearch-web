import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWordSearchData } from '../models/word-search-data';
import { IWordSearchParams } from '../models/word-search-form-data';

@Injectable({
  providedIn: 'root',
})
export class WordsearchDataService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getWordSearch(wsParams: IWordSearchParams): Observable<IWordSearchData> {
    const params = new HttpParams()
      .set('dim', wsParams.wordsearchSize)
      .set('min_word_length', wsParams.minWordLength)
      .set('max_word_length', wsParams.maxWordLength)
      .set('category', wsParams.category);

    return this.http
      .get<IWordSearchData>(this.url, { params })
      .pipe(
        timeout(5000),
        catchError(err => throwError('Could not generate a wordsearch with inputs provided.'))
      );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }
}

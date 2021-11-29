import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWordSearchParams } from '../shared/word-search-form-data';
import { environment } from 'src/environments/environment';
import { IWordSearchData } from '../shared/word-search-data';

@Injectable({
  providedIn: 'root',
})
export class WordsearchDataService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getWordSearch(wsParams: IWordSearchParams): Observable<IWordSearchData> {
    const params = new HttpParams()
      .set('dim', wsParams.wordsearchSize)
      .set('min_word_length', wsParams.minWordLength)
      .set('max_word_length', wsParams.maxWordLength)
      .set('category', wsParams.category);

    return this.http.get<IWordSearchData>(this.url, { params });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IWordSearchParams } from "../shared/word-search-form-data";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class WordsearchDataService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getWordSearch(wsParams: IWordSearchParams): Observable<any> {
    const params = new HttpParams()
      .set("dim", wsParams.wordsearchSize)
      .set("min_word_length", wsParams.minWordLength)
      .set("max_word_length", wsParams.maxWordLength);

    return this.http.get<IWordSearchParams>(this.url, { params });
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IWordSearchParams } from "../shared/word-search-form-data";

@Injectable({
  providedIn: "root"
})
export class WordsearchDataService {
  private url = "http://192.168.0.251:5000";
  constructor(private http: HttpClient) { }

  getWordSearch(wsParams: IWordSearchParams): Observable<any> {
    const params = new HttpParams()
      .set("dim", wsParams.wordsearchSize)
      .set("max_word_length", wsParams.maxWordLength);

    return this.http.get<IWordSearchParams>(this.url, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sentence } from '../models/sentence';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SentecesService {
  private randomWords: string[];

  constructor(private http: HttpClient) {
    this.getRandomWords().subscribe(words => {this.randomWords = words; });
  }

  private getRandomWords(): Observable<string[]> {
    return this.http.get<string[]>(`./assets/randomWords.json`);
  }

  getSentence(lessonNumber): Observable<Sentence> {
    return this.http.get<Sentence[]>(`./assets/sentences${lessonNumber}.json`)
    .map(sentences => sentences[Math.floor(Math.random() * sentences.length)]);
  }

  getRandomWord(): string {
    return this.randomWords[Math.floor(Math.random() * this.randomWords.length)];
  }
}

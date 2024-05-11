import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private apiUrl = 'https://api.openai.com/v1';

  constructor(
    private http: HttpClient
  ) { }

  getSpeechToText(): Observable<any> {
    const body = {
      model: 'gpt-3.5-turbo',
      prompt: 'How is the weather today?',
      max_tokens: 50
    };
    return this.http.post<any>(`${this.apiUrl}/audio/transcriptions	`, body);
  }

  // https://platform.openai.com/docs/api-reference/chat/create
  /** 和 openai 問問題 */
  getCompletion(prompt: string): Observable<any> {
    const body = {
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 50
    };
    return this.http.post<any>(`${this.apiUrl}/chat/completions`, body);
  }
}

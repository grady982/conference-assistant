import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(
    private http: HttpClient
  ) { }

  /** 音檔轉文字 */
  transcribeAudio(audioFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', audioFile);
    return this.http.post<any>(`${SERVICE.API}/speechToText`, formData);
  }

  
  /** 取得總結 */
  getSummary(prompt: string): Observable<any> {
    return this.http.get<any>(`${SERVICE.API}/chat/completions`, { params: { prompt }});
  }
}

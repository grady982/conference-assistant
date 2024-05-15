import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICE } from 'src/environments/environment';
import { Response } from './core.model';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(
    private http: HttpClient
  ) { }

  /** 音檔轉文字 */
  transcribeAudio(formData: FormData): Observable<Response<string>> {
    return this.http.post<any>(`${SERVICE.API}/speechToText`, formData);
  }

  upload(formData: FormData) {
    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    // }

     // Set the desired Content-Type header
     const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      'Accept': '*/*'
    });

    // Set headers in the request options
    const requestOptions = {
      headers: headers
    };

    console.log('formData', formData);

    return this.http.post<any>(`${SERVICE.API}/upload`, formData, requestOptions);
  }
  
  /** 取得總結 */
  getSummary(prompt: string): Observable<any> {
    return this.http.get<any>(`${SERVICE.API}/chat/completions`, { params: { prompt }});
  }
}

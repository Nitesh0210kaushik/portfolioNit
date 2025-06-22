import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = ' https://bulkdata-6.onrender.com';

  constructor(private http: HttpClient) {}

  sendPostRequest<T>(
    path: string,
    data: any = {},
    headers: any = {}
  ): Observable<T> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers,
    });

    return this.http.post<T>(this.baseUrl + path, data, {
      headers: httpHeaders,
    });
  }

  sendGetRequest<T>(
    path: string,
    params: any = {},
    headers: any = {}
  ): Observable<T> {
    const httpHeaders = new HttpHeaders(headers);
    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get<T>(this.baseUrl + path, {
      headers: httpHeaders,
      params: httpParams,
    });
  }
}

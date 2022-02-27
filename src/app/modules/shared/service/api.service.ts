import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  post(basePath: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${basePath}`, body);
  }

  get(basePath: string, params?: Params): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${basePath}`, { params });
  }

  put(basePath: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${basePath}`, body);
  }

  delete(basePath: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${basePath}`);
  }
}

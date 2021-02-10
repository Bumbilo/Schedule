import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost:5000/api/';
  private headers = new HttpHeaders();

  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  }

  private getUrl(url: string): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, { headers: this.headers })
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data, { headers: this.headers });
  }

  public delete(url: string = '', data: any = {}): Observable<any> {
    return this.http.delete(this.getUrl(url), { headers: this.headers });
  }
}

import { Injectable } from '@angular/core';
import {HttpRequest, HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpWrapperService {

  private headers: HttpHeaders = null;

  constructor (private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    });
  }

  public createHeaders(headers): void {
    this.headers = new HttpHeaders({
      'accept': 'application/json',
      'x-xsrf-token': headers.xXsrfToken,
      'x-falcon-token': headers.xFalconToken
    });
  }

  public get(uri: string, body = {}): Observable<Object>  {
    let params = new HttpParams();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        params = params.append(key, body[key]);
      }
    }

    return this.http.get(environment.api.base + uri, {
      headers: this.headers,
      params: params
    });
  }
  public post(uri: string, body): Observable<Object> {
    return this.request('POST', uri, body);
  }
  public put(uri: string, body): Observable<Object>  {
    return this.request('PUT', uri, body);
  }
  public delete(uri: string, body): Observable<Object>  {
    return this.request('DELETE', uri, body);
  }

  // Private methods
  private request(method: string, uri: string, body: Object): Observable<Object>  {
    const req = new HttpRequest(method, environment.api.base + uri, body, {
      headers: this.headers
    });
    return this.http.request(req);
  }
}

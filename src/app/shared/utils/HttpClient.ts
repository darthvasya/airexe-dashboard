import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../core/auth.service';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private authService: AuthService) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('X-Auth-Token', this.authService.token);
  }

  get(url, search = {}) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return new Promise((resolve, reject) => {
      this.http.get(url, {
        headers: headers,
      })
        .map(res => res)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(url, search = {}) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return new Promise((resolve, reject) => {
      this.http.delete(url, {
        headers: headers,
      })
        .map(res => res.json().data)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return new Promise((resolve, reject) => {
      this.http.post(url, data, {
        headers: headers,
      })
        .map(res => res.json().data)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  put(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return new Promise((resolve, reject) => {
      this.http.put(url, data, {
        headers: headers,
      })
        .map(res => res.json().data)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}

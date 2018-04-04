import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../utils/HttpClient';
import { AuthService } from './auth.service';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser() {
    return this.http.get(`${environment.apiUrl}api/v1/users/` + this.authService.getUserInfo().userId);
  }

  updateAttributes(data) {
    return this.http.put(`${environment.apiUrl}api/v1/users/${this.authService.getUserInfo().userId}/attributes`, data);
  }
}

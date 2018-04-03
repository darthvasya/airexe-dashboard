import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../utils/HttpClient';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser() {
    return this.http.get(`https://hubler.ru/barium/api/v1/users/` + this.authService.getUserInfo().userId);
  }

  getAll(themeId) {
    return this.http.get(`https://hubler.ru/barium/api/v1/credentials/signin`, {});
  }

  createOne(word) {
    return this.http.post(`https://hubler.ru/barium/api/v1/credentials/signin`, null);
  }

  remove(wordId) {
    return this.http.delete(`https://hubler.ru/barium/api/v1/credentials/signin`, {});
  }
}

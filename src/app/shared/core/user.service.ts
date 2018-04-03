import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../utils/HttpClient';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(themeId) {
    return this.http.get(`https://hubler.ru/barium/api/v1/credentials/signin`, {});
  }

  createOne(word) {
    return this.http.post(`https://hubler.ru/barium/api/v1/credentials/signin`, word);
  }

  remove(wordId) {
    return this.http.delete(`https://hubler.ru/barium/api/v1/credentials/signin`, {});
  }
}

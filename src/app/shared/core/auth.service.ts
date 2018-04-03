import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';

import * as sha256 from 'sha256';

@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) {

  }

  saveUserInfo(value) {
    localStorage.setItem('user-info', JSON.stringify(value));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

  get token() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.token : '';
  }

  get user() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.user : null;
  }

  isLogged() {
    const userInfo = this.getUserInfo();
    return !!userInfo;
  }

  isAdmin() {
    return !!this.user.isAdmin;
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }

  navigateToUserRoot() {
    this.router.navigate(['/']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  login(loginInputData) {

    const loginData = { credentialsType: 'password', login: loginInputData.username, password: sha256(loginInputData.password) };

    return new Promise((resolve, reject) => {
      this.http.put(`https://hubler.ru/barium/api/v1/credentials/signin`, loginData)
        .map(res => res.json().data)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((data) => {
          this.saveUserInfo(data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  registration(registrationInputData) {

    const registrationData = {
      'credentialsType': 'password',
      'login': registrationInputData.email,
      'password': sha256(registrationInputData.password)
    };

    return new Promise((resolve, reject) => {
      this.http.post(`https://hubler.ru/barium/api/v1/users`, registrationData)
        .map(res => res)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }



}

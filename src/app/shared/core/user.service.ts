import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../utils/HttpClient';
import { AuthService } from './auth.service';

import { environment } from './../../../environments/environment.prod';
import { ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser() {
    return this.http.get(`${environment.apiUrl}api/v1/users/` + this.authService.getUserInfo().userId);
  }

  updateAttributes(data) {
    return this.http.put(`${environment.apiUrl}api/v1/users/${this.authService.getUserInfo().userId}/attributes`, data);
  }

  createSourse(data) {
    data.id = this.authService.getUserInfo().id;
    data.userId = this.authService.getUserInfo().userId;

    return this.http.post(`${environment.apiUrl}api/v1/users/${this.authService.getUserInfo().userId}/sources`, data);
  }

  getSourse(id) {

    return this.http.download(`${environment.apiUrl}api/v1/sources/${id}`).then((data) => {
            const blob = new Blob([data], {type: 'text/plain'});
            console.log(blob);
            // const fileURL = URL.createObjectURL(blob);
            // console.log(fileURL);

            // saveAs(blob, 's.txt');

    })
    .catch((err) => {
      console.log(err);
    });

  }
}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/core/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginData = new LoginData('', '');
  registrationData = new LoginData('', '');

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogging() {

    this.authService.login(this.loginData)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  onRegistration() {
    this.authService.registration(this.registrationData)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

}


class LoginData {
  constructor(
      public email: string,
      public password: string,
  ) { }

  isValid() {
      return true;
  }
}

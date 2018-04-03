import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/core/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginData = new LoginData('', '', false, false);
  registrationData = new LoginData('', '', false, false);

  isRegistrationSuccess = false;
  isRegistrationFailed = false;
  errorMessage = '';

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
    this.isRegistrationFailed = false;

    if (this.registrationData.terms) {
      this.authService.registration(this.registrationData)
      .then(data => {
        if (data['status'] === 200) {
          this.isRegistrationSuccess = true;
        }
        console.log(data);
      })
      .catch(err => {
        if (err['status'] === 409) {
          this.errorMessage = 'Account with same login already exists';
        }
        if (err['status'] === 400) {
          this.errorMessage = 'Inbound model is not validated';
        }

        this.isRegistrationFailed = true;

        console.error(err);
      });
    } else {
      this.errorMessage = 'To register, you must agree with Terms and Conditions';
      this.isRegistrationFailed = true;
    }


  }

  checkCheckboks() {

  }

}

class LoginData {
  constructor(
      public email: string,
      public password: string,
      public getEmails: boolean,
      public terms: boolean
  ) { }

  isValid() {
      return true;
  }
}

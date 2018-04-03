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
  passwordStrength = '';

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

  validatePassword() {
    const strongRegex = new RegExp('^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
    const mediumRegex = new RegExp('^(?=.{9,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');
    const enoughRegex = new RegExp('(?=.{8,}).*', 'g');
    const pwd = this.registrationData.password;
    if (false === enoughRegex.test(pwd)) {
      this.passwordStrength = 'Password too week. Please make stronger password, minimum 8 characters';
    } else if (strongRegex.test(pwd)) {
      this.passwordStrength = 'Strong!';
    } else if (mediumRegex.test(pwd)) {
      this.passwordStrength = 'Medium!';
    } else {
      this.passwordStrength = 'Password too week. Please make stronger password, minimum 8 characters';
    }
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

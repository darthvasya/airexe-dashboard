import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/core/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  referalId: any;
  confirm: any;
  isConfirm = false;
  isErrorConfirm = true;

  loginData = new LoginData('', '', false, false);
  registrationData = new LoginData('', '', false, false);

  isRegistrationSuccess = false;
  isRegistrationFailed = false;
  isLoginFailed = false;
  errorMessage = '';
  passwordStrength = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.referral)
      .subscribe(params => {
        this.referalId = params.referral;
      });
    this.route.queryParams
      .filter(params => params.confirm)
      .subscribe(params => {
        this.confirm = params.confirm;
        this.authService.confirmEmail(this.confirm)
          .then(data => {
            this.isConfirm = true;
          })
          .catch(err => {
            this.isErrorConfirm = true;
          });
      });
  }

  onLogging() {
    this.clear();
    console.log(this.validateEmail(this.loginData.email));
    if (!this.validateEmail(this.loginData.email)) {
      this.errorMessage = 'Email is invalid!';
      this.isLoginFailed = true;
    } else if (this.loginData.password.length === 0 || this.loginData.email.length === 0) {
      this.errorMessage = 'Email or password can`t be empty!';
      this.isLoginFailed = true;
    } else if (this.loginData.password.length === 0) {
      this.errorMessage = 'Password should be more than 8 characters!';
      this.isLoginFailed = true;
    } else {
      this.authService.login(this.loginData)
      .then(data => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.errorMessage = 'Email or password is incorrect!';
        this.isLoginFailed = true;
      });
    }
  }

  onRegistration() {
    this.clear();

    if (this.registrationData.terms) {
      this.authService.registration(this.registrationData, this.referalId)
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

  clear() {
    this.isRegistrationSuccess = false;
    this.isRegistrationFailed = false;
    this.errorMessage = '';
    this.passwordStrength = '';
    this.isLoginFailed = false;
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

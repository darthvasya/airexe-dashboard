import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from './../../shared/core/user.service';
import { LoaderService } from './../../shared/core/loader.service';
import { AuthService } from './../../shared/core/auth.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userData: any;
  userAttributes: Attribute[];
  userEmail = {code: '', value: '', validation: ''};
  userVerificationStatus = '';
  referalId = '';
  copyHelp  = '';
  isCopied1 = false;

  isEmailVerified = false;
  isAccountVerified = 0;

  constructor(private loaderService: LoaderService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loaderService.display(true);

    this.userService.getUser().then((data) => {
      this.userData = JSON.parse(data['_body']);
      this.fillData();
      this.loaderService.display(false);
    })
    .catch(err => {
      this.loaderService.display(false);
    });
  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    this.userEmail = _.find(this.userData.attrs, { 'code': AttributeTypes.Email });

    this.checkBitMask(this.userData.status);
    this.referalId = 'https://airexe.io/register?referral=' + this.authService.getUserInfo().userId;
  }

  copied() {
    this.copyHelp = 'ID copied';
  }

  checkBitMask(value) {
    switch (value) {
      case 0:
        this.isEmailVerified = false;
        this.isAccountVerified = 0;
        break;
      case 2:
        this.isEmailVerified = true;
        this.isAccountVerified = 0;
        break;
      case 6:
        this.isEmailVerified = true;
        this.isAccountVerified = 1;
        break;
      case 10:
        this.isEmailVerified = true;
        this.isAccountVerified = 2;
        break;
    }
  }

}
enum AttributeTypes {
  Email = '1050'
}

export class Attribute {
  constructor(private code: string, private value: string, private validation: string) {}
}

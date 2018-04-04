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
      console.log(err);
    });
  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    this.userEmail = _.find(this.userData.attrs, { 'code': AttributeTypes.Email });
    if (this.userEmail !== undefined) { this.userEmail.validation.toString(); }
    this.userVerificationStatus = this.userData.status.toString();
    this.referalId = 'https://airexe.io/register?referral=' + this.authService.getUserInfo().id;
  }

copied() {
  this.copyHelp = 'ID copied';
}

}
enum AttributeTypes {
  Email = '1050'
}

export class Attribute {
  constructor(private code: string, private value: string, private validation: string) {}
}

import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/core/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userData: any;
  userAttributes: Attribute[];
  userEmail: Attribute = new Attribute('', '', '');
  userVerificationStatus = '';
  referalId = '';


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().then((data) => {
      this.userData = JSON.parse(data['_body']);
      this.fillData();
      console.log(this.userData);
    })
    .catch(err => console.log(err));
  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    console.log(_.find(this.userData.attrs, { 'code': AttributeTypes.Email }));
    this.userEmail = _.find(this.userData.attrs, { 'code': AttributeTypes.Email });
    this.userVerificationStatus = this.userData.status;
    this.referalId = 'https://airexe.io/register?referral=' + this.userData.referalId;
  }

}

enum AttributeTypes {
  Email = '1050'
}

export class Attribute {
  constructor(private Code: string, private Value: string, private Validation: string) {}
}

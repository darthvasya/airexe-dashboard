import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/core/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-pre-verification',
  templateUrl: './pre-verification.component.html',
  styleUrls: ['./pre-verification.component.css']
})
export class PreVerificationComponent implements OnInit {
  userAttributes: any;

  userData: any = {
    FirstName: new Attribute('', '', ''),
    Surname: new Attribute('', '', ''),
    MiddleName: new Attribute('', '', ''),
    Gender: new Attribute('', '', ''),
    BirthDate: new Attribute('', '', ''),
    CountryCode: new Attribute('', '', ''),
    Zip: new Attribute('', '', ''),
    State: new Attribute('', '', ''),
    City: new Attribute('', '', ''),
    Street: new Attribute('', '', ''),
    House: new Attribute('', '', ''),
    Flat: new Attribute('', '', ''),
    PassportType: new Attribute('', '', '')
  };
  questions: any;

  constructor(private userService: UserService) {
    this.userService.getUser().then((data) => {
      this.userData = JSON.parse(data['_body']);

      this.fillData();
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {

  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    console.log(this.userAttributes);

    this.userData.FirstName = this.checkAttribute(AttributeTypes.FirstName);
    this.userData.MiddleName = this.checkAttribute(AttributeTypes.MiddleName);
    this.userData.Surname = this.checkAttribute(AttributeTypes.Surname);
    this.userData.Gender = this.checkAttribute(AttributeTypes.Gender);
    this.userData.BirthDate = this.checkAttribute(AttributeTypes.BirthDate);
    this.userData.CountryCode = this.checkAttribute(AttributeTypes.CountryCode);
    this.userData.Zip = this.checkAttribute(AttributeTypes.Zip);
    this.userData.State = this.checkAttribute(AttributeTypes.State);
    this.userData.City = this.checkAttribute(AttributeTypes.City);
    this.userData.Street = this.checkAttribute(AttributeTypes.Street);
    this.userData.House = this.checkAttribute(AttributeTypes.House);
    this.userData.Flat = this.checkAttribute(AttributeTypes.Flat);
    this.userData.PassportType = this.checkAttribute(AttributeTypes.PassportType);
    this.userData.PassportNumber = this.checkAttribute(AttributeTypes.PassportNumber);
    this.userData.PassportIssueDate = this.checkAttribute(AttributeTypes.PassportIssueDate);
    this.userData.PassportExpirationDate = this.checkAttribute(AttributeTypes.PassportExpirationDate);
    this.userData.PassportPhoto = this.checkAttribute(AttributeTypes.PassportPhoto);
    this.userData.AddressPhoto = this.checkAttribute(AttributeTypes.AddressPhoto);
    this.userData.UserPhoto = this.checkAttribute(AttributeTypes.UserPhoto);

    console.log(this.userData);
 }

  checkAttribute(type) {
    const attr = _.find(this.userData.attrs, { 'code': type });
    console.log(attr);
    if ( attr !== undefined ) {
      return attr;
    } else {
      return new Attribute('', '', '');
    }
  }


}

enum AttributeTypes {
  Email = '1050',
  FirstName = '1001',
  Surname = '1002',
  MiddleName = '1003',
  Gender = '1060',
  BirthDate = '1010',
  CountryCode = '1021',
  Zip = '1031',
  State = '1032',
  City = '1033',
  Street = '1034',
  House = '1035',
  Flat = '1036',
  PassportType = '1041',
  PassportNumber = '1042',
  PassportIssueDate = '1043',
  PassportExpirationDate = '1044',
  PassportPhoto = '1070',
  AddressPhoto = '1071',
  UserPhoto = '1072'
}

export class Attribute {
  constructor(private code: string, private value: string, private validation: string) {}
}

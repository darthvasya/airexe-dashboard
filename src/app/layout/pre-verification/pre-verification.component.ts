import { Component, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CountryCodes } from './country-codes';

import { UserService } from './../../shared/core/user.service';
import { LoaderService } from './../../shared/core/loader.service';
import { NotificationService } from './../../shared/core/notification.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-pre-verification',
  templateUrl: './pre-verification.component.html',
  styleUrls: ['./pre-verification.component.css']
})
export class PreVerificationComponent implements OnInit {
  userAttributes: any;
  successSend = false;
  badSend = false;
  countryCodes: any = CountryCodes;

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
    PassportType: new Attribute('', '', ''),
    PassportNumber: new Attribute('', '', ''),
    PassportIssueDate: new Attribute('', '', ''),
    PassportExpirationDate: new Attribute('', '', ''),
    PassportPhoto: new Attribute('', '', ''),
    AddressPhoto: new Attribute('', '', ''),
    UserPhoto: new Attribute('', '', '')
  };

  questions: any;

  // tslint:disable-next-line:max-line-length
  constructor(private notificationService: NotificationService, private loaderService: LoaderService, private userService: UserService, private http: Http) {

  }

  ngOnInit() {
    this.loaderService.display(true);
    this.userService.getUser().then((data) => {
      this.userAttributes = JSON.parse(data['_body']).attrs;

      this.fillData();
      this.loaderService.display(false);
    })
    .catch(err => {
      this.loaderService.display(false);
    });

  }

  fillData() {
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
 }

  checkAttribute(type) {
    const attr = _.find(this.userAttributes, { 'code': type });
    if ( attr !== undefined ) {
      return attr;
    } else {
      return {code: type, value: '', validation: '0'};
    }
  }

  send() {
    this.successSend = false;
    this.badSend = false;

    this.loaderService.display(true);
    this.userService.updateAttributes(Object.values(this.userData)).then(data => {
      this.loaderService.display(false);
      this.successSend = true;
    }).catch(err => {
      this.badSend = true;
      this.loaderService.display(false);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('country-codes.json')
                    .map((res: any) => res.json());

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

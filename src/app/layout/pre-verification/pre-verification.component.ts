import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/core/user.service';

import { QuestionService } from './dynamic/question.service';

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
  questions: any[];

  constructor(private userService: UserService, private questionService: QuestionService) {

  }

  ngOnInit() {
    this.userService.getUser().then((data) => {
      this.userData = JSON.parse(data['_body']);
      this.questions = this.questionService.getQuestions(this.userData.attrs);
      this.fillData();
    })
    .catch(err => console.log(err));
  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    console.log(this.userAttributes);

    // tslint:disable-next-line:max-line-length
    this.userData.FirstName = _.find(this.userData.attrs, { 'code': AttributeTypes.FirstName }) === undefined ? { code: AttributeTypes.FirstName, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.FirstName });
    // tslint:disable-next-line:max-line-length
    this.userData.MiddleName = _.find(this.userData.attrs, { 'code': AttributeTypes.MiddleName }) === undefined ? { code: AttributeTypes.MiddleName, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.MiddleName });
    // tslint:disable-next-line:max-line-length
    this.userData.Surname = _.find(this.userData.attrs, { 'code': AttributeTypes.Surname }) === undefined ? { code: AttributeTypes.FirstName, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.Surname });
    // tslint:disable-next-line:max-line-length
    this.userData.Gender = _.find(this.userData.attrs, { 'code': AttributeTypes.Gender }) === undefined ? { code: AttributeTypes.Gender, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.Gender });
    // tslint:disable-next-line:max-line-length
    this.userData.BirthDate = _.find(this.userData.attrs, { 'code': AttributeTypes.BirthDate }) === undefined ? { code: AttributeTypes.BirthDate, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.BirthDate });
    // tslint:disable-next-line:max-line-length
    this.userData.CountryCode = _.find(this.userData.attrs, { 'code': AttributeTypes.CountryCode }) === undefined ? { code: AttributeTypes.CountryCode, value: '', validation: null} : _.find(this.userData.attrs, { 'code': AttributeTypes.CountryCode });
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
  constructor(private Code: string, private Value: string, private Validation: string) {}
}

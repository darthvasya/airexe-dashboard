import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { UserService } from './../../../shared/core/user.service';
import * as _ from 'lodash';


@Injectable()
export class QuestionService {
  userDataAttrs: any;

  constructor(private userService: UserService) {

  }

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions(userData) {

    this.userDataAttrs = userData;
    console.log(this.userDataAttrs);

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: this.checkAttributeValue(AttributeTypes.FirstName),
        required: true,
        order: 1,
        code: AttributeTypes.FirstName,
        validate: this.checkAttributeValidate(AttributeTypes.FirstName)
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
        code: AttributeTypes.Surname,
        validate: this.checkAttributeValidate(AttributeTypes.Surname)
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 3,
        code: AttributeTypes.MiddleName,
        validate: this.checkAttributeValidate(AttributeTypes.MiddleName)
      }),

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 4,
        code: AttributeTypes.FirstName,
        validate: this.checkAttributeValidate(AttributeTypes.FirstName)

      }),


    ];
    console.log(questions);
    return questions.sort((a, b) => a.order - b.order);
  }

  checkAttributeValue(type) {
    const attr = _.find(this.userDataAttrs, { 'code': type });
    if ( attr !== undefined ) {
      return attr.value;
    } else {
      return '';
    }
  }
  checkAttributeValidate(type) {
    const attr = _.find(this.userDataAttrs, { 'code': type });
    if ( attr !== undefined ) {
      return attr.validation;
    } else {
      return '';
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

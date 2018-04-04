import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }          from '@angular/forms';

import { PreVerificationComponent } from './pre-verification.component';

import { PreVerificationRoutingModule } from './pre-verification-routing.module';

import { HttpClient } from './../../shared/utils/HttpClient';
import { AuthService } from './../../shared/core/auth.service';
import { UserService } from './../../shared/core/user.service';

import { DynamicFormComponent }         from './dynamic/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic/dynamic-form-question.component';
import { QuestionService } from './dynamic/question.service';

@NgModule({
  imports: [
    CommonModule,
    PreVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PreVerificationComponent, DynamicFormComponent, DynamicFormQuestionComponent],
  providers: [UserService, HttpClient, AuthService, QuestionService]
})

export class PreVerificationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';

import { HttpClient } from './../../shared/utils/HttpClient';
import { AuthService } from './../../shared/core/auth.service';
import { UserService } from './../../shared/core/user.service';

import { ProfileRoutingModule } from './profile-routing.module';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ClipboardModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService, HttpClient, AuthService]
})
export class ProfileModule {
  isCopied1: boolean = false;
  isCopied2: boolean = false;
}

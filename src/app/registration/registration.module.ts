import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

import { AuthService } from '../shared/core/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule
  ],
  providers: [AuthService],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }

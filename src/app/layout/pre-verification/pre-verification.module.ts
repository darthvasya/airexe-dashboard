import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreVerificationComponent } from './pre-verification.component';

import { PreVerificationRoutingModule } from './pre-verification-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PreVerificationRoutingModule
  ],
  declarations: [PreVerificationComponent]
})
export class PreVerificationModule { }

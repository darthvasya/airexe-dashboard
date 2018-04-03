import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketStatusComponent } from './market-status.component';

import { MarketStatusRoutingModule } from './market-status-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MarketStatusRoutingModule
  ],
  declarations: [MarketStatusComponent]
})
export class MarketStatusModule { }

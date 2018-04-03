import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketStatusComponent } from './market-status.component';

const routes: Routes = [
    { path: '', component: MarketStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketStatusRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreVerificationComponent } from './pre-verification.component';

const routes: Routes = [
    { path: '', component: PreVerificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreVerificationRoutingModule { }

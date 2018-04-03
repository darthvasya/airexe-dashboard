import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'market-status', loadChildren: './market-status/market-status.module#MarketStatusModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'pre-verification', loadChildren: './pre-verification/pre-verification.module#PreVerificationModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }

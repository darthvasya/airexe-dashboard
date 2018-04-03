import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        Ng4TwitterTimelineModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: []
})
export class DashboardModule { }

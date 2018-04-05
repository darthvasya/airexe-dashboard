import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgxTwitterTimelineModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: []
})
export class DashboardModule { }

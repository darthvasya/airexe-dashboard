import { Component, OnInit } from '@angular/core';
import { Ng4TwitterTimelineService } from 'ng4-twitter-timeline/lib/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ng4TwitterTimelineService: Ng4TwitterTimelineService) { }

  ngOnInit() {
  }

}

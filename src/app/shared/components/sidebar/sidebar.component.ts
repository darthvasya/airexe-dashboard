import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
      path: '/dashboard',
      title: 'General Information',
      icon: 'bubble_chart',
      class: ''
  },
  { path: '/market-status', title: 'Market Status', icon: 'bubble_chart', class: '' },
  { path: '/profile', title: 'My Account', icon: 'bubble_chart', class: '' },
  { path: '/pre-verification', title: 'Pre-Verification Form', icon: 'bubble_chart', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }



}

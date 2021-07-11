import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  navLinks = [
    {
      icon: 'home',
      name: 'Home',
      path: '/'
    },
    {
      icon: 'pets',
      name: 'Pets',
      path: '/pets'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetsService } from 'src/app/pets.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string = '';
  subscription;

  constructor(private petsService: PetsService, private router: Router) {
    this.token = petsService.token;
    this.subscription = petsService.tokenChange.subscribe((value) => { 
      this.token = value; 
    });
  }

  ngOnInit(): void {
  }

  handleLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  handleLogoutButtonClick() {
    localStorage.clear();
    this.petsService.setToken(null);
    this.router.navigate(['/login'])
  }

}

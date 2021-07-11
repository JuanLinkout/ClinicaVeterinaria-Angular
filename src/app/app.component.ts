import { Component } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  token: string = '';
  subscription: any;

  constructor(private petsService: PetsService) {
    this.token = localStorage.getItem("token");
    this.petsService.setToken(this.token);
    this.subscription = petsService.tokenChange.subscribe((value) => { 
      this.token = value; 
    console.log(this.token)

    });
  }

  ngOnInit(): void {
    
  }

}
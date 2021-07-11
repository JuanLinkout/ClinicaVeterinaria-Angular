import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PetsService } from 'src/app/pets.service';
import { Token } from 'src/types/Token';
import { User } from 'src/types/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private petsService: PetsService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loading = false;

  userInfo: User = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  handleRegisterButtonClick() {
    this.loading = true;
      this.petsService.signup(this.userInfo).subscribe(data => {
        if (data) {
          const user: User = {
            email: this.userInfo.email,
            password: this.userInfo.password,
          }
  
          this.petsService.login(user).subscribe((data: Token) => {
            if (data.accessToken) {
              this.petsService.setToken(data.accessToken);
              return this.router.navigateByUrl('/');
            }    
          });
        }
      }, e => {
        this.openSnackBar(e.error.error)
        this.loading = false;
      });

  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PetsService } from 'src/app/pets.service';
import { Token } from 'src/types/Token';
import { User } from 'src/types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  constructor(private petsService: PetsService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loading = false;
  hide = true;

  userInfo: User = {
    email: 'teste@gmail.com',
    password: 'teste123',
  }

  handleLoginButtonClick() {
    this.loading = true;
    this.petsService.login(this.userInfo).subscribe((data: Token) => {
      if (data.accessToken) {
        this.petsService.setToken(data.accessToken);
        return this.router.navigateByUrl('/');
      }
    }, e => {
      this.openSnackBar("Usuário ou senha inválido.");
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

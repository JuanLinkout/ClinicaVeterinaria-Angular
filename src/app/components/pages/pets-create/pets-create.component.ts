import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetsService } from 'src/app/pets.service';
import { Pet } from 'src/types/Pet';

@Component({
  selector: 'app-pets-create',
  templateUrl: './pets-create.component.html',
  styleUrls: ['./pets-create.component.css']
})
export class PetsCreateComponent implements OnInit {

  constructor(private petsService: PetsService, private snackBar: MatSnackBar) { }

  pet: Pet = {
    name: '',
    age: 0,
    petPhotoUrl: '',
    breed: '',
    owner: '',
    color: '',
    description: '',
    weight: '',
  }

  pets: Pet[] = [];

  loading: boolean = false;

  ngOnInit(): void {
    this.petsService.getPets().subscribe(data => this.pets = data as Pet[]);
  }

  createPet(): void {
    if (!this.pet.name) {
      return this.openSnackBar('Informe um name válido.')
    }
    this.loading = true;
    this.petsService.createPet(this.pet).subscribe(response => {
      this.openSnackBar('Pet cadastrado com sucesso.')
      this.handleResetInput();
      this.loading = false;
    }, e => {
      this.loading = false;
      this.openSnackBar(e.error.error)
    });
  }

  handleResetInput(): void {
    this.pet = {
      name: '',
      age: 0,
      petPhotoUrl: '',
      breed: '',
      owner: '',
      color: '',
      description: '',
      weight: '',
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
  }

}

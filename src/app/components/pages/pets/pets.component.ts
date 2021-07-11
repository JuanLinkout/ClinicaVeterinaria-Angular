import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../pets.service';
import { Pet } from 'src/types/Pet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  constructor(private petsService: PetsService, private snackBar: MatSnackBar) { }

  pets: Pet[] = [];

  loading: boolean = false;

  displayMessage: string = "";

  ngOnInit(): void {
    this.getAllPets();
  }

  getAllPets() {
    this.loading = true;
    this.petsService.getPets().subscribe((data: Pet[]) => {
      if (data) {
        this.pets = data as Pet[];
      } else {
        this.pets = [];
        this.displayMessage = "Nenhuma pet cadastrado."
      }
      this.loading = false;
    }, e => {
      this.loading = false;
      this.displayMessage = e.error.error;
    });
  }

  deletePet(petId): void {
    this.petsService.deletePet(petId).subscribe(data => {
      this.getAllPets();
      this.openSnackBar('Pet deletado com sucesso.')
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

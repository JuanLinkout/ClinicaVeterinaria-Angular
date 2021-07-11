import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pet } from 'src/types/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://backend-veterinaria.glitch.me/api";
  petsUrl: string = this.baseUrl + "/pets/";
  pets: Pet[] = [];
  token: string = "";
  tokenChange: Subject<string> = new Subject<string>();

  change() {
    this.tokenChange.next(this.token);
  }

  setToken(tokenValue) {
    if (tokenValue) {
      localStorage.setItem("token", tokenValue);
    }
    this.token = tokenValue;
    this.change();
  }

  login(userInfo): Observable<Object> {
    return this.http.post(this.baseUrl + "/login", userInfo)
  }

  signup(userInfo): Observable<Object> {
    return this.http.post(this.baseUrl + "/signup", userInfo);
  } 

  getPets(): Observable<Object> {
    console.log(this.token)
    return this.http.get(this.petsUrl, {
      headers: {
        "x-access-token": this.token,
      }
    });
  }

  createPet(pet: Pet): Observable<Object> {
    if (!pet.petPhotoUrl) pet.petPhotoUrl = 'data:image/png;base64,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';

    const newPet = JSON.parse(JSON.stringify(pet));
    return this.http.post(this.petsUrl, newPet, {
      headers: {
        "x-access-token": this.token,
      }
    });
  }

  deletePet(petId: string): Observable<Object> {
    return this.http.delete(this.petsUrl + petId, {
      headers: {
        "x-access-token": this.token,
      }
    });
  }

  updatePet(updatedPet: Pet): Observable<Object> {
    return this.http.put(this.petsUrl + updatedPet.id, updatedPet, {
      headers: {
        "x-access-token": this.token,
      }
    });
  }
}

import { PetsCreateComponent } from './components/pages/pets-create/pets-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { PetsComponent } from './components/pages/pets/pets.component';
import { PetsDetailsComponent } from './components/pages/pets-details/pets-details.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: RegisterComponent
  }, 
  {
    path: 'pets',
    component: PetsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pets/details/:id',
    component: PetsDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pets/create',
    component: PetsCreateComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

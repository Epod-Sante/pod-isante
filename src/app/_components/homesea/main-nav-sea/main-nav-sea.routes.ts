import { Routes } from '@angular/router';
import { MainNavSeaComponent } from './main-nav-sea.component';
import { HomeComponent } from '../../home/home.component';
import { RegisterComponent } from '../../register/register.component';
import { ProfileComponent } from '../../profile/profile.component';
import { PatientComponent } from '../../home-pro/patient/patient.component';
import {HomeProComponent} from "../../home-pro/home-pro.component";
import {HomeseaComponent} from "../homesea.component";

export const mainNavSeaRoutes : Routes = [
  {
    path: 'main-nav-sea',
    component: MainNavSeaComponent,
    children: [
      { path: '', redirectTo: 'home/searcher', pathMatch: 'full' },
      { path: 'home/searcher', component: HomeseaComponent},
      { path: 'patient', component: PatientComponent}

    ]
  }
];

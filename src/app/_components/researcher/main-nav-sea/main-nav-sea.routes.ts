import { Routes } from '@angular/router';
import { MainNavSeaComponent } from './main-nav-sea.component';
import { HomeComponent } from '../../admin/home.component';
import { RegisterComponent } from '../../register/register.component';
import { ProfileComponent } from '../../admin/profile/profile.component';
import { PatientComponent } from '../../clinician/patient/patient.component';
import {HomeProComponent} from "../../clinician/home-pro.component";
import {HomeseaComponent} from "../homesea.component";

export const mainNavSeaRoutes : Routes = [
  {
    path: 'main-nav-sea',
    component: MainNavSeaComponent,
    children: [
      { path: '', redirectTo: 'admin/researcher', pathMatch: 'full' },
      { path: 'admin/researcher', component: HomeseaComponent},
      { path: 'patient', component: PatientComponent}

    ]
  }
];

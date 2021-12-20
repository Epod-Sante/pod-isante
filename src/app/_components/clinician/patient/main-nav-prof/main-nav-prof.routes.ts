import { Routes } from '@angular/router';
import { MainNavProfComponent } from './main-nav-prof.component';
import { PatientComponent } from '../patient.component';
import {HomeProComponent} from "../../home-pro.component";


export const mainNavProfRoutes : Routes = [

  {
    path: 'main-nav-prof',
    component: MainNavProfComponent,
    children: [
      { path: '', redirectTo: 'admin/professinel', pathMatch: 'full' },
      { path: 'admin/professinel', component: HomeProComponent},
      { path: 'patient', component: PatientComponent}

    ]
  }
];

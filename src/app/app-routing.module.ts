import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './_components/admin/register/register.component';
import {LoginComponent} from './_components/clinician/login/login.component';
import {HomeComponent} from './_components/admin/home.component';
import {AuthGuard} from './_guards';
import {Error404Component} from './_components/error404/error404.component';
import {ForgetpasswordComponent} from './_components/clinician/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './_components/clinician/resetpassword/resetpassword.component';
import {HomeProComponent} from './_components/clinician/home-pro.component';
import {HomeseaComponent} from './_components/searcher/homesea.component';
import {PagepatientComponent} from './_components/patient/pagepatient.component';
import {PatientloginComponent} from './_components/patient/patientlogin/patientlogin.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {path: 'admin/professional', component: HomeProComponent, canActivate: [AuthGuard]},
  {path: 'admin/searcher', component: HomeseaComponent, canActivate: [AuthGuard]},
  {path: 'forgetpassword', component: ForgetpasswordComponent},
  {path: 'update/password', component: ResetpasswordComponent},
  {path: 'user/invite', component: RegisterComponent},
  {path: 'patient/login', component: PatientloginComponent},
  {path: 'patient/questionnaire', component: PagepatientComponent},
  {path: '**', component: Error404Component},




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

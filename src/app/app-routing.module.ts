import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './_components/register/register.component';
import {LoginComponent} from './_components/clinician/login/login.component';
import {HomeComponent} from './_components/admin/home.component';
import {AuthGuard} from './_guards';
import {Error404Component} from './_components/error404/error404.component';
import {ForgetpasswordComponent} from './_components/clinician/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './_components/clinician/resetpassword/resetpassword.component';
import {HomeProComponent} from './_components/clinician/home-pro.component';
import {HomeseaComponent} from './_components/researcher/homesea.component';
import {PagepatientComponent} from './_components/patient/pagepatient.component';
import {PatientloginComponent} from './_components/patient/patientlogin/patientlogin.component';
import {
  NbButtonModule,
  NbCalendarModule, NbCalendarRangeModule,
  NbCardModule,
  NbCheckboxModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbSelectModule, NbSidebarModule, NbSpinnerModule,
  NbStepperModule, NbToastrModule
} from "@nebular/theme";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {QRCodeModule} from "angularx-qrcode";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {ChartsModule} from "ng2-charts";
import {homeRoutes} from "./_components/admin/home-routing.module";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {path: 'admin/professional', component: HomeProComponent, canActivate: [AuthGuard]},
  {path: 'admin/researcher', component: HomeseaComponent, canActivate: [AuthGuard]},
  {path: 'forgetpassword', component: ForgetpasswordComponent},
  {path: 'update/password', component: ResetpasswordComponent},
  {path: 'user/invite', component: RegisterComponent},
  {path: 'patient/login', component: PatientloginComponent},
  {path: 'patient/questionnaire', component: PagepatientComponent, runGuardsAndResolvers: 'always'},
  {
    path: 'signup',
    component: RegisterComponent
  },
  {path: '**', component: Error404Component},



];


@NgModule({
 imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
NbIconModule,
    NbCalendarModule,
    MatRadioModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule, NbInputModule,
    CommonModule,
    ReactiveFormsModule,
    QRCodeModule, NbCardModule, NbStepperModule, NgxSliderModule, NbCheckboxModule, NbSelectModule,
    NbButtonModule, NbIconModule, NbSidebarModule, NbMenuModule,
    NbLayoutModule, NbPopoverModule, ChartsModule, NbCalendarRangeModule, NbSpinnerModule, NbFormFieldModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

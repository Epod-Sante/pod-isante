import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserIdleModule} from 'angular-user-idle';
import {RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';

import {MatListModule} from '@angular/material/list';

import {DatePipe} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {LoginComponent} from './_components/clinician/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainNavComponent} from './_components/admin/main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {OAuthModule} from 'angular-oauth2-oidc';
import {MatInputModule} from '@angular/material/input';
import {Error404Component} from './_components/error404/error404.component';
import {RegisterComponent} from './_components/register/register.component';
import {HomeComponent} from './_components/admin/home.component';
import {ProfileComponent} from './_components/admin/profile/profile.component';
import {PatientComponent} from './_components/clinician/patient/patient.component';
import {ForgetpasswordComponent} from './_components/clinician/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './_components/clinician/resetpassword/resetpassword.component';
import {InviteComponent} from './_components/admin/invite/invite.component';
import {MainNavProfComponent} from './_components/clinician/patient/main-nav-prof/main-nav-prof.component';
import {MainNavModuleProf} from './_components/clinician/patient/main-nav-prof/main-nav.module-prof';
import {HomeProComponent} from './_components/clinician/home-pro.component';
import {ListUsersComponent} from './_components/admin/list-users/list-users.component';
import {HomeseaComponent} from './_components/researcher/homesea.component';
import {MainNavSeaComponent} from './_components/researcher/main-nav-sea/main-nav-sea.component';
import {RechercheComponent} from './_components/researcher/recherche/recherche.component';
import {ListPatientsComponent} from './_components/clinician/patient/list-patients/list-patients.component';
import {PatientProfileComponent} from './_components/clinician/patient/patient-profile/patient-profile.component';
import {AddpatientComponent} from './_components/clinician/patient/addpatient/addpatient.component';
import {ExamencliniqueComponent} from './_components/clinician/patient/examen-clinique/examenclinique.component';
import {SociodemoComponent} from './_components/clinician/patient/sociodemo/sociodemo.component';
import {AntecedantsComponent} from './_components/clinician/patient/antecedants/antecedants.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {ListVisitesComponent} from './_components/clinician/patient/list-visites/list-visites.component';
import {RapportComponent} from './_components/clinician/patient/rapport/rapport.component';
import {AffectpodometreComponent} from './_components/clinician/patient/affectpodometre/affectpodometre.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DevicesComponent} from './_components/admin/devices/devices.component';
import {RecomandationComponent} from './_components/clinician/patient/recomandation/recomandation.component';
import {PagepatientComponent} from './_components/patient/pagepatient.component';
import {PatientloginComponent} from './_components/patient/patientlogin/patientlogin.component';
import {BreqComponent} from './_components/patient/Breq/breq.component';
import {QuizComponent} from './_components/patient/Breq/quiz/quiz.component';
import {HomeRoutingModule} from './_components/admin/home-routing.module';
import {HomeProRoutingModule} from './_components/clinician/home-pro.routing.module';
import {HomeSeaRoutingModule} from './_components/researcher/homesea.routing.module';
import {PagePatientRoutingModule} from './_components/patient/pagepatient.routing';
import {AddDialogComponent} from './_components/clinician/appointment-dialogs/add/add.dialog.component';
import {DeleteDialogComponent} from './_components/clinician/appointment-dialogs/delete/delete.dialog.component';
import {EditDialogComponent} from './_components/clinician/appointment-dialogs/edit/edit.dialog.component';
import {DetailsRecoComponent} from './_components/clinician/patient/recomandation/details-reco/details-reco.component';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {ErrorInterceptor} from './_helpers';
import {EncrDecrService} from './_services/EncrDecrService';
import {IddleUserDialogComponent} from './_components/iddle-user-dialog/iddle-user-dialog.component';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {BilanLipidiqueComponent} from './_components/clinician/patient/bilan-lipidique/bilan-lipidique.component';
import {SociodemoComponentPatient} from './_components/patient/sociodemopatient/sociodemo-component-patient.component';
import {RecomandationPatientComponent} from './_components/patient/recomandation-patient/recomandation-patient.component';
import {GpaqComponent} from './_components/patient/gpaq/gpaq.component';
import {GpaqQuizComponent} from './_components/patient/gpaq/quiz/quiz.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TwoDigitDecimaNumberDirective} from './_components/clinician/patient/examen-clinique/two-digit-decima-number.directive';
import {OptionComponent} from './_components/clinician/patient/histoire-sante/option/option.component';
import {MatCardModule} from '@angular/material/card';
import {NgMaterialMultilevelMenuModule, MultilevelMenuService} from 'ng-material-multilevel-menu';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbIconModule,
  NbWindowModule,
  NbPopoverModule,
  NbCardModule,
  NbToastrModule,
  NbFormFieldModule,
  NbInputModule,
  NbAlertModule,
  NbCheckboxModule,
  NbDialogModule,
  NbSelectModule,
  NbTabsetModule, NbDatepickerModule, NbTimepickerModule, NbTreeGridModule, NbToggleModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {ObjectifV2Module} from './_components/clinician/patient/objectif-v2/objectif-v2.module';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {WindowComponent} from './_components/window/window.component';
import {QuizindividComponent} from './_components/clinician/patient/quizindivid/quizindivid.component';


@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimaNumberDirective,
    MainNavSeaComponent,
    LoginComponent,
    Error404Component,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PatientComponent,
    MainNavComponent,
    DevicesComponent,
    ListPatientsComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    MainNavProfComponent,
    HomeProComponent,
    ListUsersComponent,
    HomeseaComponent,
    RechercheComponent,
    PatientProfileComponent,
    AddpatientComponent,
    ExamencliniqueComponent,
    SociodemoComponent,
    SociodemoComponentPatient,
    AntecedantsComponent,
    ListVisitesComponent,
    RapportComponent,
    AffectpodometreComponent,
    RecomandationComponent,
    PagepatientComponent,
    PatientloginComponent,
    InviteComponent,
    BreqComponent,
    QuizComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    IddleUserDialogComponent,
    RecomandationPatientComponent,
    GpaqComponent,
    GpaqQuizComponent,
    WindowComponent,
    QuizindividComponent,
  ],
  imports: [
    NbTimepickerModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NgxSliderModule,
    ObjectifV2Module, NbCheckboxModule,
    BrowserModule,
    FormsModule, MatCardModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    // AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    HomeRoutingModule,
    HomeProRoutingModule,
    HomeSeaRoutingModule,
    PagePatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    NgMaterialMultilevelMenuModule,
    MainNavModuleProf,
    RouterModule,
    ChartsModule,
    MatDialogModule,
    RouterModule,
    NgIdleKeepaliveModule.forRoot(),
    OAuthModule.forRoot(),
    SchedulerModule,
    MatButtonToggleModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule, NbSidebarModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbMenuModule,
    NbActionsModule, NbButtonModule, NbIconModule,
    NbPopoverModule, NbCardModule, NbFormFieldModule,
    NbInputModule, NbAlertModule, NbCheckboxModule, NbSelectModule, NbTabsetModule, NbDatepickerModule, NbTreeGridModule, NbToggleModule,
  ],
//

  providers: [EncrDecrService, DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []},
    MultilevelMenuService
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    OptionComponent,
    SociodemoComponent,
    AddDialogComponent,
    RecomandationComponent,
    GpaqComponent, BreqComponent, GpaqQuizComponent, QuizComponent,
    DetailsRecoComponent,
    DeleteDialogComponent, EditDialogComponent, IddleUserDialogComponent, BilanLipidiqueComponent, WindowComponent],
  exports: [
    RecomandationComponent,
    RecomandationPatientComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}


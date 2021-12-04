import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PatientloginComponent} from './patientlogin/patientlogin.component';
import {PagepatientComponent} from './pagepatient.component';
import {BreqComponent} from './Breq/breq.component';
import {SociodemoComponentPatient} from './sociodemopatient/sociodemo-component-patient.component';
import {RecomandationPatientComponent} from './recomandation-patient/recomandation-patient.component';
import {GpaqComponent} from './gpaq/gpaq.component';


const pagePatientRoutes: Routes = [
  {
    path: '',
    component: PagepatientComponent,
    children: [
      {
        path: '',
        component: PagepatientComponent,

      },
      {path: 'breq', component: BreqComponent},
      {path: 'gpaq', component: GpaqComponent},
      {path: 'breq/:id', component: BreqComponent},
      {path: 'socio', component: SociodemoComponentPatient},
      {path: 'socio/:id', component: SociodemoComponentPatient},
      {path: 'recom', component: RecomandationPatientComponent},
      {path: 'recom/:id', component: RecomandationPatientComponent}

    ],

  }


];

@NgModule({
  imports: [RouterModule.forChild(pagePatientRoutes)],
  exports: [RouterModule]
})
export class PagePatientRoutingModule {
}

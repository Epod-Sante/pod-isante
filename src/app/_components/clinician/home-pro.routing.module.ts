import {RouterModule, Routes} from '@angular/router';
import {HomeProComponent} from './home-pro.component';
import {PatientComponent} from './patient/patient.component';
import {AddpatientComponent} from './patient/addpatient/addpatient.component';
import {ListPatientsComponent} from './patient/list-patients/list-patients.component';
import {DetailsRecoComponent} from './patient/recomandation/details-reco/details-reco.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BilanLipidiqueComponent} from './patient/bilan-lipidique/bilan-lipidique.component';
import {HistoireSanteComponent} from './patient/histoire-sante/histoire-sante.component';
import {QRCodeModule} from 'angularx-qrcode';
import {OptionComponent} from './patient/histoire-sante/option/option.component';
import {ObjectifComponent} from './patient/objectif/objectif.component';
import {NgModule} from '@angular/core';
import {ObjectifV2Component} from './patient/objectif-v2/objectif-v2.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule, NbLayoutModule, NbMenuModule, NbPopoverModule,
  NbSelectModule, NbSidebarModule,
  NbStepperModule,
} from '@nebular/theme';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import { SideBarFabButtonComponent } from './side-bar-fab-button/side-bar-fab-button.component';
import { FabButtonComponent } from './patient/fab-button/fab-button.component';
import { RapportGlobalComponent } from './patient/rapport-global/rapport-global.component';
import { ObjectifReadComponent } from './patient/objectif-read/objectif-read.component';
import { ExamenCliniqueBilanLipidiqueReadComponent } from './patient/examen-clinique-bilan-lipidique-read/examen-clinique-bilan-lipidique-read.component';
import { RapportVisuelComponent } from './patient/rapport-visuel/rapport-visuel.component';

export const homeProRoutes: Routes = [
  {
    path: '',
    component: HomeProComponent,
    children: [
      {
        path: '',
        component: ListPatientsComponent
      },
      {path: 'patient', component: PatientComponent},
      {path: 'addpatient', component: AddpatientComponent},
      {path: 'listpatient', component: ListPatientsComponent},
      {path: 'report/:id', component: RapportGlobalComponent},

      {path: 'reco', component: HistoireSanteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeProRoutes),
    MatRadioModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    QRCodeModule, NbCardModule, NbStepperModule, NgxSliderModule, NbCheckboxModule, NbSelectModule,
    NbButtonModule, NbIconModule, NbSidebarModule, NbMenuModule, NbLayoutModule, NbPopoverModule],
    exports: [RouterModule,
        HistoireSanteComponent,
        BilanLipidiqueComponent, ObjectifComponent, ObjectifV2Component, SideBarFabButtonComponent,
      FabButtonComponent, ObjectifReadComponent, ExamenCliniqueBilanLipidiqueReadComponent, RapportVisuelComponent],
  declarations: [
    DetailsRecoComponent,
    BilanLipidiqueComponent,
    HistoireSanteComponent,
    OptionComponent, ObjectifComponent, ObjectifV2Component,
    SideBarFabButtonComponent, FabButtonComponent, RapportGlobalComponent,
    ObjectifReadComponent, ExamenCliniqueBilanLipidiqueReadComponent, RapportVisuelComponent],
  providers: []
})
export class HomeProRoutingModule {
}

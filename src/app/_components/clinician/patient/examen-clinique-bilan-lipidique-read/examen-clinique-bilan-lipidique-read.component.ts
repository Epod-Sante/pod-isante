import {Component, Input, OnInit} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {LipidProfileDto} from '../../../../dto/LipidProfilDto';
import {ExamencliniqueComponent} from '../examen-clinique/examenclinique.component';
import {NbWindowControlButtonsConfig, NbWindowService} from '@nebular/theme';
import {BilanLipidiqueComponent} from "../bilan-lipidique/bilan-lipidique.component";

@Component({
  selector: 'app-examen-clinique-bilan-lipidique-read',
  templateUrl: './examen-clinique-bilan-lipidique-read.component.html',
  styleUrls: ['./examen-clinique-bilan-lipidique-read.component.css']
})
export class ExamenCliniqueBilanLipidiqueReadComponent implements OnInit {
  @Input() patient: PatientDto;
  selectedItem = 0;
  selectedItem2 = 0;
  examenClinique: ClinicalExaminationDto[] = [];
  bilanLipidique: LipidProfileDto[] = [];



  constructor(private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    this.examenClinique = this.patient.medicalFile.clinicalExamination;
    this.bilanLipidique = this.patient.medicalFile.lipidProfiles;
  }




  onChangeClinicalExamination() {
    this.examenClinique = this.patient.medicalFile.clinicalExamination;
  }

  onChangeBilanLipidique() {
    this.bilanLipidique = this.patient.medicalFile.lipidProfiles;
  }

  addClinicalExamination() {
    const component = ExamencliniqueComponent;
    const title = 'Examen clinique ';
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title  , buttons: buttonsConfig} );
  }
  addBilanLipidique() {
    const component = BilanLipidiqueComponent;
    const title = 'Bilan sanguin ';
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title  , buttons: buttonsConfig} );
  }

}

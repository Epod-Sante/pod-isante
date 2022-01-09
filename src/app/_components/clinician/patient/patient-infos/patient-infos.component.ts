import {Component, OnInit} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {Antecedent} from '../histoire-sante/histoire-sante.component';

@Component({
  selector: 'app-patient-infos',
  templateUrl: './patient-infos.component.html',
  styleUrls: ['./patient-infos.component.css']
})
export class PatientInfosComponent implements OnInit {
  result: string;
  patient: PatientDto;
  selectedItem = 0;
  socioDemographicVariables: SocioDemographicVariablesDto;
  antecedent: MedicalFileHistoryDto;
  antecedents1: MedicalFileHistoryDto[];
  antecedents2: MedicalFileHistoryDto;
  antecedents3: MedicalFileHistoryDto[];



  constructor() {}

  ngOnInit(): void {
  }

  init(patient: PatientDto){
    this.result = JSON.stringify(patient);
    this.patient = patient;
    this.socioDemographicVariables = JSON.parse(this.patient.socioDemographicVariables) as SocioDemographicVariablesDto;
    this.antecedents1 = this.patient.medicalFile.medicalFileHistory;
    this.antecedents1 = this.antecedents1.filter(item => item.antecedents !== null);
    this.antecedents2 = this.antecedents1.at(this.selectedItem);
    this.antecedents3 = JSON.parse(this.antecedents2.antecedents);
  }

  onChangeMH() {

  }

  select(i) {
    if (i !== this.selectedItem){
      this.selectedItem = i;
      this.antecedents2 = this.antecedents1.at(this.selectedItem);
      this.antecedents3 = JSON.parse(this.antecedents2.antecedents);
    }

  }
}
export interface Antecedents {
  date: string;
  antecedents: MedicalFileHistoryDto[];
}

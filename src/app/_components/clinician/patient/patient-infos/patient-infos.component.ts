import {Component, OnInit} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';

@Component({
  selector: 'app-patient-infos',
  templateUrl: './patient-infos.component.html',
  styleUrls: ['./patient-infos.component.css']
})
export class PatientInfosComponent implements OnInit {
  result: string;
  patient: PatientDto;
  selectedItem = 0;


  constructor() {
  }

  ngOnInit(): void {
  }

  init(patient: PatientDto){
    this.result = JSON.stringify(patient);
    this.patient = patient;
  }

  onChangeMH() {

  }
}

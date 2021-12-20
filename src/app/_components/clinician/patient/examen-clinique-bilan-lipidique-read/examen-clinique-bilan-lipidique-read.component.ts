import {Component, Input, OnInit} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {ObjectifModel} from "../objectif-v2/ObjectifModel";
import {ClinicalExaminationDto} from "../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto";
import {LipidProfileDto} from "../../../../dto/LipidProfilDto";

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



  constructor() {
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

}

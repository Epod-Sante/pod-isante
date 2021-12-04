import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {DialogDataReport} from '../patient-profile/patient-profile.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {ActivatedRoute, Router} from '@angular/router';
import {Response} from '../../../../dto';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {PatientService} from '../../../../_services/patient.service';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';

@Component({
  selector: 'app-rapport-global',
  templateUrl: './rapport-global.component.html',
  styleUrls: ['./rapport-global.component.css']
})
export class RapportGlobalComponent implements OnInit {

  constructor(public route: ActivatedRoute, private  patientService: PatientService) {

    this.route.params.subscribe(params => {
      this.patientId = params.id;
    });

    console.log(this.patientId);

    this.getOnePatient();
    this.getQuestionnaires();
  }
  response: Response;
  patient: PatientDto;
  private patientId: any;
  questionnaires: QuestionnaireDto[];
  gpaq = false;
  breq = false;
  questionnaireResponse: any;
  questionnaireObj: [];
  breqScore = [];
  gpaqScore = [];


  ngOnInit(): void {
    console.log(this.gpaq);
    console.log(this.breq);
  }


  public getOnePatient = () => {
    this.patientService.getPatient(this.patientId).subscribe(patients => {
      const p = patients as Response;
      this.patient = JSON.parse(JSON.stringify(p.object))as PatientDto;
    });
  }

  public printPDF(): void {
    window.print();
  }
  public getQuestionnaires = () => {
    this.patientService.getQuiz(this.patientId).subscribe(questionnaires => {
      this.questionnaireResponse = questionnaires;
      this.response = JSON.parse(JSON.stringify(questionnaires)) as Response;
      this.questionnaireObj = this.response.object as [];
      this.questionnaires = this.response.object as QuestionnaireDto[];
      this.questionnaires.forEach(elm => {
        if (elm.type === 'GPAQ') {
          this.gpaq = true;
          const obj = JSON.parse(elm.value);
          this.gpaqScore.push(obj.score);
        }}
      );
      this.questionnaires.forEach(elm => {
        if (elm.type === 'BREQ') {
          this.breq = true;
          const obj = JSON.parse(elm.value);
          this.breqScore.push(obj.score);
        }}
      );

      console.log(this.gpaqScore);
      console.log(this.breqScore);
    });
  }

}

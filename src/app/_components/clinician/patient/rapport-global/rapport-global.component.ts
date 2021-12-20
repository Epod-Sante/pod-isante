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
import {BREQValue, QuestionnaireBREQ} from "../../../../dto/QuestionnaireBREQ";
import {GPAQValue, QuestionnaireGPAQ} from "../../../../dto/QuestionnaireGPAQ";

@Component({
  selector: 'app-rapport-global',
  templateUrl: './rapport-global.component.html',
  styleUrls: ['./rapport-global.component.css']
})
export class RapportGlobalComponent implements OnInit {
  private barChar: any[];
  private vigoureux: number;
  private moderee: number;
  private marche: number;
  private sedentaire: number;
  response: Response;
  patient: PatientDto;
  private patientId: any;
  questionnaires: QuestionnaireDto[];
  questionnaireResponse: any;
  questionnaireObj = [];
  breqScore = [];
  gpaqScore = [];
  public val: Resultat [] = [];
  questionnaireBREQ: QuestionnaireBREQ[] = [];
  questionnaireGPAQ: QuestionnaireGPAQ[] = [];

  constructor(public route: ActivatedRoute, private  patientService: PatientService) {

    this.route.params.subscribe(params => {
      this.patientId = params.id;
    });
    this.getOnePatient();
    this.getQuestionnaires();
    this.getRecommendations();
  }


  ngOnInit(): void {
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
      console.log(this.questionnaireObj.length);
      this.questionnaires = this.response.object as QuestionnaireDto[];
      this.questionnaires.forEach(elm => {
        if (elm.type === 'GPAQ') {
          const value = JSON.parse(elm.value) as GPAQValue;
          this.questionnaireGPAQ.push(new QuestionnaireGPAQ(elm.id, elm.patientId, elm.type, value, elm.date));
        }
        if (elm.type === 'BREQ') {
          const value = JSON.parse(elm.value) as BREQValue;
          this.questionnaireBREQ.push(new QuestionnaireBREQ(elm.id, elm.patientId, elm.type, value, elm.date));
        }}
      );
    });

  }


  public getQuiz = () => {
    this.patientService.getQuiz(this.patient.id).subscribe(quiz => {
      const response = JSON.parse(JSON.stringify(quiz)) as Response;
      const questionnaires = response.object as QuestionnaireDto[];

      for (const x of questionnaires) {
        const valeur = JSON.parse(x.value);
        if (x.type === 'GPAQ') {
          for (let i = 0; i < valeur.reponses.length; i++) {
            if ((valeur.reponses[i].hr === null || valeur.reponses[i].hr === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].hr = 0;
            }
            if ((valeur.reponses[i].minu === null || valeur.reponses[i].minu === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].minu = 0;
            }
            if ((valeur.reponses[i].jr === null || valeur.reponses[i].jr === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].jr = 0;
            }
          }
          /*  Vigoureux = (rép Q2xrép Q3) + (rép Q14xrép Q15) en minutes

      Modérée = (rép Q5xrép Q6) + (rép Q11xrép Q12) + (rép Q17xrép Q18) en minutes

      Marche = (rép Q20xrép Q21) + (rép Q8xrép Q9) en minutes

      Sédentaire = rép Q22 en minutes*/
        }

        this.val.push({date: x.date, value: valeur, id: x.id, type: x.type});

      }
      this.val.forEach(elm => console.log(elm));
    });
  }

  public show_barChart(valeur: string) {
    this.barChar = [];
    this.vigoureux = 0;
    this.moderee = 0;
    this.marche = 0;
    this.sedentaire = 0;
    const x = JSON.parse(JSON.stringify(valeur));
    this.vigoureux = (x.reponses[1].jr * (x.reponses[2].hr * 60 + x.reponses[2].minu)) +
      (x.reponses[13].jr * (x.reponses[14].hr * 60 + x.reponses[14].minu));
    this.moderee = (x.reponses[4].jr * (x.reponses[5].hr * 60 + x.reponses[5].minu)) +
      (x.reponses[10].jr * (x.reponses[11].hr * 60 + x.reponses[11].minu)) +
      (x.reponses[16].jr * (x.reponses[17].hr * 60 + x.reponses[17].minu));
    this.marche = (x.reponses[19].jr * (x.reponses[20].hr * 60 + x.reponses[20].minu)) +
      (x.reponses[7].jr * (x.reponses[8].hr * 60 + x.reponses[8].minu));
    this.sedentaire = (x.reponses[22].hr * 60 + x.reponses[22].minu);
    this.barChar = [
      {data: [this.vigoureux, 0], label: 'Vigoureux '},
      {data: [this.moderee, 0], label: 'Modérée'},
      {data: [this.marche, 0], label: 'Marche'},
      {data: [this.sedentaire, 0], label: 'Sédentaire'}
    ];
    console.log('+++++++++++++' + this.barChar);
    return this.barChar;
  }

  public getRecommendations = () => {
    this.patientService.getAllReco(this.patientId).subscribe(response => {

    });
  }

}



export interface Resultat {
  date: string;
  value: object;
  id: string;
  type: string;
}

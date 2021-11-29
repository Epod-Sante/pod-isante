import {Component, Input, OnInit} from '@angular/core';
import {Response} from '../../../dto';
import {PatientDto} from '../../../dto/patient/PatientDto';
import {PatientService} from '../../../_services/patient.service';
import {RecommandationDto} from '../../../dto/RecommandationDto';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PatientLoginService} from '../../../_services/PatientLoginService';

@Component({
  selector: 'app-recomandation-patient',
  templateUrl: './recomandation-patient.component.html',
  styleUrls: ['./recomandation-patient.component.css']
})
export class RecomandationPatientComponent implements OnInit {
  @Input() patient: string;

  id: string = null;
  recom: any;
  details: any[];
  recommandation: any[];
  mySubscription: Subscription;
  private patientId: string;


  constructor(private patientService: PatientService, private patientLoginService: PatientLoginService) {
    this.patientId = localStorage.getItem('patientId');
  }

  ngOnInit() {
    this.getRecoById();
  }


  getRecoById(){
    console.log('********* ' + this.patientId);
    this.patientService.getReco(this.patientId).subscribe(recommandations => {
      const reco = recommandations as Response;
      this.recom = reco.object;
      console.log(recommandations);
      console.log(this.recom);
      this.recommandation = JSON.parse(this.recom.recommendation);
      console.log(this.recommandation);
      for (let i = 0 ; i < this.recommandation.length; i++){
        if (i === 0) {this.details = this.recommandation[i].details; }
        else {
          this.details.push(this.recommandation[i].details);
        }

      }



      // this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      // console.log(this.liste_antecedants[0].antecedents)


    });

  }

}

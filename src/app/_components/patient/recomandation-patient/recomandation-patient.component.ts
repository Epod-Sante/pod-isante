import {Component, Input, OnInit} from '@angular/core';
import {Response} from '../../../dto';
import {PatientService} from '../../../_services/patient.service';
import {RecommandationDto} from '../../../dto/RecommandationDto';
import {Subscription} from 'rxjs';
import {PatientLoginService} from '../../../_services/PatientLoginService';
import {ObjectifModel} from '../../clinician/patient/objectif-v2/ObjectifModel';

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
  recommandation: RecommandationDto;
  mySubscription: Subscription;
  private patientId: string;
  barriersRecommendation: string[] = [];
  barriersRecommendationSolutions: string[] = [];
  objectif: ObjectifModel[] = [];

  obj1Moyen = [];
  obj2Moyen = [];
  obj3Moyen = [];
  obj1Precaution = [];
  obj2Precaution = [];
  obj1Moment = [];
  obj2Moment = [];


  constructor(private patientService: PatientService, private patientLoginService: PatientLoginService) {
    this.patientId = localStorage.getItem('patientId');
  }

  ngOnInit() {
    this.getRecoById();
  }

  getRecoById() {
    this.patientService.getReco(this.patientId).subscribe(recommandations => {
      const response = recommandations as Response;
      this.recommandation = JSON.parse(JSON.stringify(response.object)) as RecommandationDto;
      this.barriersRecommendation = JSON.parse(this.recommandation.barriersRecommendation) as string[];
      this.objectif = JSON.parse(this.recommandation.recommendation) as ObjectifModel[];
      let i = 0;
      this.objectif.forEach(elm => {
        if (i === 0) {
          const moyen = JSON.parse(JSON.stringify(elm.moyen)) as Moyen[];
          const precaution = JSON.parse(JSON.stringify(elm.precaution)) as Precaution[];
          const moment = JSON.parse(JSON.stringify(elm.recommandation.moment)) as Moment[];
          moyen.forEach(m => {
            if (m.checked) {
              this.obj1Moyen.push(m.name);
            }
          });
          precaution.forEach(p => {
            if (p.checked) {
              this.obj1Precaution.push(p.name);
            }
          });
          moment.forEach(mm => {
            if (mm.checked) {
              this.obj1Precaution.push(mm.name);
            }
          });
        } else if (i === 1) {
          const moyen = JSON.parse(JSON.stringify(elm.moyen)) as Moyen[];
          const precaution = JSON.parse(JSON.stringify(elm.precaution)) as Precaution[];
          const moment = JSON.parse(JSON.stringify(elm.recommandation.moment)) as Moment[];
          moyen.forEach(m => {
            if (m.checked) {
              this.obj2Moyen.push(m.name);
            }
          });
          precaution.forEach(p => {
            if (p.checked) {
              this.obj2Precaution.push(p.name);
            }
          });
          moment.forEach(mm => {
            if (mm.checked) {
              this.obj1Precaution.push(mm.name);
            }
          });
        } else {
          const moyen = JSON.parse(JSON.stringify(elm.moyen)) as Moyen[];
          const precaution = JSON.parse(JSON.stringify(elm.precaution)) as Precaution[];
          moyen.forEach(m => {
            if (m.checked) {
              this.obj3Moyen.push(m.name);
            }
          });
        }
        i = i + 1;
      });
    });
  }
}

class Moyen {
  name: string;
  checked: boolean;
}

class Precaution {
  name: string;
  checked: boolean;
}

class Moment {
  name: string;
  checked: boolean;
}

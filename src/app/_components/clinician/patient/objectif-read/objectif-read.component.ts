import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {Subscription} from 'rxjs';
import {PatientService} from '../../../../_services/patient.service';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {ObjectifModel} from '../objectif-v2/ObjectifModel';
import {NbWindowControlButtonsConfig, NbWindowService} from '@nebular/theme';
import {ObjectifV2Component} from '../objectif-v2/objectif-v2.component';
import {ObjectifComponent} from "../objectif/objectif.component";

@Component({
  selector: 'app-objectif-read',
  templateUrl: './objectif-read.component.html',
  styleUrls: ['./objectif-read.component.css']
})
export class ObjectifReadComponent implements OnInit, OnDestroy {
  @Input() recommendations: RecommandationDto[];
  patientId: string;
  selectedItem = 0;
  subscription: Subscription;
  barriersRecommendation: string[] = [];
  barriersRecommendationSolutions: string[] = [];
  objectif: ObjectifModel[] = [];

  obj1Moyen = [];
  obj2Moyen = [];
  obj3Moyen = [];
  obj1Precaution = [];
  obj2Precaution = [];
  obj3Precaution = [];
  obj1Moment = [];
  obj2Moment = [];

  constructor(private data: PatientDataBetweenComponentsService, private patientService: PatientService,
              private windowService: NbWindowService) {
    this.subscription = this.data.currentMessage.subscribe(message => this.patientId = message);
  }

  ngOnInit(): void {
  }

  ngOnChange(){

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onChange() {
    this.obj1Moyen = [];
    this.obj2Moyen = [];
    this.obj3Moyen = [];
    this.obj1Precaution = [];
    this.obj2Precaution = [];
    this.obj3Precaution = [];
    this.obj1Moment = [];
    this.obj2Moment = [];
    this.barriersRecommendation = JSON.parse(this.recommendations.at(this.selectedItem).barriersRecommendation) as string[];
    // tslint:disable-next-line:max-line-length
    this.barriersRecommendationSolutions = JSON.parse(this.recommendations.at(this.selectedItem).barriersRecommendationSolutions) as string[];
    this.objectif = JSON.parse(this.recommendations.at(this.selectedItem).recommendation) as ObjectifModel[];
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
        precaution.forEach(p => {
          if (p.checked) {
            this.obj3Precaution.push(p.name);
          }
        });
      }
      i = i + 1;
    });

  }

  addRecommendation() {
    const component = ObjectifComponent;
    const title = 'Objectifs, barrieres et solutions';
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: true,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title  , buttons: buttonsConfig} );
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

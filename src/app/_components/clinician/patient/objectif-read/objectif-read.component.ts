import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {Subscription} from 'rxjs';
import {PatientService} from '../../../../_services/patient.service';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {ObjectifModel} from '../objectif-v2/ObjectifModel';
import {NbWindowControlButtonsConfig, NbWindowService} from '@nebular/theme';
import {ObjectifV2Component} from '../objectif-v2/objectif-v2.component';
import {ObjectifComponent} from '../objectif/objectif.component';
import {Response} from "../../../../dto";

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
  objectif: ObjectifModel[] = [];

  obj1Moyen = [];
  obj2Moyen = [];
  obj3Moyen = [];
  obj1Bar = [];
  obj2Bar = [];
  obj3Bar = [];
  obj1Precaution = [];
  obj2Precaution = [];
  obj3Precaution = [];
  obj1Moment = [];
  obj2Moment = [];
  nc1: number;
  nc2: number;
  nc3: number;

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
    this.obj1Bar = [];
    this.obj2Bar = [];
    this.obj3Bar = [];
    this.nc1 = -1;
    this.nc2 = -1;
    this.nc3 = -1;
    this.obj1Moyen = [];
    this.obj2Moyen = [];
    this.obj3Moyen = [];
    this.obj1Precaution = [];
    this.obj2Precaution = [];
    this.obj3Precaution = [];
    this.obj1Moment = [];
    this.obj2Moment = [];
    this.getRecommendations();
    this.barriersRecommendation = JSON.parse(this.recommendations.at(this.selectedItem).barriersRecommendation) as string[];
    // tslint:disable-next-line:max-line-length
    this.objectif = JSON.parse(this.recommendations.at(this.selectedItem).recommendation) as ObjectifModel[];
    let i = 0;
    this.objectif.forEach(elm => {
      if (i === 0) {
        const bar = JSON.parse(JSON.stringify(elm.barrieres)) as Barriere[];
        const moyen = JSON.parse(JSON.stringify(elm.moyen)) as Moyen[];
        const precaution = JSON.parse(JSON.stringify(elm.precaution)) as Precaution[];
        const moment = JSON.parse(JSON.stringify(elm.recommandation.moment)) as Moment[];
        const nc = JSON.parse(JSON.stringify(elm.nc)) as number;
        bar.forEach(m => {
          if (m.checked) {
            this.obj1Bar.push(m.name);
          }
        });
        this.nc1 = nc;
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
        const bar = JSON.parse(JSON.stringify(elm.barrieres)) as Barriere[];
        const nc = JSON.parse(JSON.stringify(elm.nc)) as number;
        bar.forEach(m => {
          if (m.checked) {
            this.obj2Bar.push(m.name);
          }
        });
        this.nc2 = nc;
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
        const bar = JSON.parse(JSON.stringify(elm.barrieres)) as Barriere[];
        const nc = JSON.parse(JSON.stringify(elm.nc)) as number;
        bar.forEach(m => {
          if (m.checked) {
            this.obj3Bar.push(m.name);
          }
        });
        this.nc3 = nc;
        moyen.forEach(m => {
          if (m.checked) {
            this.obj3Moyen.push(m.name);
          }
        });
      }
      i = i + 1;
    });

  }

  public getRecommendations = () => {
    this.patientService.getAllReco(this.patientId).subscribe(response => {
      const res = response as Response;
      this.recommendations = JSON.parse(JSON.stringify(res.object));
    });
  }
  addRecommendation() {
    const component = ObjectifComponent;
    const title = 'Objectifs, barrières et niveau de confiance';
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title  , buttons: buttonsConfig, closeOnBackdropClick: false} );
  }
}

class Barriere {
  name: string;
  checked: boolean;
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

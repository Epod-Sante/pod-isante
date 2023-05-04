import {Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, SimpleChanges} from '@angular/core';
import {AnthropometryDto} from '../../../../dto/medicalfile/clinical_examination/AnthropometryDto';
import {BloodPressureDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/BloodPressureDto';
import {HeartRateDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/HeartRateDto';
import {CardiovascularDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/CardiovascularDto';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {first} from 'rxjs/operators';
import {PatientService} from '../../../../_services/patient.service';
import {Request} from '../../../../dto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, Router} from '@angular/router';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {NbToastrService, NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'app-examen-clinique',
  templateUrl: './examenclinique.component.html',
  styleUrls: ['./examenclinique.component.css']
})
export class ExamencliniqueComponent implements OnInit, OnDestroy {
  id: string;
  dyslipidemie: string[];
  others: string[];
  diabete: string[];
  cardiovasculaire: string[];
  expanded = true;
  disaledactif = true;
  disaledanterieur = true;
  kg: number;
  cm: number;
  imccm: string;
  lbpoids: number;
  feet: number;
  inches: number;
  btbloq;
  active;
  mySubscription: any;
  now: string;
  @Output() expandedEvent = new EventEmitter<boolean>();
  regularFC = false;
  feetinches: string;


  constructor(private patientService: PatientService, private snackBar: MatSnackBar, private router: Router,
              private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService, @Optional() protected windowRef: NbWindowRef, ) {
    this.mySubscription = this.data.currentMessage.subscribe(message => this.id = message);
    this.getBirthday();
  }


  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {

  }

  onChangeActif() {
    this.disaledanterieur = true;
    if (this.disaledactif === false) {

    } else {
      this.disaledactif = !this.disaledactif;

    }
  }

  calcul_imc() {
    if (this.kg !== 0 && this.cm !== 0) {
      const y = (this.cm * 0.393700) / 12;
      this.feet = Math.floor(y);
      this.inches = (y - this.feet) * 12;
      this.feetinches = this.feet + ' pi ' + this.inches.toFixed(1) + ' po';
      this.lbpoids = +(this.kg * 2.20462).toFixed(2);
      const carrepoid = (this.cm / 100) * (this.cm / 100);
      this.imccm = (this.kg / carrepoid).toFixed(2);
    }
    if (isNaN(this.cm)) {
      this.feetinches = '';
    }
  }

  onChangePassif() {
    this.disaledactif = true;
    this.disaledanterieur = true;
  }


  onChangeAnterieur() {
    this.disaledactif = true;
    if (this.disaledanterieur === false) {

    } else {
      this.disaledanterieur = !this.disaledanterieur;
    }


  }

  getBirthday() {
    const d = new Date();

    const date = d.getDate();
    let jr = date.toString();
    if (date > 9) {

    } else {
      jr = '0' + date;
    }
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month > 9) {

    } else {
      mois = '0' + month;
    }
    const year = d.getFullYear();

    this.now = year + '-' + mois + '-' + jr;
  }

  ajouter(fcRepos, tadrsys: number, tadrdias: number, tagcsys: number, tagcdias: number, poidskg, taillecm, imc, tourTaille) {


      const antro = new AnthropometryDto(poidskg, taillecm, imc, tourTaille);
      const ta = new BloodPressureDto(tagcdias, tadrdias, tadrsys, tagcsys);
      const fc = new HeartRateDto(fcRepos, this.regularFC);
      const cardio = new CardiovascularDto(fc, ta);


      const clinicalExaminationDto = new ClinicalExaminationDto(cardio, antro, null, null, this.now);
      const request = new Request(clinicalExaminationDto);
      this.patientService.addExam(request, this.id).pipe(first())
      .subscribe(
        data => {
          this.windowRef.close();
          this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
        },
        error => {
          this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
        });

  }


  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      {position, status});
  }

}

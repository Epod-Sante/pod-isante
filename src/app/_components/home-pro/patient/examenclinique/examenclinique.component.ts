import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AntecedentsDto} from '../../../../dto/medicalfile/AntecedentsDto';
import {PharmacotherapyDto} from '../../../../dto/medicalfile/clinical_examination/PharmacotherapyDto';
import {AnthropometryDto} from '../../../../dto/medicalfile/clinical_examination/AnthropometryDto';
import {SmokingDto} from '../../../../dto/medicalfile/clinical_examination/SmokingDto';
import {BloodPressureDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/BloodPressureDto';
import {HeartRateDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/HeartRateDto';
import {CardiovascularDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/CardiovascularDto';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {first} from 'rxjs/operators';
import {PatientService} from '../../../../_services/patient.service';
import {Request} from '../../../../dto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-examenclinique',
  templateUrl: './examenclinique.component.html',
  styleUrls: ['./examenclinique.component.css']
})
export class ExamencliniqueComponent implements OnInit {
  @Input() id: string;
  dyslipidemie: string[];
  others: string[];
  diabete: string[];
  cardiovasculaire: string[];
  expanded = true;
  disaledactif = true;
  disaledanterieur = true;
  kg: number ;
  cm: number ;
  imccm: string ;
  lbpoids: number ;
  pitaille: number ;
  btbloq ;
  active ;
  mySubscription: any;
  now: string;
  @Output() expandedEvent = new EventEmitter<boolean>();


  constructor(private patientService: PatientService, private _snackBar: MatSnackBar, private router: Router) {
    this.getBirthday();
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });


  }


  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {

  }
  onChangeActif(){
    this.disaledanterieur = true;
    if (this.disaledactif === false){

    }else{
      this.disaledactif = !this.disaledactif;

    }
  }
  calcul_imc() {

    if (this.kg != 0 && this.cm != 0){
      this.pitaille = +(this.cm / 30.48).toFixed(2);
      this.lbpoids = +(this.kg * 2.20462).toFixed(2);
      const carrepoid = (this.cm / 100) * (this.cm / 100);
      this.imccm = (this.kg / carrepoid).toFixed(2);
    }else if (this.lbpoids != 0 && this.pitaille != 0 ){
      this.cm = this.pitaille * 30.48;
      this.kg = this.lbpoids / 2.20462;
      const carrepoid = (this.cm / 100) * (this.cm / 100);
      this.imccm = (this.kg / carrepoid).toFixed(2);

    }
  }
  onChangePassif(){
    this.disaledactif = true;
    this.disaledanterieur = true;


  }

  clickthis()
  {
    console.log(this.btbloq);
  }
  onChangeAnterieur(){
    this.disaledactif = true;
    if (this.disaledanterieur === false){

    }else{
      this.disaledanterieur = !this.disaledanterieur;
    }


  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.id);


  }
  getBirthday() {
    const d = new Date();

    const date = d.getDate();
    let jr = date.toString();
    if (date > 9){

    }else{
      jr = '0' + date;
    }
    console.log(jr);
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month > 9){

    }else{
      mois = '0' + month;
    }
    const year = d.getFullYear();

    this.now = year + '-' + mois + '-' + jr;
    console.log(this.now);
  }
  ajouter(cardiovasculaire_list: any[], dyslipidemie_list: any[],
          diabete_list: any [], others_list: any [], fc_repos, tadrsys: number,
          tadrdias: number, tagcsys: number, tagcdias: number, poidskg, taillecm, imc, tour_taille,
          actiftabac, nb_cigarettes, passiftabac, anterieurtabac, annee_arret){
    let typefumeur;
    for (let i = 0 ; i < cardiovasculaire_list.length; i++){
      if (i == 0){
        this.cardiovasculaire = [cardiovasculaire_list[i].value];
      } else{
        this.cardiovasculaire.push(cardiovasculaire_list[i].value);
      }
    }
    for (let i = 0 ; i < dyslipidemie_list.length; i++){
      if (i == 0){
        this.dyslipidemie = [dyslipidemie_list[i].value];
      } else{
        this.dyslipidemie.push(dyslipidemie_list[i].value);
      }
    }
    for (let i = 0 ; i < others_list.length; i++){
      if (i == 0){
        this.others = [others_list[i].value];
      } else{
        this.others.push(others_list[i].value);
      }
    }
    for (let i = 0 ; i < diabete_list.length; i++){
      if (i == 0){
        this.diabete = [diabete_list[i].value];
      } else{
        this.diabete.push(diabete_list[i].value);
      }
    }
    if (actiftabac.checked === true){
      annee_arret = null;
      typefumeur = actiftabac.value;

    }else if (passiftabac.checked == true){
      annee_arret = null;
      nb_cigarettes = null;
      typefumeur = passiftabac.value;


    }else {
      nb_cigarettes = null;
      typefumeur = anterieurtabac.value;

    }
    const  pharma = new PharmacotherapyDto(JSON.stringify(this.cardiovasculaire), JSON.stringify(this.dyslipidemie), JSON.stringify(this.diabete), JSON.stringify(this.others));
    const antro = new AnthropometryDto(poidskg, taillecm, imc, tour_taille);
    const smok = new SmokingDto(typefumeur, nb_cigarettes);
    const ta = new BloodPressureDto(tagcdias, tadrdias, tadrsys, tagcsys);
    const fc = new HeartRateDto(fc_repos, true);
    const cardio = new CardiovascularDto(fc, ta);



    const clinicalExaminationDto = new ClinicalExaminationDto(cardio, antro, smok, pharma, this.now);
    const request = new Request(clinicalExaminationDto);
    console.log(clinicalExaminationDto);
    this.patientService.addExam(request, this.id).pipe(first())
      .subscribe(
        data => {
          this.openSnackBar(' AJOUT REUSSI', 'Ok');
          this.expandedEvent.emit(!this.expanded);



        },
        error => {
          console.log('error');


        });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,

    }); }


}

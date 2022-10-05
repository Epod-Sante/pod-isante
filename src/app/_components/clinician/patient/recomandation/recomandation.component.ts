import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Details, DetailsRecoComponent} from './details-reco/details-reco.component';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {Request, Response} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {NavigationEnd, Router} from '@angular/router';
import {ProfessionalDto} from '../../../../dto/patient/ProfessionalDto';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-recomandation',
  templateUrl: './recomandation.component.html',
  styleUrls: ['./recomandation.component.css']
})

export class RecomandationComponent {
  id: string = null;
  recomm: any;
  detaills: any[];
  recommandation: any[];
  visible = true;
  message: string;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  RecoCtrlA = new FormControl();
  RecoCtrlS = new FormControl();
  RecoCtrlG = new FormControl();

  filteredRecoActions: Observable<string[]> = null;
  filteredRecoSedentaires: Observable<string[]> = null;
  filteredRecoGeneraux: Observable<string[]> = null;
  mySubscription: any;
  Reco: string[] = null;
  Reco1: string[] = null;
  Reco2: string[] = null;
  allRecoActions: string[] = null;
  newRecom: Recomandation[];
  allRecoSedentaires: string[] = null;
  barriersRecommendation: string[] = null;
  barriersRecommendationSolutions: string[] = null;
  allRecoGeneraux: string[] = null;
  Recom: Recomandation[] = [

    {id : null ,  valeur : 'Augmenter le nombre de pas', type: 1, details : null},
    {id : null ,  valeur : 'Atteindre un nombre de minutes de marche', type: 1, details : null},
    {id : null ,  valeur : 'Atteindre un nombre de pas', type: 1, details : null},
    {id : null ,  valeur : 'Mettre une alarme aux 30 minutes pour penser à se lever', type: 2, details : null},
    {id : null ,  valeur : 'Se lever le plus souvent possible', type: 2, details : null},
    {id : null ,  valeur : 'Réduire les minutes continues du temps assis', type: 2, details : null},
    {id : null ,  valeur : 'faire un nombre de pas par minutes', type: 2, details : null},
    {id : null ,  valeur : 'se lever pendants les pauses commerciales', type: 2, details : null},
    {id : null ,  valeur : 'Augmenter les transports actifs à la marche', type: 3, details : null},
    {id : null ,  valeur : 'Faire une liste des moments clés pour faire de l\'activité physique ', type: 3, details : null},
    {id : null ,  valeur : 'S\'inscrire à un club/groupe de marche', type: 3, details : null},
    {id : null ,  valeur : 'Écouter de la musique ou des livres audios en marchand', type: 3, details : null},
    {id : null ,  valeur : 'Aller marcher avec quelqu\'un d\'autre', type: 3, details : null},
    {id : null ,  valeur : 'Prévoir un plan B en cas d\'imprévus pour atteindre les objectifs', type: 3, details : null},
    {id : null ,  valeur : 'Rechercher les infrastructures pour marcher dans votre environnement', type: 3, details : null},
    {id : null ,  valeur : 'Référez-vous à une infirmière', type: 3, details : null},
    {id : null ,  valeur : 'Référez-vous à un kinésiologue', type: 3, details : null},
    {id : null ,  valeur : 'Référez-vous à un médecin de famille', type: 3, details : null}




  ];


  @ViewChild('RecoInput', {static : false}) RecoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : false}) matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<RecomandationComponent>, public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data, private  patientService: PatientService,
              private router: Router) {
    if (this.filteredRecoSedentaires == null && this.filteredRecoActions == null
      && this.filteredRecoGeneraux == null) {
      for (let i = 0; i < this.Recom.length; i++) {
        if (this.Recom[i].type === 1) {
          if (this.allRecoActions == null){
            this.allRecoActions = [this.Recom[i].valeur];
          }else{
          this.allRecoActions.push(this.Recom[i].valeur); }
        }
        if (this.Recom[i].type === 2) {
          if (this.allRecoSedentaires == null){
            this.allRecoSedentaires = [this.Recom[i].valeur];
          }else{
          this.allRecoSedentaires.push(this.Recom[i].valeur); }
        }
        if (this.Recom[i].type === 3) {
          if (this.allRecoGeneraux == null){
            this.allRecoGeneraux = [this.Recom[i].valeur];
          }else{
          this.allRecoGeneraux.push(this.Recom[i].valeur); }
        }


      }
      this.getAllReco();
    }

    this.filteredRecoActions = this.RecoCtrlA.valueChanges.pipe(
      startWith(null),
      map((action: string | null) => action ? this._filter(action) : this.allRecoActions.slice()));
    this.filteredRecoSedentaires = this.RecoCtrlS.valueChanges.pipe(
      startWith(null),
      map((sedentaire: string | null) => sedentaire ? this._filterSedentaire(sedentaire) : this.allRecoSedentaires.slice()));
    this.filteredRecoGeneraux = this.RecoCtrlG.valueChanges.pipe(
      startWith(null),
      map((generaux: string | null) => generaux ? this._filterGeneraux(generaux) : this.allRecoGeneraux.slice()));
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if (this.Reco != null){
        this.Reco.push(value.trim());
      } else {
        this.Reco  = [value.trim()];
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlA.setValue(null);
  }
  add1(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if (this.Reco1 != null){
        this.Reco1.push(value.trim());
      } else {
        this.Reco1 = [value.trim()];
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlG.setValue(null);
  }
  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if (this.Reco2 != null){
        this.Reco2.push(value.trim());
      } else {
        this.Reco2  = [value.trim()];
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlS.setValue(null);
  }
  remove(reco: string): void {
    const index = this.Reco.indexOf(reco);

    if (index >= 0) {
      this.Reco.splice(index, 1);
    }
  }
  remove1(reco1: string): void {
    const index = this.Reco1.indexOf(reco1);

    if (index >= 0) {
      this.Reco1.splice(index, 1);
    }
  }
  remove2(reco2: string): void {
    const index = this.Reco2.indexOf(reco2);

    if (index >= 0) {
      this.Reco2.splice(index, 1);
    }
  }
  voir(){
  }
  chipDetails(reco: string) {
    const index = this.Reco.indexOf(reco);
    const dialogRef = this.dialog.open(DetailsRecoComponent, {
      data: {reco: this.Reco[index], type: 1, details: null},
      width: '60%',
      height: '85%'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (this.newRecom === undefined) {
        this.newRecom = [{id : result.id, type : result.type, valeur: result.reco, details : result.details}];
      } else {
        this.newRecom.push({id : result.id, type : result.type, valeur: result.reco, details : result.details});

      }

      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService

    });
  }


  chipDetails1(reco1: string){
    const index = this.Reco1.indexOf(reco1);
    const dialogRef = this.dialog.open(DetailsRecoComponent, {
      data : {reco : this.Reco1[index], type : 3, details : null, id : null},
      width : '60%',
      height: '85%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.newRecom === undefined) {
        this.newRecom = [{id : result.id, type : result.type, valeur: result.reco, details : result.details}];
      } else {
        this.newRecom.push({id : result.id, type : result.type, valeur: result.reco, details : result.details});

      }
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
    });

  }
  chipDetails2(reco2: string){
    const index = this.Reco2.indexOf(reco2);
    const dialogRef = this.dialog.open(DetailsRecoComponent, {
      data : {reco : this.Reco2[index], type : 2, details : null},
      width : '60%',
      height: '85%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.newRecom === undefined) {
        this.newRecom = [{id : result.id, type : result.type, valeur: result.reco, details : result.details}];
      } else {
        this.newRecom.push({id : result.id, type : result.type, valeur: result.reco, details : result.details});
      }
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.Reco != null){
    this.Reco.push(event.option.viewValue); }
    else{
      this.Reco  = [event.option.viewValue];

    }
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlA.setValue(null);
  }
  selected1(event: MatAutocompleteSelectedEvent): void {
    if (this.Reco1 != null){
      this.Reco1.push(event.option.viewValue); }
    else{
      this.Reco1  = [event.option.viewValue];

  }
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlG.setValue(null);
  }
  selected2(event: MatAutocompleteSelectedEvent): void {
    if (this.Reco2 != null){
      this.Reco2.push(event.option.viewValue); }
    else{
      this.Reco2  = [event.option.viewValue];

  }
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlS.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoActions.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterSedentaire(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoSedentaires.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterGeneraux(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoGeneraux.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }
  enregister(){
    const professionel = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(professionel["id"])
    const patient = new PatientDto(this.data.patient.id, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null);
    const recomm = new RecommandationDto(null, patient, null, JSON.stringify(this.newRecom), null, null, null);
    const request = new Request(recomm);
    this.patientService.addReco(request).subscribe( reponse => {
      this.message = 'Ajout reussi';
      this.openSnackBar(this.message, 'Ok');
      this.dialogRef.close();
    }, error => {
      this.message = 'OPERATION ECHOUE';
      this.openSnackBar(this.message, 'Ok');
    });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 500,

    }); }
    getAllReco(){
      this.patientService.getReco(this.data.patient.id).subscribe(recommandations => {
        const reco = recommandations as Response;
        this.recomm = reco.object;
        this.barriersRecommendation = JSON.parse(JSON.stringify(this.recomm.barriersRecommendation));
        this.barriersRecommendationSolutions = JSON.parse(JSON.parse(JSON.stringify(this.recomm.barriersRecommendationSolutions)));
        this.recommandation = JSON.parse(this.recomm.recommendation);
        for (let i = 0 ; i < this.recommandation.length; i++){
          if (i == 0) {
            this.detaills = this.recommandation[i].details;
          }
          else {
            this.detaills.push(this.recommandation[i].details);
          }

        }



        // this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
        // console.log(this.liste_antecedants[0].antecedents)


      });

    }

}
export interface Recomandation {
  id: number;
  valeur: string;
  type: number;
  details: Details[];


}

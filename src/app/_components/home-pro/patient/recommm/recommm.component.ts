import {Component, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Recomandation, RecomandationComponent} from "../recomandation/recomandation.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PatientService} from "../../../../_services/patient.service";
import {NavigationEnd, Router} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {Details} from "../recomandation/details-reco/details-reco.component";

@Component({
  selector: 'app-recommm',
  templateUrl: './recommm.component.html',
  styleUrls: ['./recommm.component.css']
})
export class RecommmComponent implements OnInit {
  id : string = null;
  sed: boolean = false;
  min: boolean = false;
  sedentairesparams : string[] =[];
  pasparams : string[] =[];
  minparams : string[] =[];
  pas: boolean = false;
  backk: boolean = false;
  value:number;
  visible : boolean = true;
  param : boolean = false;
  curseur : boolean = false;
  objectif : string[] = ["Nombre de pas quotidien","Minutes quotidiennes actives","Temps sédentaire"];
  params : string[] = ["Augmenter de X le nombre de pas quotidien","Atteindre un total de X pas quotidien",
    "Augmenter de X le nombre de minutes", "Atteindre un total de X minutes quotidiennes",
    "Diminuer de X le nombre de minutes sédentaires",
    "Viser un maximum de X minutes consécutives de temps sédentaires"];
  parametre: string;
  pass: string;
  minutes : string;
  moyens : string[] = ["Prévoir desjournéeset momentsfixes dansl'horairepour pratiquer de l'activitéphysique",
    "Avoir un plan B pour remplacer une activité physique déjà plannifiée en cas d'imprévus.",
    "S'inscrire à un groupe de conditionnement ou de marche.",
    "Faire une liste des activités physiques que vous aimez ou croyez pouvoir apprécier et regarder les moyens pour initier l'activité.",
    "Faire un journal d'activité physique",
    "Augmenter lestranportsactifs (déplacementspour aller autravail, à la pharmacie, àl'épicerie,etc.",
    "Faire une activité physique avec un membre de la famille ou un(e) ami(e).",
    "Rechercher lesinfrastructuresà\n" +
    "proximitédevotredomicilepour\n" +
    "pratiquer del'activitéphysique(piste\n" +
    "cyclable, sentierspédestres,centrede\n" +
    "conditionnement, etc)\n",
    "Écouter delamusiqueoudeslivres\n" +
    "audiospendant lapratiqued'activité\n" +
    "physique",
    "S'équiper d'équipement pour bouger\n" +
    "confortablement (chaussure\n" +
    "confortable, pantalonet chandailde\n" +
    "sport)\n",
    "Mettreunesur lecellulaireauautre\n" +
    "appareilafindeselever aux30 minutes\n" +
    "ouauxheurespour couper lespériodes\n" +
    "assises.\n",
    "Avoir unmaximumd'heurespar jour\n" +
    "consacréàdesactivitésdeloisirs\n" +
    "assises(télévision, ordinateur/tablette,\n" +
    "lecture, jeux, etc.)\n"
    ,"Ajouter unemarchedeloisir àun moment opportundevotrejournée"

  ];
  frequence : string [] = ["",
  "1-2 jours/semaine\n",
  "3 jours/semaine\n", "4 jours/semaine\n",
    "5 jours/semaine\n",
    "6 jours/semaine\n",
  "1x/jour",
  "2x/jour",
    "3x/jour"
  ];
  endroit : string [] = ["À domicile",
  "Au travail (Utiliser les escaliers )",
    "Au travail (Se stationner plus loin)",
    "Au travail (Prendreunemarchesur\n" +
    "lapausedîner)",
  "Espace plein air (Pistes cyclables)",
  "Espace plein air (Parcs)",
  "Espace plein air (Sentiers pédestres)",
  "Centre d'entrainement ()",
  "Centre d'entrainement ()",
  "Centre d'entrainement ()",
    "Centre communautaire",
    "Centred'achat\n"
  ]
  intenssite : number;
  cursor : number;
  cpt : number = 0;
  precautions : string []








  constructor(public dialogRef: MatDialogRef<RecomandationComponent>,public dialog: MatDialog,
              private _snackBar : MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data, private  patientService : PatientService,
              private router : Router) {


    }



  ngOnInit() {
  }
  next(){

    if(this.cpt==0){
      if(this.sed != false || this.min != false || this.pas != false){
        if(this.sed === true){
          let compte =0;
          this.params.forEach(t => {
            if(t.indexOf("sédentaires")>=0){
              this.sedentairesparams.push(t);
              compte++;
            }
          })

        }
        if(this.min === true){
          let compte =0;
          this.params.forEach(t => {
            if(t.indexOf("Augmenter de X le nombre de minutes")>=0 ||
              t.indexOf("Atteindre un total de X minutes quotidiennes")>=0 ){
              this.minparams.push(t);
              compte++;
            }
          })

        }

      this.visible = !this.visible;
      this.param = true;}else{
        this.backk = !this.backk;
      }
      this.cpt++;
    }else if(this.cpt==1){
      this.param = !this.param;
      this.curseur = true;
      this.cpt++;

    }


    if(this.cpt>0){
      this.backk = true;
    }

  }
  back(){

    this.cpt--;
    if(this.cpt<=0){
      this.backk = false;
    }
    if(this.cpt==0){
      this.visible = !this.visible;
      this.param = !this.param;
    }else if(this.cpt==1){
      this.param = !this.param;
      this.curseur = !this.param;
    }



  }
  checked(val: boolean,objectif: string){
    if(val===true){
      //eviter de comparer avec chaine de caract
      if(objectif=="Nombre de pas quotidien"){
        this.pas = true;
      }
      if(objectif=="Minutes quotidiennes actives"){
        this.min = true;
      }
      if(objectif=="Temps sédentaire"){
        this.sed = true;
      }
    }else{
      if(objectif=="Nombre de pas quotidien"){
        this.pas = false;
      }
      if(objectif=="Minutes quotidiennes actives"){
        this.min = false;
      }
      if(objectif=="Temps sédentaire"){
        this.sed = false;
      }
    }

  }

}
export interface Recomandationn {
  id: number
  type : number
  objectif : string
  params : string
  cursor : number
  moyens : string
  frequence : string;
  endroit : string;
  moments : string;
  intensite : number;
  precaution : string;



}

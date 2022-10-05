import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {first, map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DetailsRecoComponent} from "../recomandation/details-reco/details-reco.component";
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";
import {Request} from "../../../../dto";
import {PatientService} from "../../../../_services/patient.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OptionComponent} from "./option/option.component";

@Component({
  selector: 'app-histoire-sante',
  templateUrl: './histoire-sante.component.html',
  styleUrls: ['./histoire-sante.component.css']
})

export class HistoireSanteComponent implements OnInit {
  @Input() id: string;
  an : number; moi : number;
  typ: string; orgg : string; trait : string;
  AnteCtrl = new FormControl();
  FactCtrl = new FormControl();
  organe = null
  lis_antecedant : AntecedentsDto[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredAntecedents: Observable<string[]> = null;
  filteredFacteurs: Observable<string[]> = null;
  list_facteurs : string[] = null
  list_antecedents: string[] = null
  selectable = true;
  expanded = true;
  removable = true;
  option = false
  mois = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
  mounh : string
  organee : string = ""
  year : number
  annee : number[] = null;
  type : string[] = null
  traitement : string [] = null
  antess: string[] = null
  factess : string[] = null
  actualAntecedent : Antecedent

  @ViewChild('AnteInput',{static : false}) AnteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : false}) matAutocomplete: MatAutocomplete;
  antecedents: Antecedent[] = [

    {id : null ,  valeur :'Angine', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Infarctus du myocarde', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Pontages coronariens', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Angioplastie coronarienne', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Maladie valvulaire', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Maladie valvulaire', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Insuffisance cardiaque', type: ['NYHA 1','NYHA 2','NYHA 3','NYHA 4'], mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'AVC', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'AIT', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Thrombectomie', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Claudication', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Chirurgie vasculaire périphérique', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Maladie pulmonaire obstructive chronique/MPOC', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Insuffisance rénale', type: ['aigue','chronique'], mois : null, annee : null , traitement : ['Médicaments','Dialyse','Transplantation']},
    {id : null ,  valeur :'Dialyse', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Cancer', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'troubles musculo squelettiques (ex: lombalgie)', type: null, mois : null, annee : null , traitement : null},






  ];
  facteurs_risques: Antecedent[] = [

    {id : null ,  valeur :'Dyslipidémie', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Hypertension artérielle', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Surpoids (IMC 25.value,0 à 29.value,9)', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Obésité grade 1 (IMC 30.value,0 - 34.value,9)', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Obésité grade 2 (IMC 35.value,0 - 39.value,9)', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Obésité grade 3 ou sévère (IMC > 40.value,0)', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Tabagisme', type: ['actif','ancien (arrêt depuis < 6 mois)','ancien (arrêt depuis > 6 mois)'], mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Antécédents familiaux – maladie cardiovasculaire)', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Antécédents familiaux – cancer', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Troubles anxieux', type: null, mois : null, annee : null , traitement : null},
    {id : null ,  valeur :'Dépression', type: null, mois : null, annee : null , traitement : null},







  ];
  @Output() expandedEvent = new EventEmitter<boolean>();

  constructor(private patientService : PatientService, private _snackBar : MatSnackBar,
              public dialogRef: MatDialogRef<OptionComponent>,public dialog: MatDialog) {
    let date = new Date()
    for (let i = +date.getFullYear(); i > 1900 ; i--){
      if(this.annee === null){
        this.annee = [i]
      }else{
        this.annee.push(i)
      }
    }
    if(this.filteredAntecedents == null ) {
      for (let i = 0; i < this.antecedents.length; i++) {
          if(i==0){
            this.list_antecedents = [this.antecedents[i].valeur]
          }else{
          this.list_antecedents.push(this.antecedents[i].valeur)}




      }
      this.filteredAntecedents = this.AnteCtrl.valueChanges.pipe(
        startWith(null),
        map((antecedent: string | null) => antecedent ? this._filter(antecedent) : this.list_antecedents.slice()));
    }
    if(this.filteredFacteurs == null ) {
      for (let i = 0; i < this.facteurs_risques.length; i++) {
        if(i==0){
          this.list_facteurs = [this.facteurs_risques[i].valeur]
        }else{
          this.list_facteurs.push(this.facteurs_risques[i].valeur)}




      }
      this.filteredFacteurs = this.FactCtrl.valueChanges.pipe(
        startWith(null),
        map((antecedent: string | null) => antecedent ? this._filterFacteurs(antecedent) : this.list_facteurs.slice()));
    }
  }

  ngOnInit() {
    this.moi = null
    this.an = null
    this.typ = null;
    this.trait = null;
    this.orgg = null;

  }

  remove(antess: string): void {
    const index = this.antess.indexOf(antess);
    let index1 = -1;
    for(let i =0; i< this.lis_antecedant.length; i++ )
    {


      if (this.lis_antecedant[i].antecedent == antess) {
        index1 = i;
      }

    }
    this.traitement = null
    this.type = null
    this.option = false
    if (index >= 0) {
      this.antess.splice(index, 1);
    }
    if (index1 >= 0) {
      this.lis_antecedant.splice(index1, 1);
    }
  }

  removeFact(factess: string): void {
    const index = this.factess.indexOf(factess);
    let index1 = -1;
    for(let i =0; i< this.lis_antecedant.length; i++ )
    {


      if (this.lis_antecedant[i].antecedent == factess) {
        index1 = i;
      }
      if (index1 >= 0) {
        this.lis_antecedant.splice(index1, 1);
      }

    }
    this.traitement = null
    this.type = null
    this.option = false
    if (index >= 0) {
      this.factess.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our antessmandation
    if ((value || '').trim()) {
      if(this.antess != null){
        this.antess.push(value.trim());
      } else {
        this.antess  = [value.trim()]
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.AnteCtrl.setValue(null);
    this.chipDetails(value.trim())
  }

  addFact(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our antessmandation
    if ((value || '').trim()) {
      if(this.factess != null){
        this.factess.push(value.trim());
      } else {
        this.factess  = [value.trim()]
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.FactCtrl.setValue(null);
    this.chipDetails(value.trim())



  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.traitement = null
    this.type = null
    this.option = false
    if(this.antess != null){
      this.antess.push(event.option.viewValue);}
    else{
      this.antess  = [event.option.viewValue]

    }
    this.AnteInput.nativeElement.value = '';
    this.AnteCtrl.setValue(null);
    this.chipDetails(event.option.viewValue)


  }

  selectedFact(event: MatAutocompleteSelectedEvent): void {
    this.traitement = null
    this.type = null
    this.option = false
    if(this.factess != null){
      this.factess.push(event.option.viewValue);}
    else{
      this.factess  = [event.option.viewValue]

    }
    this.AnteInput.nativeElement.value = '';
    this.FactCtrl.setValue(null);
    this.chipDetailsFact(event.option.viewValue)

  }

  chipDetails(reco: string) {
    let exist = -1;
    this.moi = null;
    this.an = null;
    this.typ = null;
    this.trait = null;
    this.orgg = null;

    for(let i =0; i< this.lis_antecedant.length; i++ )
    {


      if (this.lis_antecedant[i].antecedent == reco) {
        exist = i;
      }
      if (exist >= 0) {
        this.an = this.lis_antecedant[exist].year
        this.moi = this.lis_antecedant[exist].mounth
        this.typ = this.lis_antecedant[exist].type;
        this.trait = this.lis_antecedant[exist].traitement;
      }

    }
    this.option = true
    const index = this.list_antecedents.indexOf(reco);
    this.actualAntecedent = this.antecedents[index]
    if(index >= 0) {
      if (this.antecedents[index].type != null) {
        this.type = this.antecedents[index].type


      }
      if (this.antecedents[index].traitement != null) {
        this.traitement = this.antecedents[index].traitement
      } else {

        this.option = true
        this.type = null
        this.traitement = null
      }
    } else {
      this.option = true
      this.actualAntecedent = {id : null ,  valeur : reco , type: null, mois : null, annee : null , traitement : null}
    }
    if(this.option === true) {
      const dialogRef = this.dialog.open(OptionComponent, {
        data: {antecedent: this.actualAntecedent,
               traitement : this.traitement,
               type : this.type,
               mois : this.mois,
                annee : this.annee,
                an : this.an,
                moi : this.moi,
                typ : this.typ,
                trait : this.trait
               },

      });
      dialogRef.afterClosed().subscribe(result => {
        let exist = -1;
        for(let i =0; i< this.lis_antecedant.length; i++ )
        {


          if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur) {
            exist = i;
          }


        }
        if (exist >= 0 && result!=null) {
          this.lis_antecedant[exist].mounth = result[0].mounth
          this.lis_antecedant[exist].year = result[0].year

        }else{
          if(result!=null){
            this.lis_antecedant.push(result[0])

          }else if(result == null && exist < 0){
            let ante = new AntecedentsDto(this.actualAntecedent.valeur, null, null, null, null)
            this.lis_antecedant.push(ante)
          }

        }


        /* if (this.newRecom === undefined) {
           this.newRecom = [{id : result.id, type : result.type, valeur: result.reco, details : result.details}]
         } else {
           this.newRecom.push({id : result.id, type : result.type, valeur: result.reco, details : result.details})

         }*/
      })

    }
  }

  onChangeOrgane(value){
    if(this.actualAntecedent.valeur === "Cancer")
    {
      //this.actualAntecedent.valeur = this.actualAntecedent.valeur + "("+value+")";
      //console.log(this.actualAntecedent.valeur)
      this.organe =  value;
    }

  }

  onChangeMounth(value){
    //this.mounh = value
    //console.log(this.mounh)
    if(this.lis_antecedant != null) {
      let index = -1;

    for(let i =0; i< this.lis_antecedant.length; i++ )
    {


        if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur ) {
          if( this.organe == this.lis_antecedant[i].type && this.actualAntecedent.type == null)
          {
            index = i;
          }
          if(this.actualAntecedent.type!= null){
            index = i;

          }

        }
        if (index >= 0) {
          this.lis_antecedant[i].mounth = value

        }
      }

    if(index < 0 ) {
      if(this.organe != "" && this.actualAntecedent.type==null) {
        this.lis_antecedant.push(new AntecedentsDto(this.actualAntecedent.valeur, null, value, null, this.organe))

      }else{
      this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, null, value, null, null)]

    }}
    }
    else{
      if(this.organe != "" && this.actualAntecedent.type==null) {
        this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, null, value, null, this.organe)]
      }else{
        this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, null, value, null, null)]

      }
    }
  }

  onChangeTrairement(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i< this.lis_antecedant.length; i++ )
      {


        if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur) {
          index = i;
        }
        if (index >= 0) {
          this.lis_antecedant[i].traitement = value

        }
      }
      if(index < 0 ) {
        this.lis_antecedant.push(new AntecedentsDto(this.actualAntecedent.valeur, null, null, value, null))
      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, null, null, value, null)]
    }
  }

  onChangeType(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i<= this.lis_antecedant.length-1; i++ )
      {


        if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur) {
          index = i;
        }
        if (index >= 0) {

          this.lis_antecedant[i].type = value

        }
      }
      if(index < 0) {
        this.lis_antecedant.push(new AntecedentsDto(this.actualAntecedent.valeur, null, null, null, value))
      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, null, null, null, value)]
    }
  }

  onChangeYear(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i<= this.lis_antecedant.length-1; i++ ) {

        if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur) {
          if (this.organe == this.lis_antecedant[i].type && this.actualAntecedent.type == null) {
            index = i;
          }
          if (this.actualAntecedent.type != null) {
            index = i;

          }
        }
        if (index >= 0) {
          this.lis_antecedant[i].year = value

        }
      }
    if(index < 0) {
      if(this.organe != "" && this.actualAntecedent.type==null) {
        this.lis_antecedant.push(new AntecedentsDto(this.actualAntecedent.valeur, value, null, null, this.organe))

      }else{
        this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, value, null, null, null)]

      }      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.actualAntecedent.valeur, value, null, null, null)]
    }

  }

  chipDetailsFact(reco: string) {
    this.an = null
    let exist = -1
    for(let i =0; i< this.lis_antecedant.length; i++ )
    {


      if (this.lis_antecedant[i].antecedent == reco) {
        exist = i;
      }
      if (exist >= 0) {
        this.an = this.lis_antecedant[exist].year
        this.moi = this.lis_antecedant[exist].mounth
        this.typ = this.lis_antecedant[exist].type;
        this.trait = this.lis_antecedant[exist].traitement;
      }

    }

    this.option = true
    const index = this.list_facteurs.indexOf(reco);
    this.actualAntecedent = this.facteurs_risques[index]
    if(index >= 0) {
      if (this.facteurs_risques[index].type != null) {
        this.type = this.facteurs_risques[index].type

      } else if (this.facteurs_risques[index].traitement != null) {
        this.traitement = this.facteurs_risques[index].traitement
      } else {

        this.option = true
        this.type = null
        this.traitement = null
      }
    } else {
      this.option = true
      this.actualAntecedent = {id : null ,  valeur : reco , type: null, mois : null, annee : null , traitement : null}
    }
    if(this.option === true) {
      const dialogRef = this.dialog.open(OptionComponent, {
        data: {antecedent: this.actualAntecedent,
          traitement : this.traitement,
          type : this.type,
          mois : null,
          annee : this.annee,
          an : this.an,
          moi : this.moi,
          typ : this.typ,
          trait : this.trait
        },

      });
      dialogRef.afterClosed().subscribe(result => {
        let exist = -1;
        for(let i =0; i< this.lis_antecedant.length; i++ )
        {


          if (this.lis_antecedant[i].antecedent == this.actualAntecedent.valeur) {
            exist = i;
          }


        }
        if (exist >= 0 && result!=null) {
          this.lis_antecedant[exist].mounth = result[0].mounth
          this.lis_antecedant[exist].year = result[0].year

        }else{
          if(result!=null){
            this.lis_antecedant.push(result[0])

          }else if(result == null && exist < 0){
            let ante = new AntecedentsDto(this.actualAntecedent.valeur, null, null, null, null)
            this.lis_antecedant.push(ante)
          }

        }



  })
    }
  }

  ajouter ()
  {
    let request = new Request(this.lis_antecedant);

    this.patientService.addAntecedants(request,this.id).pipe(first())
      .subscribe(
        data => {
          this.openSnackBar(" ENREGISTREMENT REUSSI","Ok")
          this.expandedEvent.emit(!this.expanded)



        },
        error => {
          this.openSnackBar(" ERREUR  D'ENREGISTREMENT","Ok")


        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 200,

    })}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.list_antecedents.filter(antecedent => antecedent.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterFacteurs(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.list_facteurs.filter(antecedent => antecedent.toLowerCase().indexOf(filterValue) === 0);
  }

}
export interface Antecedent {
  id: number
  valeur : string
  type : string []
  traitement : string []
  mois : number
  annee : number



}

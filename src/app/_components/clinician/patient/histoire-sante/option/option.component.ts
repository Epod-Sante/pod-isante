import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AntecedentsDto} from "../../../../../dto/medicalfile/AntecedentsDto";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  mois = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
  year : number
  organe = null
  a : number;
  m : number;
  lis_antecedant : AntecedentsDto[] = null;

  listes_antecedent : any []
  annee : number[] = null;
  type : string[] = null
  traitement : string [] = null
  constructor(public dialogRef: MatDialogRef<OptionComponent>,@Inject(MAT_DIALOG_DATA) public data) {
    let date = new Date()
    for (let i = +date.getFullYear(); i > 1900 ; i--){
      if(this.annee === null){
        this.annee = [i]
      }else{
        this.annee.push(i)
      }
    }
  }

  ngOnInit() {
    if(this.data.moi != null){
      this.m = this.data.moi
    }else{
      this.m = null;
    }
    if(this.data.an != null){
      this.a = this.data.an
    }else{
      this.a = null;
    }

  }
  enreg(){
    this.data.mounth = this.m
    this.data.year = this.a

  }
  onChangeOrgane(value){
    if(this.data.antecedent.valeur === "Cancer")
    {
      //this.data.antecedent.valeur = this.data.antecedent.valeur + "("+value+")";
      //console.log(this.data.antecedent.valeur)
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


        if (this.lis_antecedant[i].antecedent == this.data.antecedent.valeur) {
          if( this.organe == this.lis_antecedant[i].type && this.data.antecedent.type == null)
          {
            index = i;
          }
          if(this.data.antecedent.type){
            index = i;

          }

        }
        if (index >= 0) {
          this.lis_antecedant[i].mounth = value
          this.data.mounth = value


        }
      }

      if(index < 0 ) {
        if(this.organe != "" && this.data.antecedent.type==null) {
          this.lis_antecedant.push(new AntecedentsDto(this.data.antecedent.valeur, null, value, null, this.organe))

        }else{
          this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, null, value, null, null)]

        }}
    }
    else{
      if(this.organe != "" && this.data.antecedent.type==null) {
        this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, null, value, null, this.organe)]
      }else{
        this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, null, value, null, null)]

      }
    }
  }
  onChangeTraitement(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i< this.lis_antecedant.length; i++ )
      {


        if (this.lis_antecedant[i].antecedent == this.data.antecedent.valeur) {
          index = i;
        }
        if (index >= 0) {
          this.lis_antecedant[i].traitement = value


        }
      }
      if(index < 0 ) {
        this.lis_antecedant.push(new AntecedentsDto(this.data.antecedent.valeur, null, null, value, null))
      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, null, null, value, null)]
    }
  }
  onChangeType(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i<= this.lis_antecedant.length-1; i++ )
      {


        if (this.lis_antecedant[i].antecedent == this.data.antecedent.valeur) {
          index = i;
        }
        if (index >= 0) {

          this.lis_antecedant[i].type = value

        }
      }
      if(index < 0) {
        this.lis_antecedant.push(new AntecedentsDto(this.data.antecedent.valeur, null, null, null, value))
      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, null, null, null, value)]
    }
  }

  onChangeYear(value){
    if(this.lis_antecedant != null) {
      let index = -1;
      for(let i =0; i<= this.lis_antecedant.length-1; i++ ) {

        if (this.lis_antecedant[i].antecedent == this.data.antecedent.valeur) {
          if (this.organe == this.lis_antecedant[i].type && this.data.antecedent.type == null) {
            index = i;
          }
          if (this.data.antecedent.type != null) {
            index = i;

          }
        }
        if (index >= 0) {
          this.lis_antecedant[i].year = value
          this.data.year = value

        }
      }
      if(index < 0) {
        if(this.organe != "" && this.data.antecedent.type==null) {
          this.lis_antecedant.push(new AntecedentsDto(this.data.antecedent.valeur, value, null, null, this.organe))

        }else{
          this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, value, null, null, null)]

        }      }
    }
    else{
      this.lis_antecedant = [new AntecedentsDto(this.data.antecedent.valeur, value, null, null, null)]
    }

  }

}

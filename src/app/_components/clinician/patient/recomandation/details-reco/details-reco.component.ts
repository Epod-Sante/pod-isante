import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Recomandation} from "../recomandation.component";

@Component({
  selector: 'app-details-reco',
  templateUrl: './details-reco.component.html',
  styleUrls: ['./details-reco.component.css']
})
export class DetailsRecoComponent implements OnInit {
  value : number;
  detais: Details ;
  details : Details [];
  categories : Categorie[] = null
  recomfinal : Recomandation;
  moments : string[]
  precautions : string[]
  endroits : string[]
  detailsConfirmed = false
  constructor(public dialogRef: MatDialogRef<DetailsRecoComponent>,@Inject(MAT_DIALOG_DATA) public data) { }
  formatLabel(value: number) {
   /* if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }*/

    return value;
  }

  ngOnInit() {
  }
  hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
      h = s.charCodeAt(i) | 0;
    return h;
  }
  confirmer(moments :any [],intensity : any,freq: any, freqJour : any, precautions : any[], endroits : any[]){

    for (let i = 0 ; i< moments.length; i++){

      if(i==0){
          let index = moments[i].value.indexOf('-')
          let id  = moments[i].value.slice(0,index)
        let valeur = moments[i].value.slice(index+1)
         this.categories = [{id : id, value : valeur}]
       // this.detais = {value :categorie, type: "moments", id :id}

      } else{
        let index = moments[i].value.indexOf('-')
        let id  = moments[i].value.slice(0,index)
        let valeur = moments[i].value.slice(index+1)
       // this.detais = {value :valeur, type: "moments", id : id}
        let categorie = {id : id, value : valeur}
        this.categories.push(categorie)
        /*this.details.push({id : id, type:'moments', value: [categorie]})
        this.details.push(this.detais)*/
      }
    }
    if(this.details== undefined){
      this.details = [{id : 1000, type:'moments', value: this.categories}]
    }else {
      this.details.push({id : 1000, type:'moments', value: this.categories})
    }

    for (let i = 0 ; i< precautions.length; i++){
      if(i==0){
        let index = precautions[i].value.indexOf('-')
        let id  = precautions[i].value.slice(0,index)
        let valeur = precautions[i].value.slice(index+1)
        this.precautions = [precautions[i].value]
        this.categories = [{id : id, value : valeur}]
        //this.detais = {value :valeur, type: "precautions", id : id}


      } else{
        let index = precautions[i].value.indexOf('-')
        let id  = precautions[i].value.slice(0,index)
        let valeur = precautions[i].value.slice(index+1)
        //this.detais = {value : valeur, type: "precautions", id : id}
        let categorie = {id : id, value : valeur}
        this.categories.push(categorie)
        //this.details.push(this.detais)
      }
    }
    if(this.details== undefined){
      this.details = [{id : 2000, type:'precautions', value: this.categories}]
    }else {
      this.details.push({id : 2000, type:'precautions', value: this.categories})
    }
    if(endroits.length > 0)
    {

      for (let i = 0 ; i< endroits.length; i++){
        if(i==0){
          let index = endroits[i].value.indexOf('-')
          let id  = endroits[i].value.slice(0,index)
          let valeur = endroits[i].value.slice(index+1)
          this.endroits = [endroits[i].value]
          this.categories = [{id : id, value : valeur}]
          //this.detais = {value :valeur, type: "endroits", id : id}



        } else{
          let index = endroits[i].value.indexOf('-')
          let id  = endroits[i].value.slice(0,index)
          let valeur = endroits[i].value.slice(index+1)
          this.endroits.push(endroits[i].value)
          //this.detais = {value : valeur, type: "endroits", id : id}
          let categorie = {id : id, value : valeur}
          this.categories.push(categorie)
          //this.details.push(this.detais)

        }
      }
    }
    if(this.details== undefined){
      this.details = [{id : 3000, type:'endroits', value: this.categories}]
    }else {
      this.details.push({id : 3000, type:'endroits', value: this.categories})
    }
    if(freq!=undefined){

      this.categories = [{id : 400, value : freq}]

      this.details.push({value : this.categories, type: "frequece par semaine", id : 4000})
    }
    if(freqJour!=undefined)
    {
      this.categories = null
      this.categories = [{id : 500, value : freqJour}]

      this.details.push({value : this.categories, type: "frequece par jour", id : 5000})
    }
    if(intensity!=undefined)
    {
      this.categories = [{id : 600, value : intensity}]

      this.details.push({value : this.categories, type: "intensite", id : 6000})
    }
    if(this.value!=0){
      this.categories = [{id : 700, value : "("+this.value +") " }]
      this.details.push({value : this.categories, type: "actions", id : 7000})

      //  this.details.push({value : "("+this.value +") " + this.data.reco, type: "actions", id : 700})
    }



    this.recomfinal = {
      id : this.data.id,
      valeur : this.data.reco,
      type : this.data.type,
      details : this.details,


    }
    this.data.details = this.recomfinal.details
    this.detailsConfirmed = true
  }

}
export interface Details {


  id : number
  value : Categorie[]
  type : string
}
export interface Categorie {
  id : number
  value: string

}

import {Component, Input, OnInit} from '@angular/core';
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {PatientService} from "../../../../_services/patient.service";
import {RecommandationDto} from "../../../../dto/RecommandationDto";
import {Request} from "../../../../dto";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {
  @Input() patient: PatientDto;
  message : string
  barriers : string[] = [];
  solutions : string[] = [];
  constructor(private  patientService: PatientService,
              private _snackBar : MatSnackBar) { }

  ngOnInit() {
  }
  comfirmerBar(bar : any[]){
    for (let i =0; i<bar.length; i++){
      this.barriers.push(bar[i].value);
    }

    let recomm = new RecommandationDto(null, this.patient, null,null,null, JSON.stringify(this.barriers), null)
    let request = new Request(recomm)
    this.patientService.upReco(request).subscribe( reponse =>{
      console.log("Ajout reussi")
      this.message = "Ajout reussi"
      this.openSnackBar(this.message,"Ok")
    }, error => {
      this.message = "OPERATION ECHOUE"
      this.openSnackBar(this.message,"Ok")
      console.log(this.message)
    })
  }
  comfirmerSol(sol : any[]){
    for (let i =0; i<sol.length; i++){
      this.solutions.push(sol[i].value);
    }
    let recomm = new RecommandationDto(null, this.patient, null,null,null, null, JSON.stringify(this.solutions))
    let request = new Request(recomm)
    this.patientService.upReco(request).subscribe( reponse =>{
      console.log("Ajout reussi")
      this.message = "Ajout reussi"
      this.openSnackBar(this.message,"Ok")
    }, error => {
      this.message = "OPERATION ECHOUE"
      this.openSnackBar(this.message,"Ok")
      console.log(this.message)
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    })}
}

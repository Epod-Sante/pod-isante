import {Component, Inject, Input, OnInit} from '@angular/core';
import {Request} from "../../../../dto";
import {first} from "rxjs/operators";
import {LipidProfileDto} from "../../../../dto/LipidProfilDto";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {PatientService} from "../../../../_services/patient.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bilan-lipidique',
  templateUrl: './bilan-lipidique.component.html',
  styleUrls: ['./bilan-lipidique.component.css']
})
export class BilanLipidiqueComponent implements OnInit {
  @Input() id: string
  message : string
  day : string = null
  constructor(private  patientService : PatientService, private router : Router,
              private _snackBar : MatSnackBar,
              public dialogRef: MatDialogRef<BilanLipidiqueComponent>,public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit() {
  }
  ajouter(ldl : string, hdl : string, nonhdl : string, triglycerides : string, hba1c : string){
    if(Number(ldl) && Number(hdl) && Number(nonhdl) && Number(triglycerides) && Number(hba1c) ){

    let date = new Date()
      console.log(date)
      this.setDate(date);
    console.log(this.day)
    let lipidProfileDto = new LipidProfileDto(null, +ldl,+hdl,+triglycerides,+hba1c, +nonhdl, this.day)
    console.log(lipidProfileDto)
    console.log(this.data.patient)
    let request = new Request(lipidProfileDto);
    console.log(request)
      console.log("aaaeww")
    this.patientService.addLipid(request, this.id).pipe(first())
      .subscribe(
        data => {
          //this.openSnackBar(" AJOUT REUSSI","Ok")
          this.message = "Ajout reussi"
          this.openSnackBar(this.message,"Ok")
          //this.dialogRef.close();


        },
        error => {
          this.message = "Erreur durant l'ajout "
          this.openSnackBar(this.message,"Ok")


        });
    }
    else{

    }

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 200,

    })}
    setDate(datee : Date){
      const d = new Date(datee);
      console.log(d)

      let date = d.getDate();
      let jr = date.toString()
      if(date>9){

      }else{
        jr= "0"+date
      }
      const month = d.getMonth() + 1; // Be careful! January is 0 not 1
      let mois = month.toString()
      if(month>9){

      }else{
        mois= "0"+month
      }
      const year = d.getFullYear();

      this.day = year + '-' + mois + '-' + jr;
    }
}

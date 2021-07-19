import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PatientService} from "../../../_services/patient.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {AppointmentDto} from "../../../dto/AppointmentDto";
import {Request, Response} from "../../../dto";
import {first} from "rxjs/operators";
import {PatientDto} from "../../../dto/patient/PatientDto";

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {
  patientsId : string
  birthday: string
  patient
  patientId
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public patientService: PatientService) {
    this.getPatientById()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);
    console.log(d)

    let date = d.getDate();
    let jr = date.toString()
    if(date>9){

    }else{
      jr= "0"+date
    }
    console.log(jr)
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString()
    if(month>9){

    }else{
      mois= "0"+month
    }
    const year = d.getFullYear();

    this.birthday = year + '-' + mois + '-' + jr;
    console.log(this.birthday)
  }

  comfirmer(patientId : string, datev: string){
    if(patientId!="" || datev!=""){

      this.data.request.object.appointmentDate = this.birthday
        this.patientService.updateRdv(this.data.request).pipe(first())
          .subscribe(
            data => {
              console.log(" AJOUT REUSSI","Ok")


            },
            error => {
              console.log("error")


            });



    }else {
      console.log("Veuillez Remplir tous les champs ")

    }

  }
  getPatientById(){
    console.log(this.data.request.object.id)
    this.patientService.getPatient(this.data.request.object.patientId).subscribe(patients => {
      let socio = patients as Response
      this.patient = socio.object as PatientDto
      console.log(patients)
      console.log( this.patient)



      //this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      //console.log(this.liste_antecedants[0].antecedents)


    });

  }



}

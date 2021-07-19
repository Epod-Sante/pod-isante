import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, Input, SimpleChanges} from '@angular/core';
//import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {PatientService} from "../../../_services/patient.service";
import {AppointmentDto} from "../../../dto/AppointmentDto";
import {PatientDto} from "../../../dto/patient/PatientDto";
import {Observable} from "rxjs";
import {City} from "../../register/register.component";
import {first, map, startWith} from "rxjs/operators";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Request} from "../../../dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ThemePalette} from "@angular/material/core";
//import {Issue} from '../../models/issue';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {


  @Input() error: string | null;
  selected = false
  patientCtrl = new FormControl();
  patientsId : string
  selectedPatient : PatientDto
  patientSelected : PatientDto
  filteredPatients: Observable<PatientDto[]>;
  patients: PatientDto[];
  birthday: string
  ngOnInit() {

    this.getAllUsers()


  }
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AppointmentDto,
              private _snackBar : MatSnackBar,
              public patientService: PatientService) {
    this.getAllUsers()


  }
  ngOnChanges(changes: SimpleChanges){

  }
  private _filterPatients(value: string): PatientDto[] {
    const filterValue = value.toLowerCase();

    return this.patients.filter(patient => patient.fileNumber.toLowerCase().indexOf(filterValue) === 0);
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPatient(selectedPatientFileNumber : string){
    this.selected = true
    this.patients.forEach((patient) =>{
      if(selectedPatientFileNumber===patient.fileNumber){
        this.patientSelected = patient as PatientDto
      }
    })
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

  comfirmer(patientId : string, datev: Date){
      console.log(datev)
    let t = new Date(datev).toUTCString()
   // console.log(t)
  /*   for (let i =0 ; i < this.patients.length; i++)
     {
       if(this.patients[i].fileNumber === patientId){
         c++
         this.patientsId = this.patients[i].id

       }
     }*/

       let currentUser = JSON.parse(localStorage.getItem("currentUser"))
       let appoint = new AppointmentDto(null,this.data.id,currentUser["id"],null,datev)
       let request= new Request(appoint)
       this.patientService.addRdv(request).pipe(first())
         .subscribe(
           data => {

             this.openSnackBar(" AJOUT REUSSI","Ok")
             this.dialogRef.close();

           },
           error => {
             this.openSnackBar(" AJOUT ECHOUE","Ok")

           });



          console.log(patientId)


}


  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    //this.dataService.addIssue(this.data);
  }
  public getAllUsers = () => {

    this.patientService.getAll().subscribe( patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      let pat = JSON.parse(JSON.stringify(patients))
    // console.log(pat)
       this.patients = pat.object as PatientDto[]



      this.filteredPatients = this.patientCtrl.valueChanges
        .pipe(
          startWith(''),
          map(patient => patient ? this._filterPatients(patient) : this.patients.slice())
        );

    });

    // console.log("yes "+this.users)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    })}
}


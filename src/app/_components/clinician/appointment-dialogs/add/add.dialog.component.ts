import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
// import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {PatientService} from '../../../../_services/patient.service';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Observable} from 'rxjs';
import {City} from '../../../register/register.component';
import {first, map, startWith} from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Request} from '../../../../dto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
// import {Issue} from '../../models/issue';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddDialogComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AppointmentDto,
              private snackBar: MatSnackBar,
              public patientService: PatientService) {
    this.getAllUsers();


  }


  @Input() error: string | null;
  selected = false;
  patientCtrl = new FormControl();
  patientsId: string;
  selectedPatient: PatientDto;
  patientSelected: PatientDto;
  filteredPatients: Observable<PatientDto[]>;
  patients: PatientDto[];
  birthday: string;
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {

    this.getAllUsers();


  }

  private _filterPatients(value: string): PatientDto[] {
    const filterValue = value.toLowerCase();

    return this.patients.filter(patient => patient.fileNumber.toLowerCase().indexOf(filterValue) === 0);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPatient(selectedPatientFileNumber: string){
    this.selected = true;
    this.patients.forEach((patient) => {
      if (selectedPatientFileNumber === patient.fileNumber){
        this.patientSelected = patient as PatientDto;
      }
    });
  }
  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);

    const date = d.getDate();
    let jr = date.toString();
    if (date > 9){

    }else{
      jr = '0' + date;
    }
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month > 9){

    }else{
      mois = '0' + month;
    }
    const year = d.getFullYear();

    this.birthday = year + '-' + mois + '-' + jr;
  }

  comfirmer(patientId: string, datev: Date){
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const appoint = new AppointmentDto(null, this.data.id, currentUser.id, null, datev);
      const request = new Request(appoint);
      this.patientService.addRdv(request).pipe(first())
         .subscribe(
           data => {

             this.openSnackBar(' AJOUT REUSSI', 'Ok');
             this.dialogRef.close();
           },
           error => {
             this.openSnackBar(' AJOUT ECHOUE', 'Ok');

           });

}


  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    // this.dataService.addIssue(this.data);
  }
  public getAllUsers = () => {

    this.patientService.getAll().subscribe( patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      const pat = JSON.parse(JSON.stringify(patients));
    // console.log(pat)
      this.patients = pat.object as PatientDto[];



      this.filteredPatients = this.patientCtrl.valueChanges
        .pipe(
          startWith(''),
          map(patient => patient ? this._filterPatients(patient) : this.patients.slice())
        );

    });

    // console.log("yes "+this.users)
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,

    }); }
}


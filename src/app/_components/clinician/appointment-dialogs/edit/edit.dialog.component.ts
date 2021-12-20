import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PatientService} from '../../../../_services/patient.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {Request, Response} from '../../../../dto';
import {first} from 'rxjs/operators';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {PatientDataBetweenComponentsService} from "../../../../_services/PatientDataBetweenComponentsService";
import {NbToastrService} from "@nebular/theme";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditDialogComponent {
  patientId: string;
  dateInit: string;
  date = '';
  subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public patientService: PatientService,
              private dataService: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService) {
    this.subscription = this.dataService.currentMessage.subscribe(message => this.patientId = message);

    this.dateInit = data.request.object.appointmentDate;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateAppointment(){
    if (this.date !== ''){
      this.data.request.object.appointmentDate = new Date(this.date);
      this.patientService.updateRdv(this.data.request).pipe(first())
          .subscribe(
            data => {
              this.date = '';
              this.closeDialog();
              this.showToast('top-right', 'success', 'Succès', 'Modification reussi');
            },
            error => {
              this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
            });
    }else {
      this.showToast('top-right', 'info', 'Info', 'Veuillez ajouter une date');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

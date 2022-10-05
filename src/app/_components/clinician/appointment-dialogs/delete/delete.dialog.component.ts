import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {PatientService} from "../../../../_services/patient.service";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public patientService: PatientService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    this.patientService.deleteRdv(this.data.request).pipe(first())
      .subscribe( reponse =>{

        }, error => {

        }
      );
  }
}

import {Component, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {Request} from '../../../../dto';
import {first} from 'rxjs/operators';
import {LipidProfileDto} from '../../../../dto/LipidProfilDto';
import {PatientService} from '../../../../_services/patient.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {NbToastrService, NbWindowRef} from '@nebular/theme';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bilan-lipidique',
  templateUrl: './bilan-lipidique.component.html',
  styleUrls: ['./bilan-lipidique.component.css']
})
export class BilanLipidiqueComponent implements OnInit, OnDestroy {
  id: string;
  message: string;
  day: string = null;
  subscription: Subscription;

  constructor(private patientService: PatientService, private router: Router, private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService, @Optional() protected windowRef: NbWindowRef,
              public dialogRef: MatDialogRef<BilanLipidiqueComponent>, public dialog: MatDialog) {
    this.subscription = this.data.currentMessage.subscribe(message => this.id = message);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ajouter(ldl: string, hdl: string, nonhdl: string, triglycerides: string, hba1c: string, glucoseJeun: string, glucoseAleatoire: string) {
      const date = new Date();
      this.setDate(date);
      const lipidProfileDto = new LipidProfileDto(null, +ldl, +hdl, +triglycerides, +hba1c, +nonhdl, this.day, +glucoseJeun, +glucoseAleatoire);
      const request = new Request(lipidProfileDto);
      this.patientService.addLipid(request, this.id).pipe(first())
        .subscribe(
          data => {
            this.windowRef.close();
            this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
          },
          error => {
            this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
          });

  }

  setDate(datee: Date) {
    const d = new Date(datee);

    const date = d.getDate();
    let jr = date.toString();
    if (date > 9) {

    } else {
      jr = '0' + date;
    }
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month > 9) {

    } else {
      mois = '0' + month;
    }
    const year = d.getFullYear();

    this.day = year + '-' + mois + '-' + jr;
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      {position, status});
  }
}

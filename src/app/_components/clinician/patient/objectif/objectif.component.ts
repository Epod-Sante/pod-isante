import {Component, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {PatientService} from '../../../../_services/patient.service';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {Request} from '../../../../dto';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContactDto} from '../../../../dto/patient/ContactDto';
import {Subscription} from 'rxjs';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {NbToastrService, NbWindowRef} from '@nebular/theme';
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit, OnDestroy {
  patient: PatientDto;
  id: string;
  barriers: string[] = [];
  solutions: string[] = [];
  message: string;
  subscription: Subscription;
  value = null;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0},
      { value: 1},
      { value: 2 },
      { value: 3},
      { value: 4 },
      { value: 5},
      { value: 6 },
      { value: 7},
      { value: 8 },
      { value: 9},
      { value: 10},
    ]
  };
  constructor(private  patientService: PatientService, private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService, @Optional() protected windowRef: NbWindowRef, ) {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

    this.patient = new PatientDto(this.message, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  comfirmerBar(bar: any[]){
    for (let i = 0; i < bar.length; i++){
      this.barriers.push(bar[i].value);
    }

    const recomm = new RecommandationDto(null, this.patient, null, null, null, JSON.stringify(this.barriers), null);
    const request = new Request(recomm);
    this.patientService.upReco(request).subscribe( reponse => {
      this.windowRef.close();
      this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
    }, error => {
      this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
    });
  }
  addConfiance(){
   if (this.value !== null){
     const recomm = new RecommandationDto(null, this.patient, null, null, null, null, this.value.toString());
     const request = new Request(recomm);
     this.patientService.upReco(request).subscribe( () => {
       this.windowRef.close();
       this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
     }, error => {
       this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
     });
   }else {
     this.showToast('top-right', 'info', 'Échec', 'Operation échouée');
   }

  }


  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

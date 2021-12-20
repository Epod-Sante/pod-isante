import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../admin/invite/invite.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, UserService} from '../../../_services';
import {PatientService} from '../../../_services/patient.service';
import {PatientDto} from '../../../dto/patient/PatientDto';
import {ContactDto} from '../../../dto/patient/ContactDto';
import {Request, Response} from '../../../dto';
import {first, map} from 'rxjs/operators';
import {PatientLoginService} from '../../../_services/PatientLoginService';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('pinInput') pinInput: ElementRef;

  constructor(private router: Router,
              private patientService: PatientService,
              private patientLoginService: PatientLoginService,
              private route: ActivatedRoute,
              private toastrService: NbToastrService) { }
  obj: PatientDto;

  ngOnInit() {
  }

  submit() {
      // this.submitEM.emit(this.form.value);
      if (this.emailInput.nativeElement.value === '' || this.pinInput.nativeElement.value === ''){
        this.showToast('top-right', 'info', 'Échec', 'Veuillez Remplir tous les champs');
      }else if (this.pinInput.nativeElement.value.length !== 4){
        this.showToast('top-right', 'info', 'Échec', 'NIP invalide');
      }else {
       const data = new  PatientDto(null, null, null, null, null, null,
         new ContactDto(null, null , this.emailInput.nativeElement.value, null), null, null,
         null, null, null, this.pinInput.nativeElement.value, null,
         null, null, null, null, null, null);
       const request = new Request(data);
       this.patientService.login(request).pipe(first())
          .subscribe(patient => {
            // this.router.navigate(["patient/questionnaire"])
              const response = patient as Response;
              this.obj = JSON.parse(JSON.stringify(response.object)) as PatientDto;
              if (this.obj != null){
                this.patientLoginService.changeMessage(response.object as string);
                localStorage.setItem('currentPatientToken', this.obj.questionnaireToken);
                localStorage.setItem('patientId', this.obj.id);
                localStorage.setItem('patientName', this.obj.firstName + ' ' + this.obj.lastName);
                this.router.navigate(['patient/questionnaire']);
            }else{
                this.showToast('top-right', 'danger', 'Échec', 'Authentification échouée');
            }

        }, error => {
            this.showToast('top-right', 'danger', 'Échec', 'Authentification échouée');
          }
        );
      }


  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

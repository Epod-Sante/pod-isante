import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../admin/invite/invite.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {ContactDto} from '../../../../dto/patient/ContactDto';
import {ProfessionalDto} from '../../../../dto/patient/ProfessionalDto';
import {PatientService} from '../../../../_services/patient.service';
import {first} from 'rxjs/operators';
import {UserService} from '../../../../_services';
import {Request} from '../../../../dto';
import {NavigationEnd, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit, OnDestroy {

  @Output() exampleOutput = new EventEmitter<PatientDto>();
  @Input() error: string | null;
  mySubscription: any;
  birthday;
  submitted = false;
  phonee = '';
  patientAdded = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();


  constructor(private patientService: PatientService, private userService: UserService,
              private router: Router,
              private toastrService: NbToastrService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  changePhone(value: string) {
    if (value.length === 3 || value.length === 7) {
      const tiret = '-';
      this.phonee = value.concat(tiret);
    }
  }

  ngOnInit() {
    this.error = null;
  }

  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);
    const date = d.getDate();
    let jr = date.toString();
    if (date < 9) {
      jr = '0' + date;
    }
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month < 9) {
      mois = '0' + month;
    }
    const year = d.getFullYear();
    this.birthday = d;
  }

  ajouter(firstName: string, lastName: string, motherName: string, phone: string, email: string, gender: string) {
    this.error = null;

    if (firstName === '' || lastName === '' || motherName === '' || phone === '' || this.birthday === '') {
      this.showToast('top-right', 'info', 'Info', 'Vous devrez remplir tous les champs');
    } else if (firstName.length < 3 || lastName.length < 3) {
      this.showToast('top-right', 'info', 'Info', 'Les champs nom et prenoms doivent contenir au minimum 3 caracteres');
    } else {
      this.submitted = true;
      const familyDoctor = null;
      const pharmacy = null;
      const birth = this.birthday;
      for (let i = 0; i < phone.length; i++) {
        const exist = phone.indexOf('-');
        if (exist >= 0) {
          const phont = phone.split('');
          phont.splice(exist, 1);
          phone = phont.join('');
        }
      }

      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.userService.info_user(user.user_name).subscribe(
        rep => {
          const pro: ProfessionalDto[] = [new ProfessionalDto(rep["id"], rep["firstName"],rep["lastName"], true)];
          const data = new PatientDto(null, null, firstName, lastName, birth, motherName,
            new ContactDto(null, phone, email, null),
            familyDoctor, pharmacy, pro
            , true, null, null, null,
            null, null, null, null, false, gender);
          const request = new Request(data);

          this.patientService.addPatient(request).pipe(first())
            .subscribe(
              dat => {
                const obj = JSON.parse(JSON.stringify(dat));
                if (obj.object != null) {
                  this.patientAdded = true;
                  this.exampleOutput.emit(data);
                  this.showToast('top-right', 'success', 'Succès', 'Patient ajoute');
                } else {
                  this.showToast('top-right', 'danger', 'Échec', 'L\'adresse e-mail existe');
                  //this.error = obj.error.message;
                }
              },
              error => {
                this.showToast('top-right', 'danger', 'Échec', 'Patient ajoute');
              });
        });
    }
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService, AuthenticationService, UserService} from '../../../_services';
import {ErrorStateMatcher} from '@angular/material/core';
import {Profile} from '../../../dto/Profile';
import {UserInviteDto} from '../../../dto/UserInviteDto';
import {NbToastrService} from "@nebular/theme";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface City {
  city: string;
  admin: string;
  country: string;
  population_proper: string;
  iso2: string;
  capital: string;
  lat: string;
  lng: string;
  population: string;
}

@Component(
  {
    templateUrl: 'invite.component.html',
    styleUrls: ['./invite.component.css']
  })
export class InviteComponent implements OnInit {


  inviterForm: FormGroup;
  loading = false;
  submitted = false;
  profilelist: any;

  currentUser = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentUser);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService,
              private toastrService: NbToastrService) {
    if (localStorage.getItem('currentRole' ) === 'role_admin') {

    } else {
      router.navigate(['/']);
    }

    this.profilelist = [
      new Profile('PROFESSIONAL', 'ROLE_PROFESSIONAL', true),
      new Profile('RESEARCHER', 'ROLE_RESEARCHER', true)
    ];
  }

  get f() {
    return this.inviterForm.controls;
  }

  ngOnInit() {
  }

  register(emailDto: string, roleeDto: string) {
    this.submitted = true;
    const data = new UserInviteDto(this.user.user_name,
      emailDto, roleeDto, null, null, null, null, null, null);

    this.loading = true;
    this.userService.inviter(data)
      .pipe(first())
      .subscribe(
        result => {
          if (result.emailExist === true) {
            this.showToast('top-right', 'danger', 'Échec', 'L\'adresse e-mail existe déjà');
            return;
          }
          this.showToast('top-right', 'success', 'Success', 'Le courrier est envoyé');
        }, error => {
        });
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

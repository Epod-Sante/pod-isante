import {Component, Inject, OnInit, SimpleChanges} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {EncrDecrService} from "../../_services/EncrDecrService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService} from "../../_services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {messages} from "../../_services/messages";
import {LoginClientDTO} from "../../dto/LoginClientDTO";
import {first} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppointmentDto} from "../../dto/AppointmentDto";
import {PatientService} from "../../_services/patient.service";

@Component({
  selector: 'app-iddle-user',
  templateUrl: './iddle-user.component.html',
  styleUrls: ['./iddle-user.component.css']
})
export class IddleUserComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private EncrDecr: EncrDecrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IddleUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentDto,
    public patientService: PatientService
  ) {



  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      'username': ['', [
        Validators.required,

      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      'remember': []

    });


  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.f.password.value);
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    this.authenticationService.login(new LoginClientDTO(this.f.username.value, this.f.password.value, "password"))
      .pipe(first())
      .subscribe(
        data => {



          //this.router.navigate(['listpatient'])





          this.dialogRef.close();


          //location.reload();
        },
        error => {

          //const err = JSON.parse(error);
          //console.log(error.error.error)
          localStorage.clear()
          this.router.navigate(['/login'])
          this.dialogRef.close();



        });

  }

}

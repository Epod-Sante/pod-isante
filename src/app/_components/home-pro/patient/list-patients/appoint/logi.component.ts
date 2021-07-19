import {Component, Inject, OnInit, SimpleChanges} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PatientDto} from "../../../../../dto/patient/PatientDto";

export interface DialogData {
  patient: PatientDto[];
  name: string;
}


@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css']
})

export class LogiComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  page = this.router.url;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar : MatSnackBar
) {
    console.log("++++"+data.patient+" "+data.name)
    if (localStorage.getItem("currentUser")){
      // redirect to home if already logged in
      if (localStorage.getItem("currentRole")==="role_professional") {
        this.router.navigate(['home/professional']);
      } else if(localStorage.getItem("currentRole")==="role_admin") {
        this.router.navigate(['/home']);
      }else if(localStorage.getItem("currentRole")==="role_searcher") {
        this.router.navigate(['/home/searcher']);
      }

    }else {



      console.log(this.page)
    }


}

  get f() { return this.loginForm.controls; }

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


}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })
    //this.router.navigate(["login"]);
  }







}

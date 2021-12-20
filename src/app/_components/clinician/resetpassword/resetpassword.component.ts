import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, SnackBar} from "../../../_services";
import {MatSnackBar} from "@angular/material/snack-bar";

import {first} from "rxjs/operators";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  tokenpassword: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/admin']);
    }else {
      this.getCodeFromURI();
    }


  }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      'password': ['', [
        Validators.required,

      ]],
      'comfirmpassword': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    if (this.f.password.value != this.f.comfirmpassword.value) {
      console.log("eroor")
    } else {

      console.log(this.tokenpassword)
      //console.log(this.f.comfirmpassword.value)


      this.authenticationService.passwordUpdate(this.tokenpassword, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data)
            this._snackBar.open("votre mot de passe a ete modifie", "OK")
            this.router.navigate(['login']);
            //location.reload();
          },
          error => {


          });
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })
  }


  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        let token: string;
        token = params.token;
        console.log(token)
        if (token != null) {
          this.tokenpassword = token;
          let message = this.authenticationService.passwordUpdateToken(token).subscribe(
            response => {
              console.log(response)
              let tokrep = JSON.parse(response.toString())
              console.log(tokrep.tokenExist)
              if (tokrep.tokenExist) {

              } else {
                this.router.navigate(["forgetpassword"])
              }

              //this.openSnackBar(response.toString(), "Ok")
            }
            //error => this.openSnackBar(error.error.text, "Ok")

          );

        }
      });
  }


}

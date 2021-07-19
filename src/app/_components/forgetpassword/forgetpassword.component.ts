import {Component, Input, OnInit} from '@angular/core';
import {LoginClientDTO} from "../../dto/LoginClientDTO";
import {first} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthenticationService, AlertService } from '../../_services';
import {ActivatedRoute, Router} from "@angular/router";
import {MyErrorStateMatcher} from "../register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetForm: FormGroup;
  loading = false;
  submitted = false;
   email : string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private _snackBar : MatSnackBar
  ) {
    if (this.authenticationService.currentUser === undefined) {
      this.router.navigate(['/home']);
    }
  }

  connexionr () {
    this.router.navigate(["login"])
  }
  matcher = new MyErrorStateMatcher();
  get f() { return this.forgetForm.controls; }
  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      'email': ['', [


      ]]
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetForm.invalid) {
      return;
    }

    this.loading = false;
    this.forgetPassword()

  }

  forgetPassword(){
    this.authenticationService.forgetPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        result => {
          console.log(result)
          //var json = JSON.parse(<string>result.valueOf());
          this.email = result["email"]
          if (result["emailExist"]){
            this.openSnackBar("Vous avez un mail, de recuperation de mot de passe","OK")

          } else {
            this.openSnackBar("le mail n`existe pas ","OK")
          }

        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })
    //this.router.navigate(["login"]);
  }


}

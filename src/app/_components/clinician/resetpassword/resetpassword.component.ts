import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, SnackBar} from "../../../_services";
import {MatSnackBar} from "@angular/material/snack-bar";

import {first} from "rxjs/operators";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  @ViewChild('password') password: ElementRef;
  @ViewChild('comfirmpassword') comfirmpassword: ElementRef;
  resetForm: FormGroup;
  submitted = false;
  tokenpassword: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: NbToastrService,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
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
    console.log(this.password.nativeElement.value)
    console.log(this.password.nativeElement.value.size)
    // stop here if form is invalid
    if (this.password.nativeElement.value === '' || this.password.nativeElement.value === '') {
      this.showToast('top-right', 'danger', 'Échec', 'Les deux entrées sont invalides, essayez une autre fois');
    }
    else if (this.password.nativeElement.value !== this.comfirmpassword.nativeElement.value) {
      this.showToast('top-right', 'danger', 'Échec', 'Les deux entrées sont différentes, essayez une autre fois');
    } else {
      this.authenticationService.passwordUpdate(this.tokenpassword, this.password.nativeElement.value)
        .pipe(first())
        .subscribe(
          data => {
            this.showToast('top-right', 'success', 'Success', 'Votre mot de passe a été changé');
          },
          error => {

          });
    }

  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }

  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        let token: string;
        token = params.token;
        if (token != null) {
          this.tokenpassword = token;
          let message = this.authenticationService.passwordUpdateToken(token).subscribe(
            response => {
              let tokrep = JSON.parse(response.toString())
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

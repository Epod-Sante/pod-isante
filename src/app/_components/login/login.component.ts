import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {catchError, first, retry, tap} from 'rxjs/operators';
import {messages} from '../../_services/messages'
import { Keepalive } from '@ng-idle/keepalive';

import {MatSnackBar} from "@angular/material/snack-bar";


import {AuthenticationService, AlertService} from '../../_services';
import {LoginClientDTO} from "../../dto/LoginClientDTO";
import {UserIdleService} from "angular-user-idle";
import {BnNgIdleService} from "bn-ng-idle";
import {EncrDecrService} from "../../_services/EncrDecrService";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Timer} from "../Timer";
import {throwError, timer} from "rxjs";
import {IddleUserComponent} from "../iddle-user/iddle-user.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  page = this.router.url;

  constructor(
    private userIdle: UserIdleService,
    private keepalive: Keepalive,
    public dialog: MatDialog,
    private EncrDecr: EncrDecrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar,
  ) {
    if (localStorage.getItem("currentUser")) {
      // redirect to home if already logged in
      if (localStorage.getItem("currentRole") === "role_professional") {
        this.router.navigate(['listpatient']);
      } else if (localStorage.getItem("currentRole") === "role_admin") {
        this.router.navigate(['/home']);
      } else if (localStorage.getItem("currentRole") === "role_searcher") {
        this.router.navigate(['/home/searcher']);
      }

    } else {


      for (let i = 0; i < messages.length; i++) {
        let found = messages[i].page.indexOf(this.page);
        console.log(found);
        if (!(found < 0)) {
          console.log(this.page);
          for (let j = 0; j < messages[i].value.length; j++) {
            messages[i].value[j].status.indexOf("400");
          }
          console.log(messages[i].value[i].valeur);
          return
        }
        if (i == messages.length - 1 && found < 0) {
          this.page = null;
          console.log("pas de message pour cette page ")

        }

      }

      console.log(this.page)
    }


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


  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.f.password.value);
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    this.authenticationService.login(new LoginClientDTO(this.f.username.value, this.f.password.value, "password"))
      .pipe(first())
      .subscribe(
        data => {




          console.log(localStorage.getItem("currentToken"))
          if (localStorage.getItem("currentRole") === "role_admin") {
            console.log(localStorage.getItem("currentRole"))
            this.router.navigate(['home'])

          } else if (localStorage.getItem("currentRole") === "role_professional") {
            console.log(localStorage.getItem("currentRole"))
            this.router.navigate(['listpatient'])
          } else if (localStorage.getItem("currentRole") === "role_searcher") {
            console.log(localStorage.getItem("currentRole"))
            this.router.navigate(['home/searcher'])
          } else {
            this.router.navigate(['login'])
          }
          //Start watching for user inactivity.
          this.userIdle.startWatching();

          // Start watching when user idle is starting.
          this.userIdle.onTimerStart().subscribe(count => {console.log(count)})

           // ping
/*          this.userIdle.ping$.subscribe(() => this.authenticationService.refresh_token().subscribe(result =>{
            console.log("refresh")
            let token = localStorage.getItem("currentToken");
            const obj = JSON.parse(token);
                console.log("result")
              },



            error1 => {

            console.log("non")
          }));*/
          // Start watch when time is up.
          this.userIdle.onTimeout().subscribe(() => {
            console.log('Time is up!')

            localStorage.clear()
            const dialogRef = this.dialog.open(IddleUserComponent, {
              disableClose : true

            });

            dialogRef.afterClosed().subscribe(result => {
               this.restart()
            });
          });




          //location.reload();
        },
        error => {

          this.loading = false;
          //const err = JSON.parse(error);
          //console.log(error.error.error)
          this._snackBar.open(error.description, "OK")
          if (error.error.error === 'invalid_grant') {

            this._snackBar.open(error.error.error_description, "OK")._dismissAfter(2000)
          } else {
            this._snackBar.open("Veuillez contacter l'admin", "OK")._dismissAfter(2000)

          }


        });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })
    //this.router.navigate(["login"]);
  }
  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../_services';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-confirmaccount',
  templateUrl: './confirmaccount.component.html',
  styleUrls: ['./confirmaccount.component.css']
})
export class ConfirmaccountComponent implements OnInit {
  message : string;
  constructor(private auth : AuthenticationService, private activatedRoute: ActivatedRoute, private router : Router,
              private _snackBar : MatSnackBar ) {
    this.getCodeFromURI();




  }

  ngOnInit() {

  }
  getCodeFromURI() {

    this.activatedRoute.queryParams
      .subscribe(params => {
        let token: string;
        token = params.token;
        console.log(token)
        if (token != null) {
          let message = this.auth.confirmationEmail(token).subscribe(
            response => {
              this.openSnackBar(response.toString(), "Ok")
            }
            //error => this.openSnackBar(error.error.text, "Ok")

          );

        }
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })
    this.router.navigate(["login"]);
  }
}

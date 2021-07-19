import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClassDirective} from "@angular/flex-layout";

export class SnackBar {

  constructor(public _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,
    });

  }

}

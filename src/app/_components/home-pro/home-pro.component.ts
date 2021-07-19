import {Component, HostListener, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {UserIdleService} from "angular-user-idle";
import {BnNgIdleService} from "bn-ng-idle";
import {AddDialogComponent} from "../dialogs/add/add.dialog.component";
import {LogiComponent} from "./patient/list-patients/appoint/logi.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {AuthenticationService} from "../../_services";
import {IddleUserComponent} from "../iddle-user/iddle-user.component";

@Component({
  selector: 'app-home-pro',
  templateUrl: './home-pro.component.html',
  styleUrls: ['./home-pro.component.css']
})
export class HomeProComponent implements OnInit {
  currentUser = localStorage.getItem("currentUser")
  interval;

  @HostListener('click') onClick() {
  }



  constructor(private router : Router,     private bnIdle: BnNgIdleService,
              public dialog: MatDialog, private authentifcationService : AuthenticationService
  ) {

    //this.startTimer(590)
    console.log(localStorage.getItem("currentRole" ))
    if (localStorage.getItem("currentRole" ) === "role_professional"){
      //this.timeLeft = 60

    } else {

      this.router.navigate(["/login"])
    }


  }



  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnDestroy(){





  }

  ngOnInit() {

    /*this.bnIdle.startWatching(9000).subscribe((isTimedOut: boolean) =>  {
      if (isTimedOut) {

        this.bnIdle.stopTimer()
        console.log('session expired');
        localStorage.removeItem("currentUser")
        localStorage.removeItem("currentToken")
        localStorage.removeItem("currentRole")
        const dialogRef = this.dialog.open(IddleUserComponent, {
          disableClose : true
        });
        dialogRef.afterClosed().subscribe(result => {

        })


      }

    })*/


  }



}

import {Component, HostBinding, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {PatientService} from "../../_services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Response} from "../../dto/Response"
import {PatientDto} from "../../dto/patient/PatientDto";
import {DetailsRecoComponent} from "../home-pro/patient/recomandation/details-reco/details-reco.component";
import {GpaqComponent} from "./gpaq/gpaq.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BreqComponent} from "./Breq/breq.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-pagepatient',
  templateUrl: './pagepatient.component.html',
  styleUrls: ['./pagepatient.component.css']
})
export class PagepatientComponent implements OnInit {
  obj;
  patient;
  token = null;
  firstname = "";
  lastName: "";
  fileNumber = "";
  patientId: string
  questionnaireToken;
  socio;
  expanded: boolean = false;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(private router: Router,
              private patientService: PatientService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<PagepatientComponent>,
              public dialog: MatDialog,
              private _snackBar : MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.questionnaireToken = localStorage.getItem("currentPatientToken")
  }

  ngOnInit() {

    this.ariaExpanded = this.expanded;
    this.getCodeFromURI()


  }

  gpag(){
    const dialogRef = this.dialog.open(GpaqComponent, {
      width :'80%',
      height:'85%'
    });
    dialogRef.afterClosed().subscribe(result => {



      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService

    });
  }
  breq(){
    const dialogRef = this.dialog.open(BreqComponent, {
      width :'80%',
      height:'85%'
    });
    dialogRef.afterClosed().subscribe(result => {




      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService

    });

  }

  is_expanded() {
    this.expanded = !this.expanded

  }

  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        if (this.questionnaireToken!= undefined) {
          this.token = this.questionnaireToken
          localStorage.setItem("currentPatientToken",this.token)
          console.log(this.token)
        } else {

          this.token = params.token;
          localStorage.setItem("currentPatientToken",this.token)
        }
        this.patientService.recup_token(this.token).subscribe(
          response => {
            this.obj = JSON.parse(JSON.stringify(response))
            this.patient = this.obj.object
            if (this.patient != null) {
              this.firstname = this.patient.firstname
              this.lastName = this.patient.lastName
              this.fileNumber = this.patient.fileNumber


              this.socio = this.patient.socioDemographicVariables
              this.patientId = this.obj.object.id
              console.log(this.obj)
            } else {
              this.router.navigate(["patient/login"])
            }
            if (this.obj.error != null) {
              this.token = null
            } else if (this.obj.object.questionnaireToken == null && this.questionnaireToken == null) {
              this.router.navigate(["patient/login"])
            } else {


            }

          },
          error => {

            this.router.navigate(["patient/login"])
          }
        );


      }, error => {
        this.router.navigate(["patient/login"])
      });


  }
  logOut(){
    localStorage.clear()
    location.reload()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    })}

}

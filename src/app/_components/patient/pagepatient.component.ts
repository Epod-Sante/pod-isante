import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {PatientService} from '../../_services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientDto} from '../../dto/patient/PatientDto';
import {GpaqComponent} from './gpaq/gpaq.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {BreqComponent} from './Breq/breq.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NbDialogService} from '@nebular/theme';
import {zoomCardAnimations} from '../../../assets/zoomCardAnimations';
import {PatientLoginService} from '../../_services/PatientLoginService';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-pagepatient',
  templateUrl: './pagepatient.component.html',
  styleUrls: ['./pagepatient.component.css'],
  animations: zoomCardAnimations
})
export class PagepatientComponent implements OnInit {
  obj;
  patient;
  token = null;
  firstname = '';
  lastName: '';
  fileNumber = '';
  patientId: string;
  questionnaireToken;
  socio;
  expanded = false;
  logoutCardState;
  cardState1 = 'inactive';
  cardState2 = 'inactive';
  cardState3 = 'inactive';
  cardState4 = 'inactive';
  page1 = 'active';
  page2 = 'inactive';
  page3 = 'inactive';
  page4 = 'inactive';
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  patient2: PatientDto;
  id: string;
  mySubscription: Subscription;
  private message: string;
  username: string;

  constructor(private router: Router,
              private patientService: PatientService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<PagepatientComponent>,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialogService: NbDialogService,
              private patientLoginService: PatientLoginService,
  ) {
    this.questionnaireToken = localStorage.getItem('currentPatientToken');
    this.patientId = localStorage.getItem('patientId');
    this.username = localStorage.getItem('patientName');

  }

  ngOnInit() {
    this.ariaExpanded = this.expanded;
    this.mySubscription = this.patientLoginService.currentMessage.subscribe(message => this.message = message);
    this.patient2 = this.message as unknown as PatientDto;
    this.patientLoginService.changeMessage(this.patientId);
    this.getCodeFromURI();


  }

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  gpag(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(GpaqComponent, {
      width: '100%',
      minHeight: 'calc(100vh - 90px)',
      height : 'auto'
    });

  }
  breq(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(BreqComponent,  {
      width: '100%',
      minHeight: 'calc(100vh - 90px)',
      height : 'auto'
    });



  }

  is_expanded() {
    this.expanded = !this.expanded;

  }

  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {

        if (params.token) {
          this.token = params.token;
          localStorage.setItem('currentPatientToken', this.token);

          this.patientService.recup_token(this.token).subscribe(
            response => {
              this.obj = JSON.parse(JSON.stringify(response));
              this.patient = this.obj.object;
              if (this.patient != null) {
                this.firstname = this.patient.firstname;
                this.lastName = this.patient.lastName;
                this.fileNumber = this.patient.fileNumber;


                this.socio = this.patient.socioDemographicVariables;
                this.patientId = this.obj.object.id;
              } else {
                this.router.navigate(['patient/login']);
              }
              if (this.obj.error != null) {
                this.token = null;
              } else if (this.obj.object.questionnaireToken == null && this.questionnaireToken == null) {
                this.router.navigate(['patient/login']);
              } else {


              }

            },
            error => {

              this.router.navigate(['patient/login']);
            }
          );
        }


      }, error => {
        this.router.navigate(['patient/login']);
      });


  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['patient/login']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    }); }

  hoverOn(card: number) {
    if (card === 1) {
      this.cardState1 = 'active';
      this.cardState2 = 'inactive';
      this.cardState3 = 'inactive';
      this.page1 = 'active';
      this.page2 = 'inactive';
      this.page3 = 'inactive';
      this.page4 = 'inactive';
    }
    if (card === 2) {
      this.cardState2 = 'active';
      this.cardState1 = 'inactive';
      this.cardState3 = 'inactive';
      this.page1 = 'inactive';
      this.page3 = 'inactive';
      this.page4 = 'inactive';
      this.page2 = 'active';
    }
    if (card === 3) {
      this.cardState3 = 'active';
      this.cardState1 = 'inactive';
      this.cardState2 = 'inactive';
      this.page3 = 'active';
      this.page1 = 'inactive';
      this.page2 = 'inactive';
      this.page4 = 'inactive';
    }
    if (card === 4) {
      this.cardState4 = 'active';
      this.page4 = 'active';
      this.page1 = 'inactive';
      this.page2 = 'inactive';
      this.page3 = 'inactive';
    }
  }

  hoverOut(card: number) {
    if (card === 1) {
      this.cardState1 = 'inactive';
    }
    if (card === 2) {
      this.cardState2 = 'inactive';
    }
    if (card === 3) {
      this.cardState3 = 'inactive';
    }
    if (card === 4) {
      this.cardState4 = 'inactive';
    }
  }

  hoverOnLogoutCard() {
    this.logoutCardState = 'active';
  }
  hoverOutLogoutCard() {
    this.logoutCardState = 'inactive';
  }
}

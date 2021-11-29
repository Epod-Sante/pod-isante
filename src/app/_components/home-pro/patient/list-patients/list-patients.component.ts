import {Component, OnInit, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {UserRequestDto} from '../../../../dto';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {PatientService} from '../../../../_services/patient.service';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {AddpatientComponent} from '../addpatient/addpatient.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../../../dialogs/add/add.dialog.component';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {Subscription} from 'rxjs';
import {IddleUserDialogComponent} from '../../../iddle-user-dialog/iddle-user-dialog.component';
import {UserIdleService} from 'angular-user-idle';


@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})

export class ListPatientsComponent implements OnInit, OnDestroy, AfterViewInit {
  patients: PatientDto[];
  patient = false;
  newPatient;
  addpatient;
  selected;
  colorSelected;
  appointment;
  name;
  id: string;
  idante: string;
  mySubscription: any;
  showProfile = false;
  blocKChecked = false;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(AddpatientComponent, {static: false}) myChild;
  public displayedColumns = ['nom', 'prenom', 'action'];
  public dataSource = new MatTableDataSource<PatientDto>();
  currentUser = localStorage.getItem('currentUser');
  message: string;
  subscription: Subscription;
  private pingSubscription: Subscription;


  constructor(private router: Router, private patientService: PatientService,
              public dialog: MatDialog,
              private data: PatientDataBetweenComponentsService,
              private userIdle: UserIdleService) {

    if (localStorage.getItem('currentRole') !== 'role_professional') {
        this.router.navigate(['/']);
    }

    this.getAllUsers();
    this.mySubscription = this.data.currentMessage.subscribe(message => this.message = message);
   /* localStorage.clear();
    const dialogRef = this.dialog.open(IddleUserDialogComponent, {
      disableClose : true

    });*/

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnChange(){
    console.log('1ngOnChange');

  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {Appointment: this.appointment}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
      }
      console.log(this.dataSource.data);

    });
  }

  ajouter() {
    this.addpatient = true;
    this.showProfile = false;
  }

  refresh_list($event) {
    this.newPatient = $event;
    this.getAllUsers();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllUsers = () => {
    this.patientService.getAll().subscribe(patients => {
      const pat = JSON.parse(JSON.stringify(patients)).object as PatientDto[];
      this.dataSource.data = pat;
      this.patients = pat;
      this.show_profile(this.patients[this.patients.length - 1].id);
      this.data.changeMessage(JSON.parse(JSON.stringify(patients)).object);
    });

  }

  show_profile(id: string) {
    this.id = id;
    this.addpatient = false;
    this.showProfile = true;
  }

  public redirectToUpdate = (element: UserRequestDto) => {
    const obj = JSON.parse(JSON.stringify(element));
    console.log(obj.account.enabled);
    if (element.account.enabled === false) {
      this.blocKChecked = true;
    } else {
      this.blocKChecked = false;
    }
  }


}

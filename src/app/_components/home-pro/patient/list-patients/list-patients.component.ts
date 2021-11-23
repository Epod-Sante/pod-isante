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

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
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
  exam = false;
  ante = false;
  socio = false;
  podo = false;
  mySubscription: any;
  showProfile = false;
  blocKChecked = false;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(AddpatientComponent, {static: false}) myChild;
  public displayedColumns = ['nom', 'prenom', 'action'];
  public dataSource = new MatTableDataSource<PatientDto>();
  currentUser = localStorage.getItem('currentUser');

  constructor(private router: Router, private patientService: PatientService,
              public dialog: MatDialog) {
    if (localStorage.getItem('currentRole') !== 'role_professional') {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getAllUsers();
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

  selectedPatient(id: string) {
    this.selected = id;
    this.colorSelected = 'red';
  }

  ajouter() {
    this.addpatient = true;
    this.showProfile = false;
    this.exam = false;
    this.ante = false;
    this.socio = false;
    this.podo = false;


  }

  refresh_list($event) {
    this.newPatient = $event;
    this.getAllUsers();
  }

  show_profile(id: string) {
    this.id = id;
    this.addpatient = false;
    this.showProfile = true;
    this.exam = false;
    this.ante = false;
    this.socio = false;
    this.podo = false;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getAllUsers = () => {
    this.patientService.getAll().subscribe(patients => {
      const pat = JSON.parse(JSON.stringify(patients));
      this.dataSource.data = pat.object as PatientDto[];
      this.patients = pat.object as PatientDto[];
      this.show_profile(this.patients[this.patients.length - 1].id);
    });
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

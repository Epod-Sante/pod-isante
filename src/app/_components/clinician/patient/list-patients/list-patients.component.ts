import {Component, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {UserRequestDto} from '../../../../dto';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {PatientService} from '../../../../_services/patient.service';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {AddpatientComponent} from '../addpatient/addpatient.component';
import {MatDialog} from '@angular/material/dialog';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {Subscription} from 'rxjs';
import {UserIdleService} from 'angular-user-idle';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';


@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})

export class ListPatientsComponent implements OnDestroy, AfterViewInit {
  patients: PatientDto[];
  patient: PatientDto;
  patientCE: ClinicalExaminationDto[];
  newPatient;
  addpatient;
  selected;
  colorSelected;
  appointment;
  name: string;
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
  medicalFile: MedicalFileDto;


  constructor(private router: Router, private patientService: PatientService,
              public dialog: MatDialog,
              private data: PatientDataBetweenComponentsService,
              private userIdle: UserIdleService) {

    if (localStorage.getItem('currentRole') !== 'role_professional') {
        this.router.navigate(['/']);
    }

    this.getAllUsers();
    this.mySubscription = this.data.currentMessage.subscribe(message => this.message = message);
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
      this.show_profile(this.patients[0]);
    },
      error => {
        localStorage.clear();
        this.router.navigate(['login']);
      });

  }

  show_profile(patient: PatientDto) {
    this.data.changeMessage(patient.id);
    this.id = patient.id;
    this.patient = patient;
    this.name = patient.firstName + ' ' + patient.lastName;
    this.addpatient = false;
    this.showProfile = true;
  }

  public redirectToUpdate = (element: UserRequestDto) => {
    const obj = JSON.parse(JSON.stringify(element));
    if (element.account.enabled === false) {
      this.blocKChecked = true;
    } else {
      this.blocKChecked = false;
    }
  }

}

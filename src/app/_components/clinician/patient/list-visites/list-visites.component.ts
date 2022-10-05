import {Component, Input, OnInit, Optional, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {NavigationEnd, Router} from '@angular/router';
import {Request, UserRequestDto} from '../../../../dto';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {PatientService} from '../../../../_services/patient.service';
import {RecomandationComponent} from '../recomandation/recomandation.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../appointment-dialogs/delete/delete.dialog.component';
import {EditDialogComponent} from '../../appointment-dialogs/edit/edit.dialog.component';
import {AddDialogComponent} from '../../appointment-dialogs/add/add.dialog.component';
import {first} from 'rxjs/operators';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {NbToastrService, NbWindowRef} from '@nebular/theme';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-list-visites',
  templateUrl: './list-visites.component.html',
  styleUrls: ['./list-visites.component.css']
})
export class ListVisitesComponent implements OnInit {
  id: string;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input() patient: PatientDto;
  patients: any[] = null;
  mySubscription: any;
  appointment;
  public displayedColumns = ['Date', 'Heure', 'Action'];
  public dataSource = new MatTableDataSource<AppointmentDto>();
  currentUser = localStorage.getItem('currentUser');
  subscription: any;
  date = '';

  constructor(private router: Router, private patientService: PatientService, private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService, @Optional() protected windowRef: NbWindowRef, public dialog: MatDialog) {
    this.subscription = this.data.currentMessage.subscribe(message => this.id = message);

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAllUsers();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update(rdv: AppointmentDto) {
    const request = new Request(rdv);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {request}
    });
  }

  delete(rdv: AppointmentDto) {
    // let appoint = new AppointmentDto(id,null,null,null,null)
    const request = new Request(rdv);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {request}

    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();

    });

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllUsers = () => {
    this.patientService.getRdv(this.patient.id).subscribe(patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      const pat = JSON.parse(JSON.stringify(patients));
      this.dataSource.data = pat.object as AppointmentDto[];
      this.patients = pat.object as AppointmentDto[];
    });
  }

  addAppointment() {
    if (this.date !== '') {
      const d = new Date(this.date);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const appoint = new AppointmentDto(null, this.id, currentUser.id, null, d);
      const request = new Request(appoint);
      this.patientService.addRdv(request).pipe(first())
        .subscribe(
          data => {
            this.date = '';
            const response = JSON.parse(JSON.stringify(data));
            this.dataSource.data = response.object as AppointmentDto[];
            this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
          },
          error => {
            this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
          });
    } else {
      this.showToast('top-right', 'info', 'Info', 'Veuillez ajouter une date');
    }
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
  print(){
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }
}

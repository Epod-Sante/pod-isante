import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NavigationEnd, Router} from "@angular/router";
import {Request, UserRequestDto} from "../../../../dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {AppointmentDto} from "../../../../dto/AppointmentDto";
import {PatientService} from "../../../../_services/patient.service";
import {RecomandationComponent} from "../recomandation/recomandation.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../dialogs/delete/delete.dialog.component";
import {EditDialogComponent} from "../../../dialogs/edit/edit.dialog.component";
import {AddDialogComponent} from "../../../dialogs/add/add.dialog.component";

@Component({
  selector: 'app-list-visites',
  templateUrl: './list-visites.component.html',
  styleUrls: ['./list-visites.component.css']
})
export class ListVisitesComponent implements OnInit {
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @Input() patient: PatientDto;
  patients : any[] = null;
  mySubscription : any
  appointment
  public displayedColumns = ['numero', 'date', 'action'
  ];
  public dataSource = new MatTableDataSource<AppointmentDto>();
  currentUser = localStorage.getItem("currentUser");
  constructor(private router : Router, private  patientService : PatientService
  ,public dialog: MatDialog) {
  // console.log(this.patient.id)
    if (localStorage.getItem("currentRole" ) === "role_professional") {


    }else{
      this.router.navigate(['/']);

    }




  }
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {Appointment: this.appointment,
              id : this.patient.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
      }
      console.log(this.dataSource.data)
      this.getAllUsers()

    });
  }


  update(rdv : AppointmentDto){
    let request = new Request(rdv)
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {request: request }
    });
  }
  delete(rdv : AppointmentDto){
    //let appoint = new AppointmentDto(id,null,null,null,null)
    let request = new Request(rdv)
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {request: request }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.getAllUsers()
      console.log(this.dataSource.data)

    });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAllUsers()



  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getAllUsers = () => {
    this.patientService.getRdv(this.patient.id).subscribe( patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      let pat = JSON.parse(JSON.stringify(patients))
      console.log(pat)
      this.dataSource.data = pat.object as AppointmentDto[]
      this.patients = pat.object as AppointmentDto[]



    });
    // console.log("yes "+this.users)
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (element: UserRequestDto) => {

}
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../_services";
import {Router} from '@angular/router';
import {ListPatientsComponent} from "./list-patients/list-patients.component";



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements AfterViewInit {
  @ViewChild(ListPatientsComponent,{static: false}) child;
  patient = false;
  currentUser = localStorage.getItem("currentUser");
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    if (localStorage.getItem("currentRole" ) === "role_professional") {


    }else{
      this.router.navigate(['/']);

    }
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.patient = this.child.addpatient;

  }

}

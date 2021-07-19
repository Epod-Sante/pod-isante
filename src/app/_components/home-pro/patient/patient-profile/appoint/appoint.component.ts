import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PatientDto} from "../../../../../dto/patient/PatientDto";

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.css']
})

export class AppointComponent implements OnInit {
  list_patient : PatientDto[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: PatientDto[]) {
    console.log("++++"+this.data)
  }

  ngOnInit() {
    console.log(this.data)
  }

}

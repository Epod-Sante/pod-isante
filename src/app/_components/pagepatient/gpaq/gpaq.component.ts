import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-gpaq',
  templateUrl: './gpaq.component.html',
  styleUrls: ['./gpaq.component.css']
})
export class GpaqComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GpaqComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}

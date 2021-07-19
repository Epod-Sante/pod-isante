import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-createrdv',
  templateUrl: './createrdv.component.html',
  styleUrls: ['./createrdv.component.css']
})
export class CreaterdvComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor() { }

  ngOnInit() {
  }

}

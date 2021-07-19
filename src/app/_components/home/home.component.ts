import { Component, OnInit, Input ,ViewChild } from '@angular/core';
import {chainedInstruction} from "@angular/compiler/src/render3/view/util";
import  { AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@ViewChild(MainNavComponent, {static: true} ) child;
  //@Input() is_admin : boolean = false;
  currentUser
  currentRole


  @ViewChild(AppComponent, {static: false}) child;
  constructor(public router : Router, private route : ActivatedRoute) {
     this.ngOnInit()
    this.currentUser = localStorage.getItem("currentUser")
    this.currentRole = localStorage.getItem("currentRole")
    if (this.currentRole === "role_admin") {
    } else {
      this.router.navigate(["/login"])
    }

   }



  ngOnInit() {
    this.currentUser = localStorage.getItem("currentUser")
    this.currentRole = localStorage.getItem("currentRole")











  }

}

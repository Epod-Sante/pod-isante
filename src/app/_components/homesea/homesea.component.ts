import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homesea',
  templateUrl: './homesea.component.html',
  styleUrls: ['./homesea.component.css']
})
export class HomeseaComponent implements OnInit {

  currentUser = localStorage.getItem("currentUser")

  constructor(private router : Router) {
    if (localStorage.getItem("currentRole" ) === "role_searcher"){
      console.log(localStorage.getItem("currentRole" ))

    } else {
      console.log(localStorage.getItem("currentRole" ))
      router.navigate(["/login"])
    }


  }

  ngOnInit() {
  }

}

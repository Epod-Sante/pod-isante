import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  currentUser = localStorage.getItem("currentUser");
  constructor(private router: Router) {
    if (localStorage.getItem("currentRole" ) === "role_professional") {


    }else{
      this.router.navigate(['/']);

    }
  }

  ngOnInit() {
  }

}

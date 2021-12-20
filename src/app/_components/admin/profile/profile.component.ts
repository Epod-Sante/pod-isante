import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_services";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading = false;
  currentUser = localStorage.getItem("currentUser");

  constructor(private  router: Router,
  private authenticationService: AuthenticationService) {
    if (localStorage.getItem("currentRole" ) === "role_admin") {

    } else {
      router.navigate(["/"])
    }
}

  ngOnInit() {
  }

}

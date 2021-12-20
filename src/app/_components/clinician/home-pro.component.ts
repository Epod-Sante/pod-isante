import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-pro',
  templateUrl: './home-pro.component.html',
  styleUrls: ['./home-pro.component.css']
})
export class HomeProComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  interval;

  @HostListener('click') onClick() {
  }


  constructor(private router: Router, public dialog: MatDialog) {
    if (localStorage.getItem('currentRole') !== 'role_professional') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }


}

import { Component, OnInit, Input , ViewChild } from '@angular/core';
import {chainedInstruction} from '@angular/compiler/src/render3/view/util';
import  { AppComponent} from '../../app.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {AuthenticationService} from "../../_services";


@Component({
  selector: 'app-clinician',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ViewChild(MainNavComponent, {static: true} ) child;
  // @Input() is_admin : boolean = false;
  currentUser;
  currentRole;

  toggleOn = false;
  toggleOff = true;
  selectedItem: string;

  MENU_ITEMS1: NbMenuItem[] = [
    {
      title: 'Utilisateurs',
      link: '/inviter',
      icon: 'person-outline',
      home: true,
    },
    {
      title: 'Appareils',
      link: '/device',
      icon: { icon: 'watch', pack: 'myicon'},
    },
  ];

  MENU_ITEMS2: NbMenuItem[] = [
    {
      title: 'Guide',
      icon: 'bulb-outline',
      url: 'https://sway.office.com/L1oSmMGRpJHiiFh9?authoringPlay=true&publish',
      target: '_blank',
    },
    {
      title: 'Déconnexion',
      icon: 'log-out-outline',
    }
  ];



  @ViewChild(AppComponent, {static: false}) child;
  constructor(public router: Router, private route: ActivatedRoute, private menuService: NbMenuService,
              private authService: AuthenticationService,
              private sidebarService: NbSidebarService) {
     this.ngOnInit();
     this.currentUser = localStorage.getItem('currentUser');
     this.currentRole = localStorage.getItem('currentRole');
     if (this.currentRole !== 'role_admin') {
       this.router.navigate(['/login']);
    }

   }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentRole = localStorage.getItem('currentRole');
    this.getSelectedItem();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getSelectedItem() {
    this.menuService.onItemClick().subscribe((data) => {

      if (data.item.title === 'Déconnexion') {
        this.logOut();
      }
    });

  }

  toggle() {
    this.sidebarService.toggle(true, 'left');
    if (this.toggleOn) {
      this.toggleOff = true;
      this.toggleOn = false;
    } else if (this.toggleOff) {
      this.toggleOn = true;
      this.toggleOff = false;
    }
  }

}

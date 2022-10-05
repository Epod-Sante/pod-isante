import {Component,  ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


import {first, map, shareReplay} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../../_services';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {


  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private http: HttpClient, private authenticationService: AuthenticationService) {
    if (localStorage.getItem('currentRole' ) === 'role_admin'){
      this.obj = JSON.parse(this.currentUser);

    }else {
      router.navigate(['/']);
    }


  }
  currentUser = localStorage.getItem('currentUser');
  obj: any;

  @ViewChild('sidenav', {static : false}) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  appitems = [
    {
      label: 'E-pod Sante',
      icon: '',
      imageIcon: 'https://www.jobillico.com/medias/logo-entreprise/0/0/exp_logo_7966_fr_2016_09_02_14_49_44.png',
      link: '',
      externalRedirect: true
    },
    {
      label: 'ADMINSTRATION',
      icon: 'supervised_user_circle',
      items: [
        {
          label: 'Utilisateurs',
          link: 'inviter',
          icon: 'supervisor_account',

        },

        {
          label: 'Appareils',
          link: 'device',
          icon: 'watch'
        }

      ]
    }


  ];
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `white`,
    fontColor: `#323232`,
    backgroundColor: `white`,
    selectedListFontColor: `blue`,
    // highlightOnSelect: true,
    collapseOnSelect: false,
    rtlLayout: false
  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  selectedItem($event) {


  }

  selectedLabel($event) {
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}







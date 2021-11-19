import {Component, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {NbIconConfig, NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IPOD-SANTE';
  currentRole = localStorage.getItem('currentRole');
  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };

  MENU_ITEMS = [
    {
      title: 'Home',
      link: '/listpatient',
      icon: 'home-outline',
      home: true,
      expanded: true,
    },
    {
      title: 'User account',
      link: '/listpatient',
      icon: 'person-outline',
      expanded: true,
    },
    {
      title: 'Shop',
      icon: 'shopping-cart-outline',
      expanded: true,
    },
  ];

  constructor(private router: Router, private sidebarService: NbSidebarService){




  }

  toggle() {
    this.sidebarService.toggle(true, 'left');
  }

}

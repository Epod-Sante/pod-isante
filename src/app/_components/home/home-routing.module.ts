import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {DevicesComponent} from './devices/devices.component';
import {InviteComponent} from './invite/invite.component';
import {NgModule} from '@angular/core';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'device',
        component: DevicesComponent
      },
      {
        path: 'inviter',
        component: InviteComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule{ }

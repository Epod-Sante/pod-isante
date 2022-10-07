import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {DevicesComponent} from './devices/devices.component';
import {InviteComponent} from './invite/invite.component';
import {NgModule} from '@angular/core';
import {NbIconLibraries} from "@nebular/theme";
import {RegisterComponent} from "../register/register.component";

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InviteComponent
      },
      {
        path: 'device',
        component: DevicesComponent
      },
      {
        path: 'inviter',
        component: InviteComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule{
  constructor(iconsLibrary: NbIconLibraries) {
    iconsLibrary.registerSvgPack('myicon', { 'watch': '<img src="../../../assets/smart-watch.png" width="20px">', });
  }


}

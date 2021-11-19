import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import {NgModule} from '@angular/core';
import {ObjectifV2Component} from './objectif-v2.component';
import {NbStepperModule} from '@nebular/theme';


@NgModule({
  imports: [
  RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
  NbLayoutModule,
  NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
  NbButtonModule,
    NbStepperModule
],

})
export class ObjectifV2Module {}

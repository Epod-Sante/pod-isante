import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainNavProfRoutes } from './main-nav-prof.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainNavProfRoutes)
  ]
})
export  class  MainNavModuleProf {

}

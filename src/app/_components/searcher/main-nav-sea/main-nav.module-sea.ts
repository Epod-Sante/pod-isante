import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainNavSeaRoutes } from './main-nav-sea.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainNavSeaRoutes)
  ]
})
export  class  MainNavModuleSea {

}

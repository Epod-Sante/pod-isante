import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeseaComponent} from "./homesea.component";
import {RechercheComponent} from "./recherche/recherche.component";


const homeSeaRoutes: Routes = [
  {
    path: '',
    component: HomeseaComponent,
    children: [
      {
        path: '',
        component: HomeseaComponent
      },
      { path: 'recherche', component: RechercheComponent}

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeSeaRoutes)],
  exports: [RouterModule]
})
export class HomeSeaRoutingModule{ }

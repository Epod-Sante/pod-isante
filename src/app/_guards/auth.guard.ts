import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
     {  const currentUser = localStorage.getItem("currentUser");
       if (currentUser) {

         //const currentUser = localStorage.getItem("currentUser");
         return true;

       }
         // navigate to login page
         this.router.navigate(['/login']);
         // you can save redirect url so after authing we can move them back to the page they requested
         return false;






     }

}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, empty, Observable, throwError} from 'rxjs';
import {catchError, concatMap, delay, filter, retry, retryWhen, switchMap, take, tap} from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  cachedRequests: Array<HttpRequest<any>> = [];
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isRefreshingToken: boolean = false;
  newToken : string
  objj;
  request: HttpRequest<any>
  constructor(private authenticationService: AuthenticationService) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.collectFailedRequest( request );
          this.tokenSubject.next(null);
          this.authenticationService.refresh_token().subscribe(ok => {
            let o = JSON.parse(JSON.stringify(ok))
            this.newToken = o.access_token

          })
          let token = localStorage.getItem("currentToken");
          const obj = JSON.parse(token);
          let req = request.clone({headers: request.headers.set('Authorization', 'bearer ' + obj.access_token)})
          return next.handle(req)
          //let obj = JSON.parse(JSON.stringify(this.authenticationService.refresh_token()))




        } else  if (err.status === 500 && request.url.startsWith("https://epod-zuul.herokuapp.com/api/v1/auth-service/oauth/token")) {
          localStorage.clear()
          this.authenticationService.logout()

        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }))
    }
 /*   async retryReq(request: HttpRequest<any>, next: HttpHandler) {
    try {
      const TokenPromise = this.authenticationService.refresh_token()
      let tok = await TokenPromise
      console.log(tok)
      let req = request.clone({headers: request.headers.set('Authorization', 'bearer ' + this.newToken)})
      return next.handle(req)
    } catch (e) {
      return e






    }
     }*/

  public collectFailedRequest ( request ): void {
    this.cachedRequests.push( request );
  }

}

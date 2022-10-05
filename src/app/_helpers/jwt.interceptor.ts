import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
      const token: string = localStorage.getItem('token');

      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }

      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }

      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

      return next.handle(request).pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        })/*,catchError((error: HttpErrorResponse) => {
        this.authenticationService.refresh_token().subscribe(reponse =>{
          console.log("ok")
        }, error1 => {
          console.log("non")
        });
        return throwError(error);
      }*/);

    }
}

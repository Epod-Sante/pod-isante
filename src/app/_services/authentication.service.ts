import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, empty, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import {Token, User} from '../_models';
import {LoginClientDTO} from '../dto/LoginClientDTO';
import {PasswordUpdateDto} from '../dto';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import 'rxjs-compat/add/observable/of';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public authTokenNew = 'new_auth_token';
  public currentToken: string;
  LOGIN_URL: string;
  FORGET_PASSWORD_URL: string;
  CONFIRMATION_EMAIL_URL: string;
  PASSWORD_UPDATE_TOKEN_URL: string;
  PASSWORD_UPDATE_URL: string;
  LOG_OUT_URL: string;
  REFRESH_TOKEN: string;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.LOGIN_URL = environment.LOGIN_URL;
    this.FORGET_PASSWORD_URL = environment.FORGET_PASSWORD_URL;
    this.CONFIRMATION_EMAIL_URL = environment.CONFIRMATION_EMAIL_URL;
    this.PASSWORD_UPDATE_TOKEN_URL = environment.PASSWORD_UPDATE_TOKEN_URL;
    this.PASSWORD_UPDATE_URL = environment.PASSWORD_UPDATE_URL;
    this.LOG_OUT_URL = environment.LOG_OUT_URL;
    this.REFRESH_TOKEN = environment.REFRESH_TOKEN;


  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return false;
  }

  login(loginClientDto: LoginClientDTO) {
    const params = new HttpParams()
      .set('username', loginClientDto.username)
      .set('password', loginClientDto.password)
      .set('grant_type', 'password');
    const header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});


    return this.http.post(this.LOGIN_URL, null, {
      headers: header,
      params
    })
      .pipe(map(token => {
          // login successful if there's a jwt token in the response


          if (token) {
            localStorage.setItem('currentToken', JSON.stringify(token));
            const code = localStorage.getItem('currentToken');
            const decoded = jwtDecode(code);
            const role = decoded.role;
            window.localStorage.time = new Date().getTime();
            localStorage.setItem('currentRole', role.toLowerCase());
            localStorage.setItem('currentUser', JSON.stringify(decoded));
          }

          return LoginClientDTO;
        })
      );


  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  refresh_token() {
    const currentToken = JSON.parse(localStorage.getItem('currentToken'));
    const currentUser = localStorage.getItem('currentToken');
    const decoded = jwtDecode(currentUser);
    const username = decoded.user_name;
    const refresh_token = currentToken.refresh_token;


    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('user_name', username);
      // .set('refresh_token',refresh_token )
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);


    return this.http.post(this.REFRESH_TOKEN, null, {
      params,
    })
      .pipe(tap(tokken => {

          // login successful if there's a jwt token in the response


          if (tokken) {
            localStorage.clear();

            localStorage.setItem('currentToken', JSON.stringify(tokken));
            const code = localStorage.getItem('currentToken');
            const decoded = jwtDecode(code);
            const role = decoded.role;
            window.localStorage.time = new Date().getTime();
            localStorage.setItem('currentRole', role.toLowerCase());
            localStorage.setItem('currentUser', JSON.stringify(decoded));
            return Promise.resolve(tokken);
            // this.router.navigate([this.route.url])

          }else{
            return of (null);
          }


        })
      );

  }

// fonction pour mot de passe oublie
  forgetPassword(email: string) {
    const passDto = new PasswordUpdateDto();
    passDto.email = email;
    return this.http.post(this.FORGET_PASSWORD_URL, passDto);
  }

// verifie le token et active le compte si le token est valide
  confirmationEmail(token: string): Observable<any> {
    const header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.http.get(this.CONFIRMATION_EMAIL_URL + token,
      {responseType: 'text'});


  }

  // verifier la validite token du lien envoyer par mail pour changer le mot de passe
  passwordUpdateToken(token: string): Observable<any> {
    const header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.http.get(this.PASSWORD_UPDATE_TOKEN_URL + token,
      {responseType: 'text'});


  }

  // changement du mot de passe
  passwordUpdate(token: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token)
      .set('password', password);
    const header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});


    return this.http.post(this.PASSWORD_UPDATE_URL, null, {
      headers: header,
      params
    });


  }

  logout()  {
    // remove user from local storage to log user out
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);

    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    this.http.delete(this.LOG_OUT_URL, {headers: header}).subscribe(reponse => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}

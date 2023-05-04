import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInviteDto} from '../dto/UserInviteDto';
import {Request, UserRequestDto} from '../dto';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class UserService {
  REGISTER_URL: string;
  INVITER_URL: string;
  VERIF_TOK_INVITE: string;
  USERS_URL: string;
  BLOCK_USER_URL: string;
  ADD_DEVICE: string;
  RM_DEVICE: string;
  LIST_DEVICES: string;
  AUTH_DEVICE: string;
  USER_INFO: string;
  FITBIT_PROFILE: string;


  constructor(private http: HttpClient) {
    this.REGISTER_URL = environment.REGISTER_URL;
    this.INVITER_URL = environment.INVITER_URL;
    this.VERIF_TOK_INVITE = environment.VERIF_TOK_INVITE;
    this.USERS_URL = environment.USERS_URL;
    this.BLOCK_USER_URL = environment.BLOCK_USER_URL;
    this.ADD_DEVICE = environment.ADD_DEVICE;
    this.RM_DEVICE = environment.RM_DEVICE;
    this.LIST_DEVICES = environment.LIST_DEVICES;
    this.AUTH_DEVICE = environment.AUTH_DEVICE;
    this.USER_INFO = environment.USER_INFO;
    this.FITBIT_PROFILE = environment.FITBIT_PROFILE;

  }

  getAll() {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.USERS_URL, {headers: header});
  }

  getById(id: number) {
    // return this.http.get('/users/' + id);
  }

  getCa() {
    // return  [ { id: '../../data/ca.json'}];
  }

  register(registrationClientDto: string): Observable<any>{
    return this.http.post(this.REGISTER_URL, registrationClientDto, {headers: {'Content-Type': 'application/json'}});


  }

  info_user(username: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    const params = new HttpParams()
      .set('username', username);
    return this.http.post(this.USER_INFO, null, {
      headers: header,
      params
    });


  }

  recup_token(token: string) {

    return this.http.get(this.VERIF_TOK_INVITE + token);
  }

  inviter(userInviteDto: UserInviteDto): Observable<any>{
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.post(this.INVITER_URL, userInviteDto, {headers: header});


  }

  // service podometre

  addPodo(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});

    return this.http.post(this.ADD_DEVICE, request, {headers: header});

  }

  removePodo(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: 'bearer ' + obj.access_token
      }),
      body: request
    };
    return this.http.delete(this.RM_DEVICE, options);

  }

  profilCheck(){
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);console.log(obj.access_token)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: 'bearer ' + obj.access_token
      })
    };
    return this.http.get(this.FITBIT_PROFILE, options);
  }


  autorizepodo(id: string, code: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params =
      new HttpParams()
        .set('code', code)
        .set('deviceId', id);




    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});


    return this.http.get(this.AUTH_DEVICE, {headers: header, params});
  }

  getPodos() {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.LIST_DEVICES, {headers: header});

  }


  block(user: UserRequestDto, blocker: boolean) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    const params = new HttpParams().set('enable', blocker.toString());


    return this.http.put(this.BLOCK_USER_URL, user, {headers: header, params});
  }

  /*delete(id: number) {
      return this.http.delete(`/users/` + id);
  }*/
}

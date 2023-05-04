import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInviteDto} from '../dto/UserInviteDto';
import {Request} from '../dto';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  ADD_PATIENT_URL: string;
  LIST_PATIENT_URL: string;
  ADD_SOCIO: string;
  ADD_ANTE: string;
  GET_SOCIO: string;
  ADD_EXAM: string;
  GET_PATIENT_BY_ID: string;
  VERIF_TOKEN_PATIENT: string;
  LOGIN_PATIENT: string;
  LIST_DEVICE_AVAILABLE: string;
  AFFECT_DEVICE: string;
  SYNC_DEVICE: string;
  RECUP_DEVICE: string;
  ADD_RDV: string;
  LIST_RDV: string;
  ADD_QUIZ: string;
  ADD_RECO: string;
  ALL_RECO: string;
  ADD_LIPID: string;
  GET_STEPS: string;
  GET_MINUTES: string;
  GET_QUIZ: string;
  ADD_QUIZINDI: string;
  GET_PATIENT_DEVICES: string;


  constructor(private http: HttpClient) {
    this.ADD_PATIENT_URL = environment.ADD_PATIENT_URL;
    this.LIST_PATIENT_URL = environment.LIST_PATIENT_URL;
    this.ADD_SOCIO = environment.ADD_SOCIO;
    this.ADD_ANTE = environment.ADD_ANTE;
    this.GET_SOCIO = environment.GET_SOCIO;
    this.ADD_EXAM = environment.ADD_EXAM;
    this.GET_PATIENT_BY_ID = environment.GET_PATIENT_BY_ID;
    this.VERIF_TOKEN_PATIENT = environment.VERIF_TOKEN_PATIENT;
    this.LOGIN_PATIENT = environment.LOGIN_PATIENT;
    this.LIST_DEVICE_AVAILABLE = environment.LIST_DEVICE_AVAILABLE;
    this.AFFECT_DEVICE = environment.AFFECT_DEVICE;
    this.RECUP_DEVICE = environment.RECUP_DEVICE;
    this.ADD_RDV = environment.ADD_RDV;
    this.LIST_RDV = environment.LIST_RDV;
    this.ADD_QUIZ = environment.ADD_QUIZ;
    this.ADD_RECO = environment.ADD_RECO;
    this.ADD_LIPID = environment.ADD_LIPID;
    this.GET_STEPS = environment.GET_STEPS;
    this.ALL_RECO = environment.ALL_RECO;
    this.GET_MINUTES = environment.GET_ACTIVEMINUTES;
    this.GET_QUIZ = environment.GET_QUIZ;
    this.ADD_QUIZINDI = environment.ADD_QUIZINDI;
    this.GET_PATIENT_DEVICES = environment.GET_PATIENT_DEVICES;
    this.SYNC_DEVICE = environment.SYNC_DEVICE;
  }


  getAll() {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.LIST_PATIENT_URL, {headers: header});

  }

  getById(id: number) {
    // return this.http.get('/users/' + id);
  }

  getCa() {
    // return  [ { id: '../../data/ca.json'}];
  }

  addPatient(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_PATIENT_URL, request, {headers: header});


  }

  addSocio(request: Request, patientId: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', patientId);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_SOCIO, request, {headers: header, params});


  }

  addLipid(request: Request, patientId: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', patientId);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_LIPID, request, {headers: header, params});


  }

  deleteRdv(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: 'bearer ' + obj.access_token
      }),
      body: request
    };
    return this.http.delete(this.ADD_RDV, options);

  }

  getSocio(id: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', id);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.get(this.GET_SOCIO, {headers: header, params});


  }

  getPatient(id: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', id);

    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.get(this.GET_PATIENT_BY_ID, {headers: header, params});

  }

  addAntecedants(request: Request, patientId: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', patientId);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_ANTE, request, {headers: header, params});


  }

  addExam(request: Request, patientId: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', patientId);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_EXAM, request, {headers: header, params});


  }

  addRdv(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_RDV, request, {headers: header});


  }

  updateRdv(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.put(this.ADD_RDV, request, {headers: header});


  }

  addQuiz(request: Request) {
    return this.http.post(this.ADD_QUIZ, request);
  }

  getRdv(id: string){
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', id);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    const data = this.http.get(this.LIST_RDV, {headers: header, params});
    return data;
  }

  editRdv(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.put(this.ADD_RDV, request, {headers: header});


  }

  recup_token(token: string) {
    return this.http.get(this.VERIF_TOKEN_PATIENT + token);
  }

  inviter(userInviteDto: UserInviteDto) {


  }

  login(request: Request) {

    const header = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});

    let rep;
    return this.http.post(this.LOGIN_PATIENT, request, {
      headers: header
    })

      .pipe(map(token => {
          // login successful if there's a jwt token in the response
          rep = token;

          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return token;

          }
          return token;

        })
      );


  }

  // podometres
  getPodosavailable(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('patientId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.LIST_DEVICE_AVAILABLE, {headers: header, params});

  }

  recup_podo(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.post(this.RECUP_DEVICE, request, {
      headers: header
    })
      .pipe(map(token => {
          return token;
        })
      );
  }

  affectPodo(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.AFFECT_DEVICE, request, {headers: header});

  }

  synchronizePodo(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.SYNC_DEVICE, request, {headers: header});

  }

  addReco(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_RECO, request, {headers: header});


  }

  upReco(request: Request) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.put(this.ADD_RECO, request, {headers: header});


  }

  getReco(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('patientId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders();
    return this.http.get(this.ADD_RECO, {headers: header, params});

  }

  getAllReco(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('patientId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.ALL_RECO, {headers: header, params});

  }
  getAllReco2(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('patientId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.ALL_RECO, {headers: header, params}).toPromise();

  }
  getSteps(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('medicalFileId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    /* const options = {
         headers: new HttpHeaders({
           'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'})
         ,params: params
       };*/
    return this.http.get(this.GET_STEPS, {headers: header, params});
  }

  getMinutes(id: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('medicalFileId', id);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    /* const options = {
         headers: new HttpHeaders({
           'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'})
         ,params: params
       };*/
    return this.http.get(this.GET_MINUTES, {headers: header, params});

  }

  getQuiz(id: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', id);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token});
    return this.http.get(this.GET_QUIZ, {headers: header, params});

  }

  addQuizIndi(request: Request, patientId: string) {
    const token = localStorage.getItem('currentToken');
    const obj = JSON.parse(token);
    const params = new HttpParams()
      .set('patientId', patientId);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.post(this.ADD_QUIZINDI, request, {headers: header, params});

  }

  /*delete(id: number) {
      return this.http.delete(`/users/` + id);
  }*/
  getPatientDevices(medicalFileId: string) {
    const token = localStorage.getItem('currentToken');
    const params = new HttpParams().set('medicalFileId', medicalFileId);
    const obj = JSON.parse(token);
    const header = new HttpHeaders({Authorization: 'bearer ' + obj.access_token, 'Content-Type': 'application/json'});
    return this.http.get(this.GET_PATIENT_DEVICES, {headers: header, params});
  }
}


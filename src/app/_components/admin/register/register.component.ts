import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import {map, startWith} from 'rxjs/operators';


import {AlertService, AuthenticationService, UserService} from '../../../_services';
import {UserRequestDto} from '../../../dto';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AccountDto} from '../../../dto/AccountDto';
import {EmailDto} from '../../../dto/EmailDto';
import {RoleDto} from '../../../dto/RoleDto';
import {InstitutionDto} from '../../../dto/InstitutionDto';
import {Profile} from '../../../dto/Profile';
import {AddressDto} from '../../../dto/AddressDto';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface City {
  city: string;
  admin: string;
  country: string;
  population_proper: string;
  iso2: string;
  capital: string;
  lat: string;
  lng: string;
  population: string;

}

@Component({templateUrl: 'register.component.html', styleUrls: ['./register.component.css']})
export class RegisterComponent implements OnInit {
  page = this.router.url;

  stateCtrl = new FormControl();
  filteredStates: Observable<City[]>;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  birthday: string;
  email: string;

  institutionCodeDisabled: boolean;
  institutionNameDisabled: boolean;
  profilelist: any;
  cittty: string [];
  role: Profile;
  cit: City;
  tokenpassword: string;
  tokrep: any;
  citizies: City [] = [
    {
      city: 'Toronto',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '3934421',
      iso2: 'CA',
      capital: 'admin',
      lat: '43.666667',
      lng: '-79.416667',
      population: '5213000'
    },
    {
      city: 'Montr\u00e9al',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '2356556',
      iso2: 'CA',
      capital: '',
      lat: '45.5',
      lng: '-73.583333',
      population: '3678000'
    },
    {
      city: 'Vancouver',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '603502',
      iso2: 'CA',
      capital: '',
      lat: '49.25',
      lng: '-123.133333',
      population: '2313328'
    },
    {
      city: 'Ottawa',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '812129',
      iso2: 'CA',
      capital: 'primary',
      lat: '45.416667',
      lng: '-75.7',
      population: '1145000'
    },
    {
      city: 'Calgary',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '915322',
      iso2: 'CA',
      capital: '',
      lat: '51.083333',
      lng: '-114.083333',
      population: '1110000'
    },
    {
      city: 'Edmonton',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '712391',
      iso2: 'CA',
      capital: 'admin',
      lat: '53.55',
      lng: '-113.5',
      population: '1058000'
    },
    {
      city: 'Hamilton',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '519949',
      iso2: 'CA',
      capital: '',
      lat: '43.256101',
      lng: '-79.857484',
      population: '721053'
    },
    {
      city: 'Winnipeg',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '575313',
      iso2: 'CA',
      capital: 'admin',
      lat: '49.883333',
      lng: '-97.166667',
      population: '632063'
    },
    {
      city: 'Qu\u00e9bec',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '528595',
      iso2: 'CA',
      capital: 'admin',
      lat: '46.8',
      lng: '-71.25',
      population: '624177'
    },
    {
      city: 'Oshawa',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '247989',
      iso2: 'CA',
      capital: '',
      lat: '43.9',
      lng: '-78.866667',
      population: '450963'
    },
    {
      city: 'Kitchener',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '409112',
      iso2: 'CA',
      capital: '',
      lat: '43.446976',
      lng: '-80.472484',
      population: '417001'
    },
    {
      city: 'Halifax',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '222874',
      iso2: 'CA',
      capital: 'admin',
      lat: '44.65',
      lng: '-63.6',
      population: '359111'
    },
    {
      city: 'London',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '335035',
      iso2: 'CA',
      capital: '',
      lat: '42.983333',
      lng: '-81.25',
      population: '346765'
    },
    {
      city: 'Windsor',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '210891',
      iso2: 'CA',
      capital: '',
      lat: '42.301649',
      lng: '-83.030744',
      population: '319246'
    },
    {
      city: 'Victoria',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '251358',
      iso2: 'CA',
      capital: 'admin',
      lat: '48.450234',
      lng: '-123.343529',
      population: '289625'
    },
    {
      city: 'Saskatoon',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '189193',
      iso2: 'CA',
      capital: '',
      lat: '52.133333',
      lng: '-106.666667',
      population: '198958'
    },
    {
      city: 'Barrie',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '119732',
      iso2: 'CA',
      capital: '',
      lat: '44.383333',
      lng: '-79.7',
      population: '182041'
    },
    {
      city: 'Regina',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '176183',
      iso2: 'CA',
      capital: 'admin',
      lat: '50.45',
      lng: '-104.616667',
      population: '176183'
    },
    {
      city: 'Sudbury',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '80507',
      iso2: 'CA',
      capital: '',
      lat: '46.5',
      lng: '-80.966667',
      population: '157857'
    },
    {
      city: 'Abbotsford',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '151683',
      iso2: 'CA',
      capital: '',
      lat: '49.05',
      lng: '-122.3',
      population: '151683'
    },
    {
      city: 'Sarnia',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '82998',
      iso2: 'CA',
      capital: '',
      lat: '42.978417',
      lng: '-82.388177',
      population: '144172'
    },
    {
      city: 'Sherbrooke',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '129447',
      iso2: 'CA',
      capital: '',
      lat: '45.4',
      lng: '-71.9',
      population: '139652'
    },
    {
      city: 'Saint John\u2019s',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '99182',
      iso2: 'CA',
      capital: 'admin',
      lat: '47.55',
      lng: '-52.666667',
      population: '131469'
    },
    {
      city: 'Kelowna',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '95306',
      iso2: 'CA',
      capital: '',
      lat: '49.9',
      lng: '-119.483333',
      population: '125109'
    },
    {
      city: 'Trois-Rivi\u00e8res',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '116409',
      iso2: 'CA',
      capital: '',
      lat: '46.35',
      lng: '-72.55',
      population: '119693'
    },
    {
      city: 'Kingston',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '102400',
      iso2: 'CA',
      capital: '',
      lat: '44.3',
      lng: '-76.566667',
      population: '114195'
    },
    {
      city: 'Thunder Bay',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '97374',
      iso2: 'CA',
      capital: '',
      lat: '48.4',
      lng: '-89.233333',
      population: '99334'
    },
    {
      city: 'Moncton',
      admin: 'New Brunswick',
      country: 'Canada',
      population_proper: '87467',
      iso2: 'CA',
      capital: '',
      lat: '46.09652',
      lng: '-64.79757',
      population: '90635'
    },
    {
      city: 'Saint John',
      admin: 'New Brunswick',
      country: 'Canada',
      population_proper: '54449',
      iso2: 'CA',
      capital: '',
      lat: '45.230798',
      lng: '-66.095316',
      population: '87857'
    },
    {
      city: 'Nanaimo',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '80491',
      iso2: 'CA',
      capital: '',
      lat: '49.15',
      lng: '-123.916667',
      population: '84905'
    },
    {
      city: 'Peterborough',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '75877',
      iso2: 'CA',
      capital: '',
      lat: '44.3',
      lng: '-78.333333',
      population: '83627'
    },
    {
      city: 'Saint-J\u00e9r\u00f4me',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '54948',
      iso2: 'CA',
      capital: '',
      lat: '45.766667',
      lng: '-74.0',
      population: '78439'
    },
    {
      city: 'Red Deer',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '73593',
      iso2: 'CA',
      capital: '',
      lat: '52.266667',
      lng: '-113.8',
      population: '74857'
    },
    {
      city: 'Lethbridge',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '58571',
      iso2: 'CA',
      capital: '',
      lat: '49.7',
      lng: '-112.833333',
      population: '70617'
    },
    {
      city: 'Kamloops',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '68628',
      iso2: 'CA',
      capital: '',
      lat: '50.666667',
      lng: '-120.333333',
      population: '68714'
    },
    {
      city: 'Prince George',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '62707',
      iso2: 'CA',
      capital: '',
      lat: '53.916667',
      lng: '-122.766667',
      population: '65558'
    },
    {
      city: 'Medicine Hat',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '53626',
      iso2: 'CA',
      capital: '',
      lat: '50.033333',
      lng: '-110.683333',
      population: '63138'
    },
    {
      city: 'Drummondville',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '54123',
      iso2: 'CA',
      capital: '',
      lat: '45.883333',
      lng: '-72.483333',
      population: '59489'
    },
    {
      city: 'Chicoutimi',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '53940',
      iso2: 'CA',
      capital: '',
      lat: '48.45',
      lng: '-71.066667',
      population: '53940'
    },
    {
      city: 'Fredericton',
      admin: 'New Brunswick',
      country: 'Canada',
      population_proper: '36713',
      iso2: 'CA',
      capital: 'admin',
      lat: '45.910648',
      lng: '-66.658649',
      population: '52337'
    },
    {
      city: 'Chilliwack',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '51942',
      iso2: 'CA',
      capital: '',
      lat: '49.166667',
      lng: '-121.95',
      population: '51942'
    },
    {
      city: 'North Bay',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '41807',
      iso2: 'CA',
      capital: '',
      lat: '46.3',
      lng: '-79.45',
      population: '50170'
    },
    {
      city: 'Shawinigan-Sud',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '34342',
      iso2: 'CA',
      capital: '',
      lat: '46.528557',
      lng: '-72.751453',
      population: '49161'
    },
    {
      city: 'Cornwall',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '46382',
      iso2: 'CA',
      capital: '',
      lat: '45.016667',
      lng: '-74.733333',
      population: '48821'
    },
    {
      city: 'Joliette',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '34772',
      iso2: 'CA',
      capital: '',
      lat: '46.034',
      lng: '-73.441',
      population: '45361'
    },
    {
      city: 'Belleville',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '43990',
      iso2: 'CA',
      capital: '',
      lat: '44.166667',
      lng: '-77.383333',
      population: '43990'
    },
    {
      city: 'Charlottetown',
      admin: 'Prince Edward Island',
      country: 'Canada',
      population_proper: '31293',
      iso2: 'CA',
      capital: 'admin',
      lat: '46.238225',
      lng: '-63.139481',
      population: '42402'
    },
    {
      city: 'Victoriaville',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '34426',
      iso2: 'CA',
      capital: '',
      lat: '46.063106',
      lng: '-71.958802',
      population: '41500'
    },
    {
      city: 'Grande Prairie',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '40845',
      iso2: 'CA',
      capital: '',
      lat: '55.166667',
      lng: '-118.8',
      population: '41462'
    },
    {
      city: 'Penticton',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '30349',
      iso2: 'CA',
      capital: '',
      lat: '49.5',
      lng: '-119.583333',
      population: '37721'
    },
    {
      city: 'Sydney',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '37538',
      iso2: 'CA',
      capital: '',
      lat: '46.15',
      lng: '-60.166667',
      population: '37538'
    },
    {
      city: 'Orillia',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '30178',
      iso2: 'CA',
      capital: '',
      lat: '44.6',
      lng: '-79.416667',
      population: '37483'
    },
    {
      city: 'Rimouski',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '35584',
      iso2: 'CA',
      capital: '',
      lat: '48.433333',
      lng: '-68.516667',
      population: '35584'
    },
    {
      city: 'Timmins',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '32901',
      iso2: 'CA',
      capital: '',
      lat: '48.466667',
      lng: '-81.333333',
      population: '34974'
    },
    {
      city: 'Prince Albert',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '24678',
      iso2: 'CA',
      capital: '',
      lat: '53.2',
      lng: '-105.75',
      population: '34609'
    },
    {
      city: 'Campbell River',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '26453',
      iso2: 'CA',
      capital: '',
      lat: '50.016667',
      lng: '-125.25',
      population: '33430'
    },
    {
      city: 'Courtenay',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '25099',
      iso2: 'CA',
      capital: '',
      lat: '49.683333',
      lng: '-125.0',
      population: '32793'
    },
    {
      city: 'Orangeville',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '28984',
      iso2: 'CA',
      capital: '',
      lat: '43.916366',
      lng: '-80.096671',
      population: '32640'
    },
    {
      city: 'Moose Jaw',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '30707',
      iso2: 'CA',
      capital: '',
      lat: '50.4',
      lng: '-105.55',
      population: '32166'
    },
    {
      city: 'Brandon',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '26234',
      iso2: 'CA',
      capital: '',
      lat: '49.833333',
      lng: '-99.95',
      population: '28418'
    },
    {
      city: 'Brockville',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '23886',
      iso2: 'CA',
      capital: '',
      lat: '44.594958',
      lng: '-75.682133',
      population: '26458'
    },
    {
      city: 'Saint-Georges',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '26149',
      iso2: 'CA',
      capital: '',
      lat: '46.116667',
      lng: '-70.683333',
      population: '26149'
    },
    {
      city: 'Sept-\u00celes',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '25686',
      iso2: 'CA',
      capital: '',
      lat: '50.2',
      lng: '-66.383333',
      population: '25686'
    },
    {
      city: 'Rouyn-Noranda',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '24023',
      iso2: 'CA',
      capital: '',
      lat: '48.25',
      lng: '-79.016667',
      population: '24602'
    },
    {
      city: 'Whitehorse',
      admin: 'Yukon',
      country: 'Canada',
      population_proper: '23272',
      iso2: 'CA',
      capital: 'admin',
      lat: '60.716667',
      lng: '-135.05',
      population: '23276'
    },
    {
      city: 'Owen Sound',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '22625',
      iso2: 'CA',
      capital: '',
      lat: '44.566667',
      lng: '-80.85',
      population: '22625'
    },
    {
      city: 'Fort McMurray',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '21863',
      iso2: 'CA',
      capital: '',
      lat: '56.733333',
      lng: '-111.383333',
      population: '21863'
    },
    {
      city: 'Corner Brook',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '18693',
      iso2: 'CA',
      capital: '',
      lat: '48.95',
      lng: '-57.933333',
      population: '20791'
    },
    {
      city: 'Val-d\u2019Or',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '20625',
      iso2: 'CA',
      capital: '',
      lat: '48.116667',
      lng: '-77.766667',
      population: '20625'
    },
    {
      city: 'New Glasgow',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '19445',
      iso2: 'CA',
      capital: '',
      lat: '45.583333',
      lng: '-62.633333',
      population: '20322'
    },
    {
      city: 'Terrace',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '10101',
      iso2: 'CA',
      capital: '',
      lat: '54.5',
      lng: '-128.583333',
      population: '19443'
    },
    {
      city: 'North Battleford',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '12003',
      iso2: 'CA',
      capital: '',
      lat: '52.766667',
      lng: '-108.283333',
      population: '19440'
    },
    {
      city: 'Yellowknife',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '18083',
      iso2: 'CA',
      capital: 'admin',
      lat: '62.45',
      lng: '-114.35',
      population: '19234'
    },
    {
      city: 'Fort Saint John',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '17402',
      iso2: 'CA',
      capital: '',
      lat: '56.25',
      lng: '-120.833333',
      population: '18776'
    },
    {
      city: 'Cranbrook',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '17370',
      iso2: 'CA',
      capital: '',
      lat: '49.516667',
      lng: '-115.766667',
      population: '18610'
    },
    {
      city: 'Edmundston',
      admin: 'New Brunswick',
      country: 'Canada',
      population_proper: '17894',
      iso2: 'CA',
      capital: '',
      lat: '47.36226',
      lng: '-68.327874',
      population: '17894'
    },
    {
      city: 'Rivi\u00e8re-du-Loup',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '16403',
      iso2: 'CA',
      capital: '',
      lat: '47.833333',
      lng: '-69.533333',
      population: '16403'
    },
    {
      city: 'Camrose',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '15686',
      iso2: 'CA',
      capital: '',
      lat: '53.016667',
      lng: '-112.816667',
      population: '15808'
    },
    {
      city: 'Pembroke',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '15551',
      iso2: 'CA',
      capital: '',
      lat: '45.816667',
      lng: '-77.116667',
      population: '15551'
    },
    {
      city: 'Yorkton',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '13583',
      iso2: 'CA',
      capital: '',
      lat: '51.216667',
      lng: '-102.466667',
      population: '15172'
    },
    {
      city: 'Swift Current',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '14703',
      iso2: 'CA',
      capital: '',
      lat: '50.283333',
      lng: '-107.766667',
      population: '14906'
    },
    {
      city: 'Prince Rupert',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '14708',
      iso2: 'CA',
      capital: '',
      lat: '54.316667',
      lng: '-130.333333',
      population: '14708'
    },
    {
      city: 'Williams Lake',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '10554',
      iso2: 'CA',
      capital: '',
      lat: '52.116667',
      lng: '-122.15',
      population: '14168'
    },
    {
      city: 'Brooks',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '12744',
      iso2: 'CA',
      capital: '',
      lat: '50.566667',
      lng: '-111.9',
      population: '14163'
    },
    {
      city: 'Quesnel',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '13788',
      iso2: 'CA',
      capital: '',
      lat: '52.983333',
      lng: '-122.483333',
      population: '13788'
    },
    {
      city: 'Thompson',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '12467',
      iso2: 'CA',
      capital: '',
      lat: '55.75',
      lng: '-97.866667',
      population: '13727'
    },
    {
      city: 'Dolbeau',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '12916',
      iso2: 'CA',
      capital: '',
      lat: '48.866667',
      lng: '-72.233333',
      population: '13337'
    },
    {
      city: 'Powell River',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '3220',
      iso2: 'CA',
      capital: '',
      lat: '49.883333',
      lng: '-124.55',
      population: '12779'
    },
    {
      city: 'Wetaskiwin',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '11302',
      iso2: 'CA',
      capital: '',
      lat: '52.966667',
      lng: '-113.383333',
      population: '11823'
    },
    {
      city: 'Nelson',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '9813',
      iso2: 'CA',
      capital: '',
      lat: '49.483333',
      lng: '-117.283333',
      population: '11779'
    },
    {
      city: 'Mont-Laurier',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '11642',
      iso2: 'CA',
      capital: '',
      lat: '46.55',
      lng: '-75.5',
      population: '11642'
    },
    {
      city: 'Kenora',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '10852',
      iso2: 'CA',
      capital: '',
      lat: '49.766667',
      lng: '-94.466667',
      population: '10852'
    },
    {
      city: 'Dawson Creek',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '10551',
      iso2: 'CA',
      capital: '',
      lat: '55.766667',
      lng: '-120.233333',
      population: '10802'
    },
    {
      city: 'Amos',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '10435',
      iso2: 'CA',
      capital: '',
      lat: '48.566667',
      lng: '-78.116667',
      population: '10516'
    },
    {
      city: 'Baie-Comeau',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '7181',
      iso2: 'CA',
      capital: '',
      lat: '49.216667',
      lng: '-68.15',
      population: '10435'
    },
    {
      city: 'Hinton',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '9889',
      iso2: 'CA',
      capital: '',
      lat: '53.4',
      lng: '-117.583333',
      population: '10265'
    },
    {
      city: 'Selkirk',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '9653',
      iso2: 'CA',
      capital: '',
      lat: '50.15',
      lng: '-96.883333',
      population: '9986'
    },
    {
      city: 'Steinbach',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '9607',
      iso2: 'CA',
      capital: '',
      lat: '49.516667',
      lng: '-96.683333',
      population: '9729'
    },
    {
      city: 'Weyburn',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '9243',
      iso2: 'CA',
      capital: '',
      lat: '49.666667',
      lng: '-103.85',
      population: '9362'
    },
    {
      city: 'Amherst',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '7927',
      iso2: 'CA',
      capital: '',
      lat: '45.830019',
      lng: '-64.210024',
      population: '9336'
    },
    {
      city: 'Kapuskasing',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '8224',
      iso2: 'CA',
      capital: '',
      lat: '49.416667',
      lng: '-82.433333',
      population: '9240'
    },
    {
      city: 'Dauphin',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '8418',
      iso2: 'CA',
      capital: '',
      lat: '51.15',
      lng: '-100.05',
      population: '9077'
    },
    {
      city: 'Dryden',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '7862',
      iso2: 'CA',
      capital: '',
      lat: '49.783333',
      lng: '-92.833333',
      population: '7862'
    },
    {
      city: 'Revelstoke',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '7533',
      iso2: 'CA',
      capital: '',
      lat: '51.0',
      lng: '-118.183333',
      population: '7668'
    },
    {
      city: 'Happy Valley',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '1047',
      iso2: 'CA',
      capital: '',
      lat: '53.3',
      lng: '-60.3',
      population: '7572'
    },
    {
      city: 'Banff',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '6292',
      iso2: 'CA',
      capital: '',
      lat: '51.166667',
      lng: '-115.566667',
      population: '7502'
    },
    {
      city: 'Yarmouth',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '7366',
      iso2: 'CA',
      capital: '',
      lat: '43.833965',
      lng: '-66.113926',
      population: '7500'
    },
    {
      city: 'La Sarre',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '5527',
      iso2: 'CA',
      capital: '',
      lat: '48.8',
      lng: '-79.2',
      population: '7206'
    },
    {
      city: 'Parry Sound',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '6469',
      iso2: 'CA',
      capital: '',
      lat: '45.333333',
      lng: '-80.033333',
      population: '7105'
    },
    {
      city: 'Stephenville',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '6278',
      iso2: 'CA',
      capital: '',
      lat: '48.55',
      lng: '-58.566667',
      population: '7054'
    },
    {
      city: 'Antigonish',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '5003',
      iso2: 'CA',
      capital: '',
      lat: '45.616667',
      lng: '-61.966667',
      population: '6739'
    },
    {
      city: 'Flin Flon',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '6002',
      iso2: 'CA',
      capital: '',
      lat: '54.766667',
      lng: '-101.883333',
      population: '6393'
    },
    {
      city: 'Fort Nelson',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '6315',
      iso2: 'CA',
      capital: '',
      lat: '58.816667',
      lng: '-122.533333',
      population: '6315'
    },
    {
      city: 'Smithers',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '5438',
      iso2: 'CA',
      capital: '',
      lat: '54.766667',
      lng: '-127.166667',
      population: '6245'
    },
    {
      city: 'Iqaluit',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '6124',
      iso2: 'CA',
      capital: 'admin',
      lat: '63.733333',
      lng: '-68.5',
      population: '6124'
    },
    {
      city: 'Bathurst',
      admin: 'New Brunswick',
      country: 'Canada',
      population_proper: '4496',
      iso2: 'CA',
      capital: '',
      lat: '47.558376',
      lng: '-65.656517',
      population: '6111'
    },
    {
      city: 'The Pas',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '3802',
      iso2: 'CA',
      capital: '',
      lat: '53.816667',
      lng: '-101.233333',
      population: '6055'
    },
    {
      city: 'Norway House',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '5000',
      iso2: 'CA',
      capital: '',
      lat: '53.966667',
      lng: '-97.833333',
      population: '6000'
    },
    {
      city: 'Meadow Lake',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '4281',
      iso2: 'CA',
      capital: '',
      lat: '54.129722',
      lng: '-108.434722',
      population: '5882'
    },
    {
      city: 'Vegreville',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '5678',
      iso2: 'CA',
      capital: '',
      lat: '53.5',
      lng: '-112.05',
      population: '5813'
    },
    {
      city: 'Stettler',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '5405',
      iso2: 'CA',
      capital: '',
      lat: '52.333333',
      lng: '-112.683333',
      population: '5494'
    },
    {
      city: 'Peace River',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '4689',
      iso2: 'CA',
      capital: '',
      lat: '56.233333',
      lng: '-117.283333',
      population: '5340'
    },
    {
      city: 'New Liskeard',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '5203',
      iso2: 'CA',
      capital: '',
      lat: '47.5',
      lng: '-79.666667',
      population: '5203'
    },
    {
      city: 'Hearst',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '4746',
      iso2: 'CA',
      capital: '',
      lat: '49.7',
      lng: '-83.666667',
      population: '5043'
    },
    {
      city: 'Creston',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '4816',
      iso2: 'CA',
      capital: '',
      lat: '49.1',
      lng: '-116.516667',
      population: '4816'
    },
    {
      city: 'Marathon',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '4627',
      iso2: 'CA',
      capital: '',
      lat: '48.75',
      lng: '-86.366667',
      population: '4627'
    },
    {
      city: 'Cochrane',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '4441',
      iso2: 'CA',
      capital: '',
      lat: '49.066667',
      lng: '-81.016667',
      population: '4441'
    },
    {
      city: 'Kindersley',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '4249',
      iso2: 'CA',
      capital: '',
      lat: '51.466667',
      lng: '-109.133333',
      population: '4383'
    },
    {
      city: 'Liverpool',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '4331',
      iso2: 'CA',
      capital: '',
      lat: '44.038414',
      lng: '-64.718433',
      population: '4331'
    },
    {
      city: 'Melville',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '4173',
      iso2: 'CA',
      capital: '',
      lat: '50.933333',
      lng: '-102.8',
      population: '4279'
    },
    {
      city: 'Channel-Port aux Basques',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '2244',
      iso2: 'CA',
      capital: '',
      lat: '47.566667',
      lng: '-59.15',
      population: '4220'
    },
    {
      city: 'Deer Lake',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '3743',
      iso2: 'CA',
      capital: '',
      lat: '49.183333',
      lng: '-57.433333',
      population: '4163'
    },
    {
      city: 'Saint-Augustin',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '3961',
      iso2: 'CA',
      capital: '',
      lat: '51.233333',
      lng: '-58.65',
      population: '3961'
    },
    {
      city: 'Digby',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '2052',
      iso2: 'CA',
      capital: '',
      lat: '44.578466',
      lng: '-65.783525',
      population: '3949'
    },
    {
      city: 'Jasper',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '3102',
      iso2: 'CA',
      capital: '',
      lat: '52.883333',
      lng: '-118.083333',
      population: '3907'
    },
    {
      city: 'Hay River',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '3648',
      iso2: 'CA',
      capital: '',
      lat: '60.85',
      lng: '-115.7',
      population: '3900'
    },
    {
      city: 'Windsor',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '3654',
      iso2: 'CA',
      capital: '',
      lat: '44.958995',
      lng: '-64.144786',
      population: '3864'
    },
    {
      city: 'La Ronge',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '3071',
      iso2: 'CA',
      capital: '',
      lat: '55.1',
      lng: '-105.3',
      population: '3783'
    },
    {
      city: 'Deer Lake',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '3743',
      iso2: 'CA',
      capital: '',
      lat: '52.616667',
      lng: '-94.066667',
      population: '3743'
    },
    {
      city: 'Gasp\u00e9',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '3331',
      iso2: 'CA',
      capital: '',
      lat: '48.833333',
      lng: '-64.483333',
      population: '3677'
    },
    {
      city: 'Atikokan',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '3625',
      iso2: 'CA',
      capital: '',
      lat: '48.75',
      lng: '-91.616667',
      population: '3625'
    },
    {
      city: 'Gander',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '3345',
      iso2: 'CA',
      capital: '',
      lat: '48.95',
      lng: '-54.55',
      population: '3345'
    },
    {
      city: 'Fort Chipewyan',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '3222',
      iso2: 'CA',
      capital: '',
      lat: '58.716667',
      lng: '-111.15',
      population: '3222'
    },
    {
      city: 'Shelburne',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '1939',
      iso2: 'CA',
      capital: '',
      lat: '43.753356',
      lng: '-65.246074',
      population: '3167'
    },
    {
      city: 'Inuvik',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '3022',
      iso2: 'CA',
      capital: '',
      lat: '68.35',
      lng: '-133.7',
      population: '3022'
    },
    {
      city: 'Lac La Biche',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '2919',
      iso2: 'CA',
      capital: '',
      lat: '54.771944',
      lng: '-111.964722',
      population: '2986'
    },
    {
      city: 'Lillooet',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '2893',
      iso2: 'CA',
      capital: '',
      lat: '50.683333',
      lng: '-121.933333',
      population: '2893'
    },
    {
      city: 'Chapleau',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '2663',
      iso2: 'CA',
      capital: '',
      lat: '47.833333',
      lng: '-83.4',
      population: '2663'
    },
    {
      city: 'Burns Lake',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '2631',
      iso2: 'CA',
      capital: '',
      lat: '54.216667',
      lng: '-125.766667',
      population: '2635'
    },
    {
      city: 'Gimli',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '2009',
      iso2: 'CA',
      capital: '',
      lat: '50.633333',
      lng: '-97.0',
      population: '2623'
    },
    {
      city: 'Athabasca',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '2260',
      iso2: 'CA',
      capital: '',
      lat: '54.716667',
      lng: '-113.266667',
      population: '2539'
    },
    {
      city: 'Nelson House',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '2500',
      iso2: 'CA',
      capital: '',
      lat: '55.8',
      lng: '-98.85',
      population: '2500'
    },
    {
      city: 'Rankin Inlet',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '2334',
      iso2: 'CA',
      capital: '',
      lat: '62.816667',
      lng: '-92.083333',
      population: '2472'
    },
    {
      city: 'Port Hardy',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '2295',
      iso2: 'CA',
      capital: '',
      lat: '50.716667',
      lng: '-127.5',
      population: '2295'
    },
    {
      city: 'Biggar',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '2068',
      iso2: 'CA',
      capital: '',
      lat: '52.05',
      lng: '-107.983333',
      population: '2192'
    },
    {
      city: 'Wiarton',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '2182',
      iso2: 'CA',
      capital: '',
      lat: '44.733333',
      lng: '-81.133333',
      population: '2182'
    },
    {
      city: 'Wawa',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '2174',
      iso2: 'CA',
      capital: '',
      lat: '47.99473',
      lng: '-84.77002',
      population: '2174'
    },
    {
      city: 'Hudson Bay',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '1661',
      iso2: 'CA',
      capital: '',
      lat: '52.85',
      lng: '-102.383333',
      population: '2157'
    },
    {
      city: 'Matagami',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '1183',
      iso2: 'CA',
      capital: '',
      lat: '49.75',
      lng: '-77.633333',
      population: '1966'
    },
    {
      city: 'Arviat',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1868',
      iso2: 'CA',
      capital: '',
      lat: '61.116667',
      lng: '-94.05',
      population: '1868'
    },
    {
      city: 'Attawapiskat',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1802',
      iso2: 'CA',
      capital: '',
      lat: '52.916667',
      lng: '-82.433333',
      population: '1802'
    },
    {
      city: 'Red Lake',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1765',
      iso2: 'CA',
      capital: '',
      lat: '51.033333',
      lng: '-93.833333',
      population: '1765'
    },
    {
      city: 'Moosonee',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1725',
      iso2: 'CA',
      capital: '',
      lat: '51.266667',
      lng: '-80.65',
      population: '1725'
    },
    {
      city: 'Tofino',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '1655',
      iso2: 'CA',
      capital: '',
      lat: '49.133333',
      lng: '-125.9',
      population: '1655'
    },
    {
      city: 'Igloolik',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1612',
      iso2: 'CA',
      capital: '',
      lat: '69.4',
      lng: '-81.8',
      population: '1612'
    },
    {
      city: 'Inukjuak',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '1597',
      iso2: 'CA',
      capital: '',
      lat: '58.45334',
      lng: '-78.102493',
      population: '1597'
    },
    {
      city: 'Little Current',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1595',
      iso2: 'CA',
      capital: '',
      lat: '45.966667',
      lng: '-81.933333',
      population: '1595'
    },
    {
      city: 'Baker Lake',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1584',
      iso2: 'CA',
      capital: '',
      lat: '64.316667',
      lng: '-96.016667',
      population: '1584'
    },
    {
      city: 'Pond Inlet',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1549',
      iso2: 'CA',
      capital: '',
      lat: '72.7',
      lng: '-78.0',
      population: '1549'
    },
    {
      city: 'Cap-Chat',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '1466',
      iso2: 'CA',
      capital: '',
      lat: '49.083333',
      lng: '-66.683333',
      population: '1484'
    },
    {
      city: 'Cambridge Bay',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1477',
      iso2: 'CA',
      capital: '',
      lat: '69.116667',
      lng: '-105.033333',
      population: '1477'
    },
    {
      city: 'Thessalon',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1369',
      iso2: 'CA',
      capital: '',
      lat: '46.25',
      lng: '-83.55',
      population: '1464'
    },
    {
      city: 'New Bella Bella',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '1400',
      iso2: 'CA',
      capital: '',
      lat: '52.166667',
      lng: '-128.133333',
      population: '1400'
    },
    {
      city: 'Cobalt',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1372',
      iso2: 'CA',
      capital: '',
      lat: '47.383333',
      lng: '-79.683333',
      population: '1372'
    },
    {
      city: 'Cape Dorset',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1326',
      iso2: 'CA',
      capital: '',
      lat: '64.233333',
      lng: '-76.55',
      population: '1326'
    },
    {
      city: 'Pangnirtung',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1320',
      iso2: 'CA',
      capital: '',
      lat: '66.133333',
      lng: '-65.75',
      population: '1320'
    },
    {
      city: 'West Dawson',
      admin: 'Yukon',
      country: 'Canada',
      population_proper: '1319',
      iso2: 'CA',
      capital: '',
      lat: '64.066667',
      lng: '-139.45',
      population: '1319'
    },
    {
      city: 'Kugluktuk',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1302',
      iso2: 'CA',
      capital: '',
      lat: '67.833333',
      lng: '-115.083333',
      population: '1302'
    },
    {
      city: 'Geraldton',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1290',
      iso2: 'CA',
      capital: '',
      lat: '49.716667',
      lng: '-86.966667',
      population: '1290'
    },
    {
      city: 'Gillam',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '1281',
      iso2: 'CA',
      capital: '',
      lat: '56.35',
      lng: '-94.7',
      population: '1281'
    },
    {
      city: 'Kuujjuaq',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '1273',
      iso2: 'CA',
      capital: '',
      lat: '58.1',
      lng: '-68.4',
      population: '1273'
    },
    {
      city: 'Lake Louise',
      admin: 'Alberta',
      country: 'Canada',
      population_proper: '1248',
      iso2: 'CA',
      capital: '',
      lat: '51.433333',
      lng: '-116.183333',
      population: '1248'
    },
    {
      city: 'Nipigon',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '1204',
      iso2: 'CA',
      capital: '',
      lat: '49.016667',
      lng: '-88.25',
      population: '1204'
    },
    {
      city: 'Nain',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '1151',
      iso2: 'CA',
      capital: '',
      lat: '56.55',
      lng: '-61.683333',
      population: '1151'
    },
    {
      city: 'Gjoa Haven',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '1109',
      iso2: 'CA',
      capital: '',
      lat: '68.633333',
      lng: '-95.916667',
      population: '1109'
    },
    {
      city: 'Fort McPherson',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '1069',
      iso2: 'CA',
      capital: '',
      lat: '67.433333',
      lng: '-134.866667',
      population: '1069'
    },
    {
      city: 'Argentia',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '1063',
      iso2: 'CA',
      capital: '',
      lat: '47.3',
      lng: '-54.0',
      population: '1063'
    },
    {
      city: 'Norman Wells',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '273',
      iso2: 'CA',
      capital: '',
      lat: '65.283333',
      lng: '-126.85',
      population: '1027'
    },
    {
      city: 'Churchill',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '923',
      iso2: 'CA',
      capital: '',
      lat: '58.766667',
      lng: '-94.166667',
      population: '1000'
    },
    {
      city: 'Repulse Bay',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '748',
      iso2: 'CA',
      capital: '',
      lat: '66.516667',
      lng: '-86.233333',
      population: '1000'
    },
    {
      city: 'Tuktoyaktuk',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '870',
      iso2: 'CA',
      capital: '',
      lat: '69.45',
      lng: '-133.066667',
      population: '929'
    },
    {
      city: 'Berens River',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '153',
      iso2: 'CA',
      capital: '',
      lat: '52.366667',
      lng: '-97.033333',
      population: '892'
    },
    {
      city: 'Shamattawa',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '870',
      iso2: 'CA',
      capital: '',
      lat: '55.85',
      lng: '-92.083333',
      population: '870'
    },
    {
      city: 'Baddeck',
      admin: 'Nova Scotia',
      country: 'Canada',
      population_proper: '852',
      iso2: 'CA',
      capital: '',
      lat: '46.1',
      lng: '-60.75',
      population: '852'
    },
    {
      city: 'Coral Harbour',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '834',
      iso2: 'CA',
      capital: '',
      lat: '64.133333',
      lng: '-83.166667',
      population: '834'
    },
    {
      city: 'La Scie',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '817',
      iso2: 'CA',
      capital: '',
      lat: '49.966667',
      lng: '-55.583333',
      population: '817'
    },
    {
      city: 'Watson Lake',
      admin: 'Yukon',
      country: 'Canada',
      population_proper: '802',
      iso2: 'CA',
      capital: '',
      lat: '60.116667',
      lng: '-128.8',
      population: '802'
    },
    {
      city: 'Taloyoak',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '774',
      iso2: 'CA',
      capital: '',
      lat: '69.533333',
      lng: '-93.533333',
      population: '774'
    },
    {
      city: 'Natashquan',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '722',
      iso2: 'CA',
      capital: '',
      lat: '50.183333',
      lng: '-61.816667',
      population: '722'
    },
    {
      city: 'Buchans',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '685',
      iso2: 'CA',
      capital: '',
      lat: '48.816667',
      lng: '-56.866667',
      population: '685'
    },
    {
      city: 'Hall Beach',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '654',
      iso2: 'CA',
      capital: '',
      lat: '68.766667',
      lng: '-81.2',
      population: '654'
    },
    {
      city: 'Arctic Bay',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '604',
      iso2: 'CA',
      capital: '',
      lat: '73.033333',
      lng: '-85.166667',
      population: '604'
    },
    {
      city: 'Fort Good Hope',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '597',
      iso2: 'CA',
      capital: '',
      lat: '66.266667',
      lng: '-128.633333',
      population: '597'
    },
    {
      city: 'Mingan',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '588',
      iso2: 'CA',
      capital: '',
      lat: '50.3',
      lng: '-64.016667',
      population: '588'
    },
    {
      city: 'Kangirsuk',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '549',
      iso2: 'CA',
      capital: '',
      lat: '60.016667',
      lng: '-70.033333',
      population: '549'
    },
    {
      city: 'Sandspit',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '538',
      iso2: 'CA',
      capital: '',
      lat: '53.239111',
      lng: '-131.818769',
      population: '538'
    },
    {
      city: 'D\u00e9l\u012fne',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '262',
      iso2: 'CA',
      capital: '',
      lat: '65.183333',
      lng: '-123.416667',
      population: '525'
    },
    {
      city: 'Fort Smith',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '518',
      iso2: 'CA',
      capital: '',
      lat: '60.0',
      lng: '-111.883333',
      population: '518'
    },
    {
      city: 'Cartwright',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '505',
      iso2: 'CA',
      capital: '',
      lat: '53.7',
      lng: '-57.016667',
      population: '505'
    },
    {
      city: 'Holman',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '398',
      iso2: 'CA',
      capital: '',
      lat: '70.733333',
      lng: '-117.75',
      population: '500'
    },
    {
      city: 'Lynn Lake',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '482',
      iso2: 'CA',
      capital: '',
      lat: '56.85',
      lng: '-101.05',
      population: '482'
    },
    {
      city: 'Schefferville',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '471',
      iso2: 'CA',
      capital: '',
      lat: '54.8',
      lng: '-66.816667',
      population: '471'
    },
    {
      city: 'Trout River',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '452',
      iso2: 'CA',
      capital: '',
      lat: '49.483333',
      lng: '-58.116667',
      population: '452'
    },
    {
      city: 'Forteau Bay',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '448',
      iso2: 'CA',
      capital: '',
      lat: '51.45',
      lng: '-56.95',
      population: '448'
    },
    {
      city: 'Fort Resolution',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '448',
      iso2: 'CA',
      capital: '',
      lat: '61.166667',
      lng: '-113.683333',
      population: '448'
    },
    {
      city: 'Hopedale',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '442',
      iso2: 'CA',
      capital: '',
      lat: '55.45',
      lng: '-60.216667',
      population: '442'
    },
    {
      city: 'Pukatawagan',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '431',
      iso2: 'CA',
      capital: '',
      lat: '55.733333',
      lng: '-101.316667',
      population: '431'
    },
    {
      city: 'Trepassey',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '398',
      iso2: 'CA',
      capital: '',
      lat: '46.733333',
      lng: '-53.366667',
      population: '398'
    },
    {
      city: 'Kimmirut',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '385',
      iso2: 'CA',
      capital: '',
      lat: '62.85',
      lng: '-69.883333',
      population: '385'
    },
    {
      city: 'Chesterfield Inlet',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '374',
      iso2: 'CA',
      capital: '',
      lat: '63.333333',
      lng: '-90.7',
      population: '374'
    },
    {
      city: 'Eastmain',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '335',
      iso2: 'CA',
      capital: '',
      lat: '52.233333',
      lng: '-78.516667',
      population: '335'
    },
    {
      city: 'Dease Lake',
      admin: 'British Columbia',
      country: 'Canada',
      population_proper: '303',
      iso2: 'CA',
      capital: '',
      lat: '58.476697',
      lng: '-129.96146',
      population: '303'
    },
    {
      city: 'Paulatuk',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '294',
      iso2: 'CA',
      capital: '',
      lat: '69.383333',
      lng: '-123.983333',
      population: '294'
    },
    {
      city: 'Fort Simpson',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '283',
      iso2: 'CA',
      capital: '',
      lat: '61.85',
      lng: '-121.333333',
      population: '283'
    },
    {
      city: 'Brochet',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '278',
      iso2: 'CA',
      capital: '',
      lat: '57.883333',
      lng: '-101.666667',
      population: '278'
    },
    {
      city: 'Cat Lake',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '277',
      iso2: 'CA',
      capital: '',
      lat: '51.716667',
      lng: '-91.8',
      population: '277'
    },
    {
      city: 'Radisson',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '270',
      iso2: 'CA',
      capital: '',
      lat: '53.783333',
      lng: '-77.616667',
      population: '270'
    },
    {
      city: 'Port-Menier',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '263',
      iso2: 'CA',
      capital: '',
      lat: '49.816667',
      lng: '-64.35',
      population: '263'
    },
    {
      city: 'Resolute',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '229',
      iso2: 'CA',
      capital: '',
      lat: '74.683333',
      lng: '-94.9',
      population: '250'
    },
    {
      city: 'Saint Anthony',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '224',
      iso2: 'CA',
      capital: '',
      lat: '51.383333',
      lng: '-55.6',
      population: '224'
    },
    {
      city: 'Port Hope Simpson',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '197',
      iso2: 'CA',
      capital: '',
      lat: '52.533333',
      lng: '-56.3',
      population: '197'
    },
    {
      city: 'Oxford House',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '184',
      iso2: 'CA',
      capital: '',
      lat: '54.95',
      lng: '-95.266667',
      population: '184'
    },
    {
      city: 'Tsiigehtchic',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '175',
      iso2: 'CA',
      capital: '',
      lat: '67.433333',
      lng: '-133.75',
      population: '175'
    },
    {
      city: 'Ivujivik',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '156',
      iso2: 'CA',
      capital: '',
      lat: '62.416667',
      lng: '-77.9',
      population: '156'
    },
    {
      city: 'Stony Rapids',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '152',
      iso2: 'CA',
      capital: '',
      lat: '59.266667',
      lng: '-105.833333',
      population: '152'
    },
    {
      city: 'Alert',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '70',
      iso2: 'CA',
      capital: '',
      lat: '82.483333',
      lng: '-62.25',
      population: '125'
    },
    {
      city: 'Fort Severn',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '125',
      iso2: 'CA',
      capital: '',
      lat: '55.983333',
      lng: '-87.65',
      population: '125'
    },
    {
      city: 'Rigolet',
      admin: 'Newfoundland and Labrador',
      country: 'Canada',
      population_proper: '124',
      iso2: 'CA',
      capital: '',
      lat: '54.166667',
      lng: '-58.433333',
      population: '124'
    },
    {
      city: 'Lansdowne House',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '120',
      iso2: 'CA',
      capital: '',
      lat: '52.216667',
      lng: '-87.883333',
      population: '120'
    },
    {
      city: 'Salluit',
      admin: 'Qu\u00e9bec',
      country: 'Canada',
      population_proper: '106',
      iso2: 'CA',
      capital: '',
      lat: '62.2',
      lng: '-75.633333',
      population: '106'
    },
    {
      city: '\u0141utselk\u2019e',
      admin: 'Northwest Territories',
      country: 'Canada',
      population_proper: '102',
      iso2: 'CA',
      capital: '',
      lat: '62.4',
      lng: '-110.733333',
      population: '102'
    },
    {
      city: 'Uranium City',
      admin: 'Saskatchewan',
      country: 'Canada',
      population_proper: '89',
      iso2: 'CA',
      capital: '',
      lat: '59.566667',
      lng: '-108.616667',
      population: '89'
    },
    {
      city: 'Burwash Landing',
      admin: 'Yukon',
      country: 'Canada',
      population_proper: '73',
      iso2: 'CA',
      capital: '',
      lat: '61.35',
      lng: '-139.0',
      population: '73'
    },
    {
      city: 'Grise Fiord',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '23',
      iso2: 'CA',
      capital: '',
      lat: '76.416667',
      lng: '-82.95',
      population: '23'
    },
    {
      city: 'Big Beaverhouse',
      admin: 'Ontario',
      country: 'Canada',
      population_proper: '10',
      iso2: 'CA',
      capital: '',
      lat: '52.95',
      lng: '-89.883333',
      population: '10'
    },
    {
      city: 'Island Lake',
      admin: 'Manitoba',
      country: 'Canada',
      population_proper: '10',
      iso2: 'CA',
      capital: '',
      lat: '53.966667',
      lng: '-94.766667',
      population: '10'
    },
    {
      city: 'Ennadai',
      admin: 'Nunavut',
      country: 'Canada',
      population_proper: '0',
      iso2: 'CA',
      capital: '',
      lat: '61.133333',
      lng: '-100.883333',
      population: '0'
    }
  ]
  ;


  currentUser = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentUser);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this._filterStates(city) : this.citizies.slice())
      );
    this.getCodeFromURI();



    this.profilelist = [
      new Profile('PROFESSIONAL', 'role_professional', true),
      new Profile('SEARCHER', 'role_searcher', true)


    ];

  }

  private _filterStates(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.citizies.filter(city => city.city.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit() {


  }


  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);

    const date = d.getDate();
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    const year = d.getFullYear();

    this.birthday = year + '-' + month + '-' + date;
  }

  register(username: string,
           password: string,
           firstName: string,
           lastname: string,
           middlename: string,
           city: string,
           postalCode: string,
           province: string,
           street: string,
           streetNumber: string) {
    this.submitted = true;



    const data = new UserRequestDto(null, new AccountDto(username, password),
      this.birthday, new EmailDto(this.email), firstName, middlename, lastname,

      new InstitutionDto(null, null), null,
      new AddressDto(city, postalCode, province, street, Number(streetNumber)));

    this.loading = true;
    this.userService.register(JSON.stringify(data))
      .pipe(first())
      .subscribe(
        data => {

          if (data.emailExist === true) {
            this._snackBar.open('Ce mail est deja pris', 'OK');
            this.loading = false;
            // this.router.navigate(['/login']);
          } else if (data.usernameExist === true) {
            this._snackBar.open('le nom d utilisateur est deja pris', 'OK');
            this.loading = false;
            // this.router.navigate(['/login']);
          } else {
            this._snackBar.open('l utilisateur a ete  enregistre avec succes, Vous pouvez vous connecter maintennant', 'OK');
            this.router.navigate(['home']);
          }
        },
        error => {
          this._snackBar.open('Donnees saisies invalide', 'OK');
          this.loading = false;
        });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    });
    // this.router.navigate(["login"]);
  }

  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        let token: string;
        token = params.token;
        if (token != null) {
          this.tokenpassword = token;

          const message = this.userService.recup_token(token).subscribe(
            response => {
              const obj = JSON.parse(JSON.stringify(response));
              this.email = obj.email;
              this.tokrep = obj;
              if (this.tokrep.tokenExist) {
                this._snackBar.open('Veuillez saisir les informations demander' +
                  ' et votre compte sera activer', 'OK');
              } else {
                // let fakeUrl = "user/invite?token="+token;
                // this.router.navigate([fakeUrl])
                this._snackBar.open('le token est expire, veuillez contacter l administrateur', 'OK');
                this.router.navigate(['login']);
              }

            },
            error => {
            }
          );

        } else {
          this._snackBar.open('le token est expire, veuillez contacter l administrateur', 'OK');
          this.router.navigate(['login']);
        }
      });
  }

}

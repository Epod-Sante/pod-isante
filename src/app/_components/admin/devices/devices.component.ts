import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {DeviceDto} from '../../../dto/DeviceDto';
import {UserService} from '../../../_services';
import {Request} from '../../../dto';
import {first} from 'rxjs/operators';
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  podos: any [];
  podos2: any [];
  id = null;
  autoriser = false;
  auth = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DBSJ&redirect_uri=https%3A%2F%2Fwww.podisante.ca%2Fdevice&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
  currentUser = localStorage.getItem('currentUser');
  podo = false;
  addpodo = false;
  blocK_checked = false;

  lastSyncDateString : string[];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public displayedColumns = ['deviceCode', 'type', 'fitbitId','available', 'lastSyncDate', 'action'];
  public dataSource = new MatTableDataSource<DeviceDto>();

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {
    if (localStorage.getItem('currentRole') === 'role_admin' && localStorage.getItem('idautorize') !== null) {
      this.getCodeFromURI();
    }
  }

  ngOnInit() {
    this.getAllPodo();
  }

  autorise(element: DeviceDto) {
    //this.getAllPodo();
    /*this.userService.profilCheck().subscribe(res=>{
      console.log(res)
    })*/
    window.open(this.auth);
    localStorage.setItem('idautorize', element.id);
  }

  autorizepodo(id: string, code: string) {
    this.userService.autorizepodo(id, code).subscribe(rep => {
      localStorage.removeItem('idautorize');
      this.getAllPodo();
      // location.reload();
    }, error => {
    });
  }

  getCodeFromURI() {
    this.route.queryParams
      .subscribe(params => {
        let code: string;
        code = params.code;
        if (code != null) {
          if (localStorage.getItem('idautorize') !== null) {
            const id = localStorage.getItem('idautorize');
            this.autorizepodo(id, code);
          }
        }
      });
  }



  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ajouter() {
    this.addpodo = true;
  }

  addpod(code: string, type: string) {
    const token = localStorage.getItem('currentToken');
    const decoded = jwtDecode(token);
    const adminId = decoded.id;
    const po = new DeviceDto(null, null, code, null, type, null, adminId, true, null, null, null);
    const request = new Request(po);
    this.userService.addPodo(request).pipe(first())
      .subscribe(reponse => {
          if (this.dataSource.data.length === 0) {
            this.podos = [po];
          } else {
            this.dataSource.data.push(po);
          }
          this.getAllPodo();
          this.addpodo = !this.addpodo;
        }, error => {
        }
      );
  }

  removePodo(device: DeviceDto) {
    const request = new Request(device);
    this.userService.removePodo(request).pipe(first())
      .subscribe(reponse => {
          const index = this.dataSource.data.indexOf(device, 0);
          if (index > -1) {
            this.dataSource.data.splice(index, 1);
            this.getAllPodo();
          }
        }, error => {
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllPodo = () => {
    this.lastSyncDateString = []
    this.userService.getPodos().subscribe(users => {
      const devices = JSON.parse(JSON.stringify(users));
      this.podos2 = devices.object as DeviceDto[];
      for (let i = 0; i <this.podos2.length; i++) {
        if (this.podos2[i].lastSyncDate != null){
          this.lastSyncDateString.push(new Date(this.podos2[i].lastSyncDate).toLocaleDateString() +' '+ new Date(this.podos2[i].lastSyncDate).toLocaleTimeString());
        }
      }
      this.dataSource.data = this.podos2;
      console.log(this.lastSyncDateString)
    });
  }


}

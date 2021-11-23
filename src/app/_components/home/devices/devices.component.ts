import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {PodometreDto} from '../../../dto/PodometreDto';
import {DeviceDto} from '../../../dto/DeviceDto';
import {UserService} from '../../../_services';
import {Request, UserRequestDto} from '../../../dto';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  constructor(private router: Router, private userService: UserService,     private route: ActivatedRoute
  ) {
    if (localStorage.getItem('currentRole' ) === 'role_admin') {
       this.getCodeFromURI();

    }else{
      this.router.navigate(['/']);

    }

  }
  podos: any [];
  id = null;
  autoriser = false;
  auth = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DBSJ&redirect_uri=https%3A%2F%2Fipodsante-92c27.firebaseapp.com%2Fdevice&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
  currentUser = localStorage.getItem('currentUser');
  podo = false;
  addpodo = false;
  blocK_checked = false ;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public displayedColumns = ['deviceCode', 'type', 'action'
  ];
  public dataSource = new MatTableDataSource<DeviceDto>();

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {

    this.getAllUsers();

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ajouter(){
    this.addpodo = true;
  }

  autorise(element: DeviceDto){
    window.open(this.auth);
    localStorage.setItem('idautorize', element.id);
    location.reload();

  }
  autorizepodo(id: string, code: string){

    this.userService.autorizepodo(id, code).subscribe( rep => {
      localStorage.removeItem('idautorize');
      location.reload();
      console.log(code);

    }, error => {
      console.log('errrrrrrrr');
    });

  }
  addpod(code: string, type: string){
    const token = localStorage.getItem('currentToken');

    const decoded = jwtDecode(token);
    const adminId = decoded.id;
    const po = new DeviceDto(null, code, null, type, null, adminId, true, null, null, null);
    const request = new Request(po);
    console.log(request);

    this.userService.addPodo(request).pipe(first())
      .subscribe( reponse => {
        if (this.dataSource.data.length === 0){
          this.podos = [po];

        }else{
          this.dataSource.data.push(po);
        }
        this.getAllUsers();
        this.addpodo = !this.addpodo;

      }, error => {

      }
    );






  }

  removePodo(device: DeviceDto){

    const request = new Request(device);
    console.log(request);

    this.userService.removePodo(request).pipe(first())
      .subscribe( reponse => {
        const index = this.dataSource.data.indexOf(device, 0);
        console.log(index);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.getAllUsers();




        }

        }, error => {

        }
      );

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  public getAllUsers = () => {


    this.userService.getPodos().subscribe( users => {
      const devices = JSON.parse(JSON.stringify(users));
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      this.dataSource.data = devices.object as DeviceDto[];
      console.log(this.dataSource.data);


    });











  }
  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        let code: string;
        code = params.code;
        if (code != null) {

          if (localStorage.getItem('idautorize')){
            const id = localStorage.getItem('idautorize');
            this.autorizepodo(id, code);

          }

        }else {
          console.log('code null');
        }
      });
  }




}

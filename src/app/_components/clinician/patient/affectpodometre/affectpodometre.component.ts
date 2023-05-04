import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Optional,
  Output,
  SimpleChanges
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../_services/patient.service';
import {DeviceDto} from '../../../../dto/DeviceDto';
import {Request, Response} from '../../../../dto';
import {PatientDeviceDto} from '../../../../dto/PatientDeviceDto';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {first, map} from 'rxjs/operators';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {NbToastrService, NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'app-affectpodometre',
  templateUrl: './affectpodometre.component.html',
  styleUrls: ['./affectpodometre.component.css']
})
export class AffectpodometreComponent implements OnInit, OnChanges, OnDestroy {
  id: string;
  devices: DeviceDto [];
  pod;
  message: string;
  patient;
  expanded = true;
  date = '';
  po: PatientDeviceDto[];
  hidenAffecter = true;
  model;
  type;

  lastSync;
  patientEmail: string;
  idDevice;
  subscription: any;
  @Output() expandedEvent = new EventEmitter<boolean>();

  affecter = false;
  pasPodometre = false;
  podometre = false;
  private deviceId: any;
  checkboxDataSync = false;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private patientService: PatientService,
              private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService, @Optional() protected windowRef: NbWindowRef, ) {
    this.subscription = this.data.currentMessage.subscribe(message => this.id = message);



    this.available_device();
  }
  toggle(checked: boolean) {
    this.checkboxDataSync = checked;
  }

  ngOnInit() {
    this.getPatientById();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);

    const date = d.getDate();
    let jr = date.toString();
    if (date > 9){

    }else{
      jr = '0' + date;
    }
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString();
    if (month > 9){

    }else{
      mois = '0' + month;
    }
    const year = d.getFullYear();

    this.date = year + '-' + mois + '-' + jr;
  }

  available_device() {
    this.patientService.getPodosavailable(this.id).subscribe(response => {
      this.devices = JSON.parse(JSON.stringify(response)).object;
      if (this.devices instanceof Array) {
        const devices = JSON.parse(JSON.stringify(response)).object as DeviceDto[];
        if (devices.length === 0) {
          this.message = 'Aucun appareil disponible';
          this.pasPodometre = true;
        } else {
          this.affecter = true;
        }
      }else {
        const device = JSON.parse(JSON.stringify(response)).object as DeviceDto;
        this.podometre = true;
        this.model = device.deviceCode;
        this.type = device.type;
        this.lastSync = new Date(device.lastSyncDate).toLocaleDateString()+ "  " + new Date(device.lastSyncDate).toLocaleTimeString();
        this.idDevice = device.id;
      }
    });

  }

  recuperer(id: string) {
    const deviceDto = new DeviceDto(id, null, null, null, null, null, null, null, null, null, null);
    const request = new Request(deviceDto);
    this.patientService.recup_podo(request).pipe(first()).subscribe(response => {
        this.pasPodometre = false;
        this.windowRef.close();
        this.showToast('top-right', 'success', 'Succès', 'Podometre récupérer');
      }, error => {
        this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
      }
    );
  }

  affect() {
    if (this.deviceId) {
      const currentUser = localStorage.getItem('currentUser');
      const idPro = JSON.parse(currentUser).id;

      this.po = [new PatientDeviceDto(null, null, idPro, this.patient.medicalFile.patient, null, this.patientEmail)];
      const device = new DeviceDto(this.deviceId,null, null, null,
        null, null, null, null, null,
        null, this.po);
      const req = new Request(device);
      this.patientService.affectPodo(req).subscribe(
        reponse => {
          this.affecter = false;
          this.windowRef.close();
          this.showToast('top-right', 'success', 'Succès', 'Podometre affecté');
        }, error => {
          this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
        }
      );
    } else {
      this.showToast('top-right', 'info', 'Info', 'Veuillez choisir une podometre');
    }
  }
  synchronize(id: string) {
    const deviceDto = new DeviceDto(id, null, null, null, null, null, null, null, null, null, null);
    const request = new Request(deviceDto);
    this.patientService.synchronizePodo(request).pipe(first()).subscribe(response => {
        this.pasPodometre = false;
        this.windowRef.close();
        this.showToast('top-right', 'success', 'Succès', 'Podomètre synchronisé');
      }, error => {
        this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
      }
    );
  }

  getPatientById(){
    this.patientService.getPatient(this.id).subscribe(patient => {
      const patientObj = patient as Response;
      this.patient = patientObj.object as PatientDto;
      this.patientEmail = this.patient.contact.email;
    });
  }

  selectDevice(option) {
    this.deviceId = option;

  }


  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}

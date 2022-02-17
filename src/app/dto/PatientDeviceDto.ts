import {DeviceDto} from './DeviceDto';

export class PatientDeviceDto  {


   id: string;
   initDate: number;
  returnedAt: number;
   professionalId: string;
  medicalFileId: string;
  patientEmail: string;
  initDateString: string;
  returnedAtString: string;
  // devices : DeviceDto[];


  constructor( id: string, initDate: number, professionalId: string, medicalFileId: string, returnedAt: number, patientEmail: string) {
    this.id = id;
    this.initDate = initDate;
    this.professionalId = professionalId;
    this.medicalFileId = medicalFileId;
    this.returnedAt = returnedAt;
    this.patientEmail = patientEmail;
   // this.devices = devices;
  }
}

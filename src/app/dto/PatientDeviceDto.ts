import {DeviceDto} from "./DeviceDto";

export class PatientDeviceDto  {


   id : string;
   initDate : Date;
  returnedAt : string
  returnDate : string;
   professionalId : string;
  medicalFileId : string;
  patientEmail : string
  //devices : DeviceDto[];


  constructor( id: string, initDate: Date, returnDate: string, professionalId: string, medicalFileId: string,returnedAt : string,patientEmail : string) {
    this.id = id;
    this.initDate = initDate;
    this.returnDate = returnDate;
    this.professionalId = professionalId;
    this.medicalFileId = medicalFileId;
    this.returnedAt = returnedAt;
    this.patientEmail = patientEmail
   // this.devices = devices;
  }
}

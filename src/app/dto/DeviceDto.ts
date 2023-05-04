import {PatientDeviceDto} from './PatientDeviceDto';
import {FitbitSubscriptionDto} from "./FitbitSubscriptionDto";

export class DeviceDto{
  id: string;
  deviceCode: string;
  deviceVersion: string;
  type: string;
  lastSyncDate: Date;
  adminId: string;
  available: boolean;
  institutionCode: string;
  auth: string;
  patientDevices: PatientDeviceDto[];
  authorized: boolean;
  fitbitSubscription: FitbitSubscriptionDto;


  constructor(id: string, fitbitSubscription: FitbitSubscriptionDto, deviceCode: string, deviceVersion: string, type: string, lastSyncDate: Date, adminId: string, available: boolean, institutionCode: string, auth: string, patientDevices: PatientDeviceDto[]) {
    this.id = id;
    this.deviceCode = deviceCode;
    this.deviceVersion = deviceVersion;
    this.type = type;
    this.lastSyncDate = lastSyncDate;
    this.adminId = adminId;
    this.available = available;
    this.institutionCode = institutionCode;
    this.auth = auth;
    this.patientDevices = patientDevices;
    this.fitbitSubscription = fitbitSubscription;
  }


}

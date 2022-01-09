
export class MinutesDto {
  date: number;
  medicalFileId: string;
  sedentary: number;
  lightly_active: number;
  fairly_active: number;
  very_active: number;
  appointment: string;

  // tslint:disable-next-line:max-line-length
  constructor(date: number, medicalFileId: string, sedentary: number, lightly_active: number, fairly_active: number, very_active: number, appointment: string) {
    this.date = date;
    this.medicalFileId = medicalFileId;
    this.sedentary = sedentary;
    this.lightly_active = lightly_active;
    this.fairly_active = fairly_active;
    this.very_active = very_active;
    this.appointment = appointment;
  }
}

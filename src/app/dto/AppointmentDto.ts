export class AppointmentDto {
   id: string;
   patientId: string;
   professionalId: string;
   creationDate: string;
   appointmentDate: Date;

  constructor(id: string, patientId: string, professionalId: string, creationDate: string, appointmentDate: Date) {
    this.id = id;
    this.patientId = patientId;
    this.professionalId = professionalId;
    this.creationDate = creationDate;
    this.appointmentDate = appointmentDate;
  }
}

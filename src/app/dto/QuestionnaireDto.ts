export class QuestionnaireDto {
   id: string;
   patientId: string;
   type: string;
   value: string;
   date: string;


  constructor(id: string, patientId: string, type: string, value: string, date: string) {
    this.id = id;
    this.patientId = patientId;
    this.type = type;
    this.value = value;
    this.date = date;
  }
}

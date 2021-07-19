export class MedicalFileHistoryDto {
    date : Date ;
    antecedents : string;

  constructor(date: Date, antecedents: string) {
    this.date = date;
    this.antecedents = antecedents;
  }
}

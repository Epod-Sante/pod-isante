export class MedicalFileHistoryDto {
    date : string[] ;
    antecedents : string;

  constructor(date: string[], antecedents: string) {
    this.date = date;
    this.antecedents = antecedents;
  }
}

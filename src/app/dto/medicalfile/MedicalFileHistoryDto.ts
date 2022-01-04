export class MedicalFileHistoryDto {
  private _date: string[] ;
  private _antecedents: string;
  private _response: boolean;
  private _description: string[];

  constructor(date: string[], antecedents: string, response: boolean, description: string []) {
    this._date = [];
    this._antecedents = antecedents;
    this._response = response;
    this._description = description;
  }


  set date(value: string[]) {
    this._date = value;
  }

  set antecedents(value: string) {
    this._antecedents = value;
  }

  set response(value: boolean) {
    this._response = value;
  }

  set description(value: string[]) {
    this._description = value;
  }

  get date(): string[] {
    return this._date;
  }

  get antecedents(): string {
    return this._antecedents;
  }

  get response(): boolean {
    return this._response;
  }

  get description(): string[] {
    return this._description;
  }
}

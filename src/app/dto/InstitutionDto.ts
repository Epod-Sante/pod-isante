export class InstitutionDto {
  institutionCode :	String;
  institutionName :	String;

  constructor(institutionCode: String, institutionName: String) {
    this.institutionCode = institutionCode;
    this.institutionName = institutionName;
  }

}

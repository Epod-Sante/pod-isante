export class SocioDemographicVariablesDto {

  civilStatus: string;
  familyIncome: string;
  jobStatus: string;
  education: string;
  livingEnvironment: string;
  housingType: string;
  gender: string;


  constructor( civilStatus: string, familyIncome: string, jobStatus: string, education: string, livingEnvironment: string, housingType: string, gender: string) {
    this.civilStatus = civilStatus;
    this.familyIncome = familyIncome;
    this.jobStatus = jobStatus;
    this.education = education;
    this.livingEnvironment = livingEnvironment;
    this.housingType = housingType;
    this.gender = gender;
  }
}

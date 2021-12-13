export class IndividualQuestionnaireDto {

  patientId: string;
  fileNumber: string;
  initial: string;
  socioDemographicVariables: string;
  medicalFileHistory: string;


  constructor(patientId: string, fileNumber: string, initial: string, socioDemographicVariables: string, medicalFileHistory: string) {
    this.patientId = patientId;
    this.fileNumber = fileNumber;
    this.initial = initial;
    this.socioDemographicVariables = socioDemographicVariables;
    this.medicalFileHistory = medicalFileHistory;
  }
}

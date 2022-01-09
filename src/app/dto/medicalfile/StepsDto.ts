export class StepsDto {
  date: number;
  medicalFileId: string;
  steps: number;

  constructor(date: number, medicalFileId: string, steps: number) {
    this.date = date;
    this.medicalFileId = medicalFileId;
    this.steps = steps;
  }
}


export class PharmacotherapyDto {

    cardiovascular : string ;
    dyslipidemia : string
    diabetes : string
    other : string


  constructor(cardiovascular: string, dyslipidemia: string, diabetes: string, others: string) {
    this.cardiovascular = cardiovascular;
    this.dyslipidemia = dyslipidemia;
    this.diabetes = diabetes;
    this.other = others;
  }
}

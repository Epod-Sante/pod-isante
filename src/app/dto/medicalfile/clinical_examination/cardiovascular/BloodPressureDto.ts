
export class BloodPressureDto {

   bloodPressureRightHandDiastolique : number;
   bloodPressureLeftHandDiastolique : number;
   bloodPressureRightHandSystolique : number;
    bloodPressureLeftHandSystolique : number;

  constructor(bloodPressureLeftHandDiastolique: number, bloodPressureRightHandDiastolique: number, bloodPressureRightHandSystolique : number,
              bloodPressureLeftHandSystolique : number) {
    this.bloodPressureRightHandDiastolique = bloodPressureLeftHandDiastolique;
    this.bloodPressureLeftHandDiastolique = bloodPressureRightHandDiastolique;
    this.bloodPressureRightHandSystolique= bloodPressureRightHandSystolique;
    this.bloodPressureLeftHandSystolique = bloodPressureLeftHandSystolique;
  }
}

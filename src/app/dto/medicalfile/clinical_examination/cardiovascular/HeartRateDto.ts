
export class HeartRateDto {

      value : number;
      regular : boolean;


  constructor(value: number, regular: boolean) {
    this.value = value;
    this.regular = regular;
  }
}


export class AnthropometryDto {

    weight : number;
    height : number;
    imc : number;
    waist : number;


  constructor(weight: number, height: number, imc: number, waist: number) {
    this.weight = weight;
    this.height = height;
    this.imc = imc;
    this.waist = waist;
  }
}

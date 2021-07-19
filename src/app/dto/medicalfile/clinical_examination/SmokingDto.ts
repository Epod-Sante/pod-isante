
export class SmokingDto {

     type : string;
     numberCigarettes : number; //per day


  constructor(type: string, numberCigarettes: number) {
    this.type = type;
    this.numberCigarettes = numberCigarettes;
  }
}

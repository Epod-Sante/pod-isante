
export class AntecedentsDto {

     antecedent : string;
     year : number;
     mounth : number;
     type : string;
     traitement : string;


  constructor(antecedant: string, year: number, mounth : number, traitement : string, type : string) {
    this.antecedent = antecedant;
    this.year = year;
    this.type = type
    this.mounth = mounth
    this.traitement = traitement
  }
}

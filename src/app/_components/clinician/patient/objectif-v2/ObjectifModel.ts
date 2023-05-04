
export class ObjectifModel {
  objectif: Objectif;
  moyen: string[];
  recommandation: Recommandation;
  precaution: string[];
  barrieres: string[];
  nc: number;


  constructor(objectif: Objectif, moyen: string[], recommandation: Recommandation, precaution: string[], barrieres: string[], nc: number) {
    this.objectif = objectif;
    this.moyen = moyen;
    this.recommandation = recommandation;
    this.precaution = precaution;
    this.barrieres = barrieres;
    this.nc = nc;
  }
}


export class Objectif{
  objectif: string;
  parametre: Parametre[];

  constructor(objectif: string, parametre: Parametre[]) {
    this.objectif = objectif;
    this.parametre = parametre;
  }
}

export class Recommandation{
  frequence: string;
  endroit: string;
  moment: string[];
  intensite: Intensite;

  constructor(frequence: string, endroit: string, moment: string[], intensite: Intensite) {
    this.frequence = frequence;
    this.endroit = endroit;
    this.moment = moment;
    this.intensite = intensite;
  }
}

export class Endroit{
  endroit: string;
  espacesPleinAir: string[];
  centreDEntrainement: string[];
  auTravail: string[];

  constructor(espacesPleinAir: string[], centreDEntrainement: string[], auTravail: string[]) {
    this.espacesPleinAir = espacesPleinAir;
    this.centreDEntrainement = centreDEntrainement;
    this.auTravail = auTravail;
  }
}

export class Intensite{
  echelleNumber: number;
  echelleString: string;

  constructor(echelleNumber: number, echelleString: string) {
    this.echelleNumber = echelleNumber;
    this.echelleString = echelleString;
  }
}

export class Parametre{
  param: string;
  value: number;

  constructor(param: string, value: number) {
    this.param = param;
    this.value = value;
  }
}

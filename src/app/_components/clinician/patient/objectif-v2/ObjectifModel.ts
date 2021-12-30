
export class ObjectifModel {
  objectif: Objectif;
  moyen: string[];
  recommandation: Recommandation;
  precaution: string[];


  constructor(objectif: Objectif, moyen: string[], recommandation: Recommandation, precaution: string[]) {
    this.objectif = objectif;
    this.moyen = moyen;
    this.recommandation = recommandation;
    this.precaution = precaution;
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

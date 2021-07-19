import {Uimessage} from "./uimessage";




export class Message {
   valeur : string;
   erreur : boolean;
   status : string;


  constructor(valeur: string, erreur: boolean, status: string) {
    this.valeur = valeur;
    this.erreur = erreur;
    this.status = status;
  }
}



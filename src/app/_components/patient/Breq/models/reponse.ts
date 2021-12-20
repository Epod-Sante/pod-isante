import {Regulation} from './regulation';

export class Reponse {

  questionId: number;
  poids: number;


  constructor( questionId: number,  poids: number) {
    this.questionId = questionId;
    this.poids = poids;
  }

}

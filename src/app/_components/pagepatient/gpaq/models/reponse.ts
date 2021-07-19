import {Regulation} from './regulation';

export class Reponse {

  questionId: number;
  quizId: number;
  questionPereId : number
  poids: number;
  minu : number;
  hr : number;
  jr : number;


  constructor(questionId: number, quizId: number, poids: number, minu: any, hr: number, jr: number, questionPereId) {
    this.questionId = questionId;
    this.quizId = quizId;
    this.poids = poids;
    this.minu = minu;
    this.hr = hr;
    this.jr = jr;
    this.questionPereId = questionPereId
  }
}

import {Regulation} from './regulation';

export class Reponse {

  questionId = 0;
  quizId = 0;
  questionPereId = 0;
  poids = 0;
  minu = 0;
  hr = 0;
  jr = 0;


  constructor(questionId: number, quizId: number, poids: number, minu: any, hr: number, jr: number, questionPereId) {
    this.questionId = questionId;
    this.quizId = quizId;
    this.poids = poids;
    this.minu = minu;
    this.hr = hr;
    this.jr = jr;
    this.questionPereId = questionPereId;
  }
}

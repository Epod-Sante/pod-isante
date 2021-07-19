import { Question } from './question';

export class Regulation {
  id: number;
  name: string;
  questionId: number;
  coef: number;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.coef = data.coef;
    this.name = data.name;
    this.questionId = data.questionId;
  }
}

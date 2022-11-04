export class Option {
    id: number;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;
    poids : number = null;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.poids = data.poids;
        this.questionId = data.questionId;
        this.name = data.name;
      this.isAnswer = data.isAnswer;
      this.selected = data.selected;
    }
}

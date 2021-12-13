export class QuestionnaireBREQ {
  id: string;
  patientId: string;
  type: string;
  value: BREQValue;
  date: string;


  constructor(id: string, patientId: string, type: string, value: BREQValue, date: string) {
    this.id = id;
    this.patientId = patientId;
    this.type = type;
    this.value = value;
    this.date = date;
  }
}

export class BREQValue {
  score: Score;
  reponses: Reponse[];
}

class Score {
  external: number;
  intrinsic: number;
  identified: number;
  amotivation: number;
  introjected: number;
}

class Reponse{
  poids:	number;
  questionId: number;
}

export class QuestionnaireGPAQ {
  id: string;
  patientId: string;
  type: string;
  value: GPAQValue;
  date: string;


  constructor(id: string, patientId: string, type: string, value: GPAQValue, date: string) {
    this.id = id;
    this.patientId = patientId;
    this.type = type;
    this.value = value;
    this.date = date;
  }
}

export class GPAQValue{
  reponses: Reponse[];
}

class Reponse{
  poids: number;
  jr: number;
  hr: number;
  minu: number;
  quizId: number;
  questionId: number;
  questionPereId: number;
}

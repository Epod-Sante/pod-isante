import { Option } from './option';
import {Regulation} from './regulation';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    questionPere ; number;
    options: Option[];
    regulation: Regulation;

    min : number;
    hr : number;
    nbJour : number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.regulation = data.regulation;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
         if (data.questionTypeId === 3  || data.questionTypeId === 4 ) {
          if (data.questionTypeId === 4 ) {
              this.min = data.minutes;
              this.hr = data.heures;
        } else {
              this.nbJour = data.jours;
        }
        }
        this.questionPere = data.questionPere;
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}

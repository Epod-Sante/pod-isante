import { Option } from './option';
import {Regulation} from './regulation';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    questionPere ; number;
    options: Option[];
    regulation: Regulation;

    min : number = 0;
    hr : number = 0;
    nbJour : number = 0;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.regulation = data.regulation;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
         if (data.questionTypeId === 3  || data.questionTypeId === 4 ) {
          if (data.questionTypeId === 4 ) {
            if (data.minutes === undefined){
              this.min = 0;
            }else{
              this.min = data.minutes;
            }
            if (data.hr === undefined){
              this.hr = 0;
            }else{
              this.hr = data.hr;
            }
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

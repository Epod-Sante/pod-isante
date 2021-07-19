import { Option } from './option';
import {Regulation} from './regulation';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    regulation: Regulation;
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.regulation = data.regulation;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}

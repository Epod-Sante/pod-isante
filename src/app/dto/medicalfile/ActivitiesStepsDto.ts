import {StepsDto} from './StepsDto';

export class ActivitiesStepsDto {

  initDate: string;
  stepsDtoMap: Array<StepsDto>;


  constructor(initDate: string, stepsDtoMap: Array<StepsDto>) {
    this.initDate = initDate;
    this.stepsDtoMap = stepsDtoMap;
  }
}

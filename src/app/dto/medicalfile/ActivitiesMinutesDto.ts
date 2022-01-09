import {MinutesDto} from './MinutesDto';

export class ActivitiesMinutesDto {

  initDate: string;
  minutesDtoMap: Array<MinutesDto>;


  constructor(initDate: string, minutesDtoMap: Array<MinutesDto>) {
    this.initDate = initDate;
    this.minutesDtoMap = minutesDtoMap;
  }
}

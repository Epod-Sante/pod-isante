import {double} from "aws-sdk/clients/lightsail";

export class ActivityDto{
   serialVersionUID : string;

    id : string;
    dateTime : Date;
   calories : number ;
   steps : number
    distance : double
   minutesSedentary: number
   minutesLightlyActive : number
   minutesFairlyActive : number
   minutesVeryActive :  number
   activityCalories : number

  constructor(long, serialVersionUID: string,  id: string, dateTime: Date, calories: number, steps: number, distance: number, minutesSedentary: number, minutesLightlyActive: number, minutesFairlyActive: number, minutesVeryActive: number, activityCalories: number) {
    this.serialVersionUID = serialVersionUID
    this.id = id;
    this.dateTime = dateTime;
    this.calories = calories;
    this.steps = steps;
    this.distance = distance;
    this.minutesSedentary = minutesSedentary;
    this.minutesLightlyActive = minutesLightlyActive;
    this.minutesFairlyActive = minutesFairlyActive;
    this.minutesVeryActive = minutesVeryActive;
    this.activityCalories = activityCalories;
  }
}

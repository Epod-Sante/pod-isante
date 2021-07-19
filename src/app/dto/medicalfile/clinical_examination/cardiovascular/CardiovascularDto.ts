import {BloodPressureDto} from "./BloodPressureDto";
import {HeartRateDto} from "./HeartRateDto";

export class CardiovascularDto {

     heartRate : HeartRateDto;
     bloodPressure : BloodPressureDto;


  constructor(heart_rate: HeartRateDto, blood_pressure: BloodPressureDto) {
    this.heartRate = heart_rate;
    this.bloodPressure = blood_pressure;
  }
}

import {PharmacotherapyDto} from "./PharmacotherapyDto";
import {SmokingDto} from "./SmokingDto";
import {AnthropometryDto} from "./AnthropometryDto";
import {CardiovascularDto} from "./cardiovascular/CardiovascularDto";

export class ClinicalExaminationDto {

    cardiovascular : CardiovascularDto;
    anthropometry : AnthropometryDto;
      smoking : SmokingDto;
      pharmacotherapy : PharmacotherapyDto;
      date : string;


  constructor(cardiovascular: CardiovascularDto, anthropometry: AnthropometryDto, smoking: SmokingDto, pharmacotherapy: PharmacotherapyDto, date: string) {
    this.cardiovascular = cardiovascular;
    this.anthropometry = anthropometry;
    this.smoking = smoking;
    this.pharmacotherapy = pharmacotherapy;
    this.date = date;
  }
}

import {PatientDto} from "./patient/PatientDto";
import {ProfessionalDto} from "./patient/ProfessionalDto";

export class RecommandationDto {
  id : string
  patient : PatientDto;
  response : string;
  recommendation : string;
  professional : ProfessionalDto
  barriersRecommendation : string;
  barriersRecommendationSolutions : string;

  constructor(id : string,patient: PatientDto, response: string, recommandation: string, professional : ProfessionalDto,
              barriersRecommendation : string, barriersRecommendationSolutions : string ) {
    this.id = id
    this.patient = patient;
    this.recommendation = recommandation;
    this.response = response
    this.professional = professional
    this.barriersRecommendation = barriersRecommendation;
    this.barriersRecommendationSolutions = barriersRecommendationSolutions;

  }
}

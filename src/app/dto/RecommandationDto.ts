import {PatientDto} from './patient/PatientDto';
import {ProfessionalDto} from './patient/ProfessionalDto';

export class RecommandationDto {
  id: string;
  patient: PatientDto;
  response: string;
  recommendation: string;
  professional: ProfessionalDto;
  barriersRecommendation: string;
  barriersRecommendationSolutions: string;
  dateRecommendation: string;
  confiance: string;

  constructor(id: string, patient: PatientDto, response: string, recommandation: string, professional: ProfessionalDto,
              barriersRecommendation: string, confiance: string ) {
    this.id = id;
    this.patient = patient;
    this.recommendation = recommandation;
    this.response = response;
    this.professional = professional;
    this.barriersRecommendation = barriersRecommendation;
    this.confiance = confiance;

  }
}

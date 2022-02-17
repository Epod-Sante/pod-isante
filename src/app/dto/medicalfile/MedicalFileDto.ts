import {SocioDemographicVariablesDto} from './SocioDemographicVariablesDto';
import {AntecedentsDto} from './AntecedentsDto';
import {ClinicalExaminationDto} from './clinical_examination/ClinicalExaminationDto';
import {MedicalFileHistoryDto} from './MedicalFileHistoryDto';
import {LipidProfileDto} from './LipidProfileDto';

export class MedicalFileDto {

  id: string;
  patient: string;
  socioDemographicVariables: SocioDemographicVariablesDto;
  clinicalExamination: ClinicalExaminationDto [];
  creationDate: string;
  medicalFileHistory: MedicalFileHistoryDto [];
  lipidProfiles: LipidProfileDto[];


  constructor(id: string, patient: string, socioDemographicVariables: SocioDemographicVariablesDto, clinicalExamination: ClinicalExaminationDto[], creationDate: string, medicalFileHistory: MedicalFileHistoryDto[], lipidProfiles: LipidProfileDto[]) {
    this.id = id;
    this.patient = patient;
    this.socioDemographicVariables = socioDemographicVariables;
    this.clinicalExamination = clinicalExamination;
    this.creationDate = creationDate;
    this.medicalFileHistory = medicalFileHistory;
    this.lipidProfiles = lipidProfiles;
  }
}

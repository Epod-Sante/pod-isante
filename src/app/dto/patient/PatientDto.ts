import {ContactDto} from './ContactDto';
import {FamilyDoctorDto} from './FamilyDoctorDto';
import {PharmacyDto} from './PharmacyDto';
import {ProfessionalDto} from './ProfessionalDto';
import {MedicalFileDto} from '../medicalfile/MedicalFileDto';
import {AppointmentDto} from '../AppointmentDto';
import {QuestionnaireDto} from '../QuestionnaireDto';


export class PatientDto {

  id: string;
  fileNumber: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  motherName: string;
  contact: ContactDto;
  familyDoctor: FamilyDoctorDto[];
  pharmacy: PharmacyDto [];
  isActive: boolean;
  gender: string;
  questionnaireToken: string;
  questionnaireTokenExpirationDate: string;
  professionals: ProfessionalDto[];
  medicalFile: MedicalFileDto;
  loginCode: string;
  socioDemographicVariables: string;
  appointments: AppointmentDto[];
  questionnaires: QuestionnaireDto[];
  hasBREQ: boolean;


  constructor(id: string, fileNumber: string, firstName: string, lastName: string,
              birthday: Date, motherName: string, contact: ContactDto,
              familyDoctor: FamilyDoctorDto[], pharmacy: PharmacyDto[],
              professionals: ProfessionalDto[], isActive: boolean,
              medicalFileDto: MedicalFileDto, loginCode: string,
              questionnaireToken: string, socioDemographicVariables: string,
              questionnaireTokenExpirationDate: string, questionnaires: QuestionnaireDto[],
              appointments: AppointmentDto[], hasBREQ: boolean, genre: string) {
    this.id = id;
    this.fileNumber = fileNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.motherName = motherName;
    this.contact = contact;
    this.familyDoctor = familyDoctor;
    this.pharmacy = pharmacy;
    this.professionals = professionals;
    this.isActive = isActive;
    this.medicalFile = medicalFileDto;
    this.loginCode = loginCode;
    this.questionnaireToken = questionnaireToken;
    this.socioDemographicVariables = socioDemographicVariables;
    this.appointments = appointments;
    this.questionnaireTokenExpirationDate = questionnaireTokenExpirationDate;
    this.questionnaires = questionnaires;
    this.hasBREQ = hasBREQ;
    this.gender = genre;



  }


}

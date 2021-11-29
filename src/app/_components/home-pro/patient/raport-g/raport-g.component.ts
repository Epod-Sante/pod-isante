import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {PatientService} from '../../../../_services/patient.service';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {LipidProfileDto} from '../../../../dto/medicalfile/LipidProfileDto';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';
import {AntecedentsDto} from '../../../../dto/medicalfile/AntecedentsDto';
import {Response} from '../../../../dto';

@Component({
  selector: 'app-raport-g',
  templateUrl: './raport-g.component.html',
  styleUrls: ['./raport-g.component.css']
})
export class RaportGComponent implements OnInit, OnChanges {

  @Input() patient: PatientDto;
  date = new Date();
  pharmacotherapy: any [];
  antecedents: AntecedentsDto[] = null;
  clinicalExamination: ClinicalExaminationDto [];
  lipidProfiles: LipidProfileDto[];
  medicalFileHistory: MedicalFileHistoryDto [] = null;
  medicalFile: MedicalFileDto;
  socioDemographicVariables: SocioDemographicVariablesDto = null;
  nombreVisites = 0;
  visites: AppointmentDto [] = null;
  barriersRecommendation: string[] = null;
  barriersRecommendationSolutions: string[] = null;
  recommandation: any[] = null;
  recomm: any;
  detaills: any[];

  constructor(private patientService: PatientService, ) {

  }

  ngOnInit() {
 /*  this.socioDemographicVariables = JSON.parse(this.patient.socioDemographicVariables)
    this.medicalFile = this.patient.medicalFile
    this.medicalFileHistory = this.medicalFile.medicalFileHistory
    this.lipidProfiles = this.medicalFile.lipidProfiles
    this.clinicalExamination = this.medicalFile.clinicalExamination
    for(let i=0; i<this.medicalFileHistory.length; i++){
      if(i==0){
        this.antecedents = [JSON.parse(this.medicalFileHistory[i].antecedents)]

      }else{
        this.antecedents.push(JSON.parse(this.medicalFileHistory[i].antecedents))}
    }
    this.getAllVisites()*/


  }
  ngOnChanges(changes: SimpleChanges){

    // stocker parse dans une variavble et l utiliser
    if (JSON.parse(this.patient.socioDemographicVariables) != null){
      this.socioDemographicVariables = JSON.parse(this.patient.socioDemographicVariables);
    }
    if (this.patient.medicalFile != null){
      this.medicalFile = this.patient.medicalFile;
    }

    if (this.medicalFile.medicalFileHistory != null){
      this.medicalFileHistory = this.medicalFile.medicalFileHistory;
    }

    if (this.medicalFile.lipidProfiles != null){
      this.lipidProfiles = this.medicalFile.lipidProfiles;
    }

    if (this.medicalFile.clinicalExamination != null){
      this.clinicalExamination = this.medicalFile.clinicalExamination;
    }

    for (let i = 0; i < this.medicalFileHistory.length; i++){
      if (i === 0){
        this.antecedents = [JSON.parse(this.medicalFileHistory[i].antecedents)];

      }else{
        this.antecedents.push(JSON.parse(this.medicalFileHistory[i].antecedents)); }
    }
    this.getAllVisites();
    this.getAllReco();
  }
  public getAllVisites = () => {
    this.patientService.getRdv(this.patient.id).subscribe( visites => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      const vis = JSON.parse(JSON.stringify(visites));
      console.log(vis);
      this.visites = vis;
      this.nombreVisites = this.visites.length;
    });
    // console.log("yes "+this.users)
  }
  getAllReco(){
    this.patientService.getReco(this.patient.id).subscribe(recommandations => {
      const reco = recommandations as Response;
      this.recomm = reco.object;
      this.barriersRecommendation = JSON.parse(JSON.stringify(this.recomm.barriersRecommendation));
      this.barriersRecommendationSolutions = JSON.parse(JSON.parse(JSON.stringify(this.recomm.barriersRecommendationSolutions)));
      this.recommandation = JSON.parse(this.recomm.recommendation);
      for (let i = 0 ; i < this.recommandation.length; i++){
        if (i === 0) {
          this.detaills = this.recommandation[i].details;
        }
        else {
          this.detaills.push(this.recommandation[i].details);
        }

      }



      // this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      // console.log(this.liste_antecedants[0].antecedents)


    });

  }


}

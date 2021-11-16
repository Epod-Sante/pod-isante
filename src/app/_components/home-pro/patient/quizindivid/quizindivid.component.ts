import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";


@Component({
  selector: 'app-quizindivid',
  templateUrl: './quizindivid.component.html',
  styleUrls: ['./quizindivid.component.css']
})
export class QuizindividComponent implements OnInit {
  antecedants : MedicalFileHistoryDto [] = []
  response : Boolean
  constructor() { }

  ngOnInit() {
    let mdh = new MedicalFileHistoryDto([""],'Angine',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Infarctus/crise cardiaque',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Pontages coronariens',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Angioplastie coronarienne',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Maladie valvulaire',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Arythmies cardiaques',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Insuffisance cardiaque (NYHA I ou II) ',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Insuffisance cardiaque (NYHA III ou IV)',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'AVC',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'ICT',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Maladie vasculaire périphérique',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Cancer',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Maladie pulmonaire obstructive chronique  (MPOC)',false,[""])
    this.antecedants.push(mdh);
     mdh = new MedicalFileHistoryDto([""],'Asthme',false,[""])
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([""],'Insuffisance rénale/dialyse/transplantation',false,[""])
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([""],'Troubles articulaires (polyarthrite rhumatoide,\n' +
      'arthrite, spondylarthrite\n' +
      'ankylosante, arthrose)',false,[""])
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([""],'Maladie neuro-dégénérative (ex :\n' +
      'sclérose en plaque,Parkinson, Alzheimer)',false,[""])
    this.antecedants.push(mdh);


  }
  setYear( j: number,  val: string){

    this.antecedants[j].date.push(val);
    this.antecedants[j].response = true;
      console.log(this.antecedants);


  }

}

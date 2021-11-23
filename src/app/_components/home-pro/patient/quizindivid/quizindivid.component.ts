import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Request} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {first} from 'rxjs/operators';
import {IndividualQuestionnaireDto} from '../../../../dto/medicalfile/IndividualQuestionnaireDto';


@Component({
  selector: 'app-quizindivid',
  templateUrl: './quizindivid.component.html',
  styleUrls: ['./quizindivid.component.css']
})
export class QuizindividComponent implements OnInit {
  @Input() patient: PatientDto;
  antecedants: MedicalFileHistoryDto [] = [];
  response: boolean;
  medicamant: string;

  troublesMusculoSquelettiques = new MedicalFileHistoryDto([], 'Troubles musculo-squelettiques (fracture)', false, ['']);
  douleurs = new MedicalFileHistoryDto([],
    'douleurs ', false, []);
  medicaments = new MedicalFileHistoryDto([],
    'douleurs ', false, []);
  conds = new MedicalFileHistoryDto([],
    'Conditions de sante ', false, []);
  fractures = new MedicalFileHistoryDto([],
    'Freactures ', false, []);
  consommation = new MedicalFileHistoryDto([],
    'Consommation de produits alcoolisés, tabagiques ou drogues ', false, []);

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // let socio = new SocioDemographicVariablesDto();

    let mdh = new MedicalFileHistoryDto([], 'Angine', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Infarctus/crise cardiaque', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Pontages coronariens', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Angioplastie coronarienne', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie valvulaire', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Arythmies cardiaques', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance cardiaque (NYHA I ou II) ', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance cardiaque (NYHA III ou IV)', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'AVC', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'ICT', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie vasculaire périphérique', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Cancer', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie pulmonaire obstructive chronique  (MPOC)', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Asthme', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance rénale/dialyse/transplantation', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Troubles articulaires (polyarthrite rhumatoide,\n' +
      'arthrite, spondylarthrite\n' +
      'ankylosante, arthrose)', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie neuro-dégénérative (ex :\n' +
      'sclérose en plaque,Parkinson, Alzheimer)', false, ['']);
    this.antecedants.push(mdh);


  }

  setYear(j: number, val: string) {

    this.antecedants[j].date.push(val);
    this.antecedants[j].response = true;
    console.log(this.antecedants);


  }

  showOptions(event, j: number): void {
    if (event.checked) {
      this.antecedants[j].response = true;
    }
  }

  setDouleur(event, val: string) {
    if (event.checked) {
      this.douleurs.description.push(val);
      this.douleurs.response = true;
    } else {
      let index;
      for (let i = 0; i < this.douleurs.description.length; i++) {
        if (this.douleurs.description[i] === val) {
          index = i;
        }
      }
      this.douleurs.description.splice(index, 1);
    }
    console.log(this.douleurs);
  }

  showOptions1(event, j: number): void {
    if (event.checked) {
      this.antecedants[j].date = [];
      this.antecedants[j].response = false;
    }
  }

  delette(j: number, i: number) {
    this.antecedants[j].date.splice(i, 1);
  }

  enregistrerQuiz(gender: string, civilStatus: string, familyIncome: string, jobStatus: string,
                  livingEnvironment: string, housingType: string,
                  frac1, frac2, frac3, education: string) {
    const socio = new SocioDemographicVariablesDto(civilStatus, familyIncome, jobStatus, education, livingEnvironment, housingType, gender);
    this.antecedants.push(this.douleurs);
    this.antecedants.push(this.medicaments);
    this.antecedants.push(this.conds);
    if (frac1 !== '') {
      this.fractures.description.push(frac1);
    }
    if (frac2 !== '') {
      this.fractures.description.push(frac2);
    }
    if (frac3 !== '') {
      this.fractures.description.push(frac3);
    }
    console.log('/////////////////////////////' + this.patient);
    this.antecedants.push(this.fractures);
    const ini = this.patient.lastName.substr(0, 1);
    const tial = this.patient.lastName.substr(0, 1);
    const initial = ini + '' + tial;
    const fileNumber = this.patient.fileNumber;

    const individuQuiz = new IndividualQuestionnaireDto(this.patient.id, fileNumber,
      initial, JSON.stringify(socio), JSON.stringify(this.antecedants));
    const request = new Request(individuQuiz);
    this.patientService.addQuizIndi(request, this.patient.id).pipe(first())
      .subscribe(
        data => {
          this.openSnackBar(' AJOUT REUSSI', 'Ok');


        },
        error => {
          this.openSnackBar(' Erreur d\'Ajout', 'Ok');


        });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 400,

    });
  }


  add_medic(val: string) {
    this.medicaments.description.push(val);
    this.medicamant = '';
  }

  delett_med(i: number) {
    this.medicaments.description.splice(i, 1);
  }

  setCond(event, val: string) {
    if (event.checked) {
      this.conds.description.push(val);
      this.conds.response = true;
    } else {
      let index;
      for (let i = 0; i < this.conds.description.length; i++) {
        if (this.conds.description[i] === val) {
          index = i;
        }
      }
      this.douleurs.description.splice(index, 1);
    }

  }


}

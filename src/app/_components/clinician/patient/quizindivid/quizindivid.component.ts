import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Request} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {first} from 'rxjs/operators';
import {IndividualQuestionnaireDto} from '../../../../dto/medicalfile/IndividualQuestionnaireDto';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';


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
  yr: string;
  selected = -1;
  civilStatus: string ;

  familyIncome: string ;
  jobStatus: string ;
  education: string ;
  livingEnvironment: string ;
  housingType: string ;
  genre: string ;
  civilStatuss: string[] = ['Célibataire', 'Marié', 'Conjoint de fait', 'Veuf/veuve', 'Séparé/e', 'Divorcé'];
  genders: string[] = ['Femme', 'Homme', 'Autre', 'Préfère ne pas répondre'];
  educations: string[] = ['< 11 ans de scolarité (Diplôme d \'études secondaires) ',
    'DES',
    'DEP',
    'Formation collégiale',
    'Formation universitaire 1er cycle',
    'Formation universitaire 2ème et 3ème cycle'];
  jobStatuss: string[] = ['À l’emploi', 'Retraité', 'Sans emploi ', 'Au foyer', 'Autre'];
  livingEnvironments: string[] = ['Urbain (ville)', 'Rural (campagne)'];
  housingTypes: string[] = ['Maison unifamiliale', 'Appartement/Condo', 'Maison de retraite', 'CHSLD/Soins longue durée'];
  familyIncomes: string[] = ['< 20 000 $ / année', 'Entre 20 000 et 39 999 $ / année',
    'Entre 40 000 et 59 999$ / année', 'Entre 60 000 et 79 999 $ / année', '80 000 $ / année'];

  troublesMusculoSquelettiques = new MedicalFileHistoryDto([], 'Troubles musculo-squelettiques (fracture)', false, []);
  douleurs = new MedicalFileHistoryDto([],
    'Douleurs ', false, []);
  medicaments = new MedicalFileHistoryDto([],
    'Medicaments ', false, []);
  conds = new MedicalFileHistoryDto([],
    'Conditions de santé ', false, []);
  fractures = new MedicalFileHistoryDto([],
    'Fractures ', false, []);
  consommation = new MedicalFileHistoryDto([],
    'Consommation de produits alcoolisés, tabagiques ou drogues ', false, []);
  public frac: string;
  public activeT: boolean;
  alcoolFreq: string;
  alcool: string;
  tabac: string;
  tabacFreq: string;
  drogueFreq: string;
  drogue: string;
  autreCond: string;


  constructor(private patientService: PatientService, private snackBar: MatSnackBar, private router: Router,
              private toastrService: NbToastrService) {

  }

  ngOnInit() {
    this.civilStatus = '';
    this.familyIncome = '';
    this.jobStatus = '';
    this.education = '';
    this.livingEnvironment = '';
    this.housingType = '';
    this.genre = '';
    this.antecedants = [];
    this.selected = -1;
    let mdh = new MedicalFileHistoryDto([], 'Angine', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Infarctus/crise cardiaque', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Pontages coronariens', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Angioplastie coronarienne', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie valvulaire', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Arythmies cardiaques', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance cardiaque (NYHA I ou II) ', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance cardiaque (NYHA III ou IV)', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'AVC', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'ICT', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie vasculaire périphérique', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Cancer', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie pulmonaire obstructive chronique  (MPOC)', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Asthme', false, ['']);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Insuffisance rénale/dialyse/transplantation', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Troubles articulaires (polyarthrite rhumatoide,\n' +
      'arthrite, spondylarthrite\n' +
      'ankylosante, arthrose)', false, []);
    this.antecedants.push(mdh);
    mdh = new MedicalFileHistoryDto([], 'Maladie neuro-dégénérative (ex :\n' +
      'sclérose en plaque,Parkinson, Alzheimer)', false, []);
    this.antecedants.push(mdh);


  }

  setYear(j: number, val: string) {
    if ((val != null) &&
      (val !== '') )
    {
      if (isNaN(Number(val))){
        alert('Veuillez saisir une valeur numerique');
      }else{
        this.antecedants[j].date.push(val);
        this.antecedants[j].response = true;
        this.yr = '';

      }
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
  }

  showOptions(event, j: number): void {
    this.antecedants[j].date = [];
    this.antecedants[j].response = false;
  }

  showOptions1(event, j: number): void {
    this.antecedants[j].response = true;

  }

  delette(j: number, i: number) {
    this.antecedants[j].date.splice(i, 1);
  }

  enregistrerQuiz() {
    let socio;
    if (this.civilStatus === '' &&
      this.familyIncome === '' &&
      this.jobStatus === '' &&
      this.education === '' &&
      this.livingEnvironment === '' &&
      this.housingType === '' &&
      this.genre === ''){
      socio = null;
    } else {
      socio = new SocioDemographicVariablesDto(
        this.civilStatus,
        this.familyIncome,
        this.jobStatus,
        this.education,
        this.livingEnvironment ,
        this.housingType,
        this.genre);
    }
    this.antecedants.push(this.douleurs);
    this.antecedants.push(this.medicaments);
    if (this.frac !== '') {
      this.fractures.description.push(this.frac);
    }
    if (this.autreCond !== '') {
      this.conds.description.push(this.autreCond);
    }
    this.antecedants.push(this.conds);
    this.fractures.response = this.activeT;
    this.antecedants.push(this.fractures);
    const ini = this.patient.lastName.substr(0, 1);
    const tial = this.patient.firstName.substr(0, 1);
    const initial = ini + '' + tial;
    const fileNumber = this.patient.fileNumber;

    const individuQuiz = new IndividualQuestionnaireDto(this.patient.id, fileNumber, initial,JSON.stringify(socio),
      JSON.stringify(this.antecedants));
    const request = new Request(individuQuiz);
    this.patientService.addQuizIndi(request, this.patient.id).pipe(first())
      .subscribe(
        data => {
          this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
          this.reload('/listpatient');
        },
        error => {
          this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
        });
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      {position, status});
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
  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}

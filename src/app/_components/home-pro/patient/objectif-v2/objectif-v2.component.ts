import {Component, Input, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {Endroit, Intensite, Objectif, ObjectifModel, Parametre, Recommandation} from './ObjectifModel';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {Request} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-objectif-v2',
  templateUrl: './objectif-v2.component.html',
  styleUrls: ['./objectif-v2.component.css']
})
export class ObjectifV2Component implements OnInit {
  @Input() patient: PatientDto;

  parametres: Array<Parametre> = new Array();
  parametres2: Array<Parametre> = new Array();
  parametres3: Array<Parametre> = new Array();

  freqObj1 = '';
  freqObj2 = '';

// *************************************************************   Objectif
  value1Obj1 = 0;
  options1Obj1: Options = {
    floor: 0,
    ceil: 25000
  };
  value2Obj1 = 0;
  options2Obj1: Options = {
    floor: 0,
    ceil: 25000
  };


  value1Obj2 = 0;
  options1Obj2: Options = {
    floor: 0,
    ceil: 25000
  };
  value2Obj2 = 0;
  options2Obj2: Options = {
    floor: 0,
    ceil: 25000
  };


  value1Obj3 = 0;
  options1Obj3: Options = {
    floor: 0,
    ceil: 25000
  };
  value2Obj3 = 0;
  options2Obj3: Options = {
    floor: 0,
    ceil: 25000
  };

  // **************************************************************************** Paramètres de l'objectif

  private moyensObjctif1: string[] = [
    'Prévoir des journées et moments fixes dans l\'horaire pour pratiquer de l\'activité physique.',
    'Avoir un plan B pour remplacer une activité physique déjà plannifiée en cas d\'imprévus.',
    'S\'inscrire à un groupe de conditionnement ou demarche.',
    'Faire une liste des activités physiques que vous aimez ou croyez pouvoir apprécier et regarder les moyens pour initier l\'activité.',
    'Faire un journal d\'activité physique.',
    'Augmenter les tranports actifs (déplacements pour aller au travail, à la pharmacie, à l\'épicerie,etc.).',
    'Faire une activité physique avec un membre de la famille ou un(e) ami(e).',
    'Rechercher les infrastructures à proximité de votre domicile pour pratiquer de l\'activité physique (piste cyclable, sentiers pédestres,centre de conditionnement, etc).',
    'Écouter de la musique ou des livres audios pendant la pratique d\'activité physique.'
  ];

  private freqObjctif1: string[] = [
    '1-2 jours/semaine',
    '3 jours/semaine',
    '4 jours/semaine',
    '5 jours/semaine',
    '6 jours/semaine',
    '1x/jour',
    '2x/jour',
    '3x/jour'
  ];

  groupOptionEndroitsObj1 = [
    {id: 1, group: 'Espaces plein air', checked: false, options: [
        {id: 1, group: 'Pistes cyclables', checked: false},
        {id: 1, group: 'Parcs', checked: false},
        {id: 1, group: 'Sentiers pédestres', checked: false}]},
    {id: 2, group: 'Centre d\'entrainement', checked: false, options: [
        {id: 1, group: 'Tapis roulant', checked: false},
        {id: 1, group: 'Vélo stationnaire', checked: false},
        {id: 1, group: 'Elliptique', checked: false},
        {id: 1, group: 'Escaladeur', checked: false},
        {id: 1, group: 'Rameur', checked: false}]},
    {id: 3, group: 'Au travail', checked: false, options: [
        {id: 1, group: 'Utiliser les escaliers', checked: false},
        {id: 1, group: 'Se stationner plus loin', checked: false},
        {id: 1, group: 'Prendre une marche sur', checked: false},
        {id: 1, group: 'La paused îner', checked: false}]}
  ];

  private endroitsObjctif10 ;

  private endroitsObjctif1: string[] = [
    'À domicile.',
    'Au travail.',
    'Espace plein air.',
    'Centre d\'entrainement.',
    'Centre communautaire.',
    'Centre d\'achat.'
  ];

  private momentsObjctif1: string[] = [
    'Matin.',
    'Après-midi.',
    'Soir.',
    'Après les repas.',
    'Fin de semaine.',
    'Pendant la semaine.'
  ];
  IntensiteOptionsObjectif1Value = 0;
  IntensiteOptionsObjectif1: Options = {
    floor: 0,
    ceil: 10,
    vertical: true,
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: 'Aucun effort' },
      { value: 1, legend: 'Très très facile' },
      { value: 2, legend: 'Très facile' },
      { value: 3, legend: 'Facile' },
      { value: 4, legend: 'Effort modéré' },
      { value: 5, legend: 'Moyen' },
      { value: 6, legend: 'Un peu dur' },
      { value: 7, legend: 'Dur' },
      { value: 8, legend: 'Très dur' },
      { value: 9, legend: 'Très très dur' },
      { value: 10, legend: 'Maximal' }
    ]
  };

  endroitsGroupsObjctif1 = [
    {id: 1, group: 'Espaces plein air', options: ['Pistes cyclables', 'Parcs', 'Sentiers pédestres']},
    {id: 2, group: 'Centre d\'entrainement', options: ['Tapis roulant', 'Vélo stationnaire', 'Elliptique', 'Escaladeur', 'Rameur']},
    {id: 3, group: 'Autravail', options: ['Utiliser les escaliers', 'Se stationner plus loin', 'Prendre une marche sur', 'La paused îner']},
  ];

  private precautionsObjctif1: string[] = [
    'Faire un échauffement long(5 minutes).',
    'Faire un retour au calme long(5 minutes).',
    'Commencer à faible intensité lors des températures froides.',
    'Avoir sa nitroglycérine sur soir lors des périodes d\'activité physique (prèsducorps, ne doit pas gelée).',
    'Utiliser des crampons l\'hiver pour la marche.',
    'Utiliser des bâtons de marche/canne pour la marche.',
    'L\'hiver, prévoir une période d\'échauffement avant de pelleter.',
    'Envisager consulter un professionnel de la santé en cas de doute (infirmière, kinésiologue, médecin, nutritionniste).',
    'Aucune précaution.'
  ];


  moyensObjctif1OptionsCheckbox = [];
  freqObjctif1OptionsSelect = [];
  endroitsObjctif1OptionsSelect = [];
  endroitsOptionsObjctif1OptionsSelect = [];
  momentsObjctif1OptionsSelect = [];
  precautionsObjctif1OptionsSelect = [];

// ****************************

  private moyensObjctif2: string[] = [
    'Prévoir des journées et moments fixes dans l\'horaire pour pratiquer de l\'activité physique.',
    'Avoir un plan B pour remplacer une activité physique déjà plannifiée en cas d\'imprévus.',
    'S\'inscrire à un groupe de conditionnement ou demarche.',
    'Faire une liste des activités physiques que vous aimez ou croyez pouvoir apprécier et regarder les moyens pour initier l\'activité.',
    'Faire un journal d\'activité physique.',
    'Augmenter les tranports actifs (déplacements pour aller au travail, à la pharmacie, à l\'épicerie,etc.).',
    'Faire une activité physique avec un membre de la famille ou un(e) ami(e).',
    'Rechercher les infrastructures à proximité de votre domicile pour pratiquer de l\'activité physique (piste cyclable, sentiers pédestres,centre de conditionnement, etc).',
    'Écouter de la musique ou des livres audios pendant la pratique d\'activité physique.'
  ];

  private freqObjctif2: string[] = [
    '1-2 jours/semaine',
    '3 jours/semaine',
    '4 jours/semaine',
    '5 jours/semaine',
    '6 jours/semaine',
    '1x/jour',
    '2x/jour',
    '3x/jour'
  ];

  private endroitsObjctif2: string[] = [
    'À domicile',
    'Au travail',
    'Espace plein air',
    'Centre d\'entrainement',
    'Centre communautaire',
    'Centre d\'achat'
  ];

  private momentsObjctif2: string[] = [
    'Matin.',
    'Après-midi.',
    'Soir.',
    'Après les repas.',
    'Fin de semaine.',
    'Pendant la semaine.'
  ];
  IntensiteOptionsObjectif2Value = 0;
  IntensiteOptionsObjectif2: Options = {
    floor: 0,
    ceil: 10,
    vertical: true,
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: 'Aucun effort' },
      { value: 1, legend: 'Très très facile' },
      { value: 2, legend: 'Très facile' },
      { value: 3, legend: 'Facile' },
      { value: 4, legend: 'Effort modéré' },
      { value: 5, legend: 'Moyen' },
      { value: 6, legend: 'Un peu dur' },
      { value: 7, legend: 'Dur' },
      { value: 8, legend: 'Très dur' },
      { value: 9, legend: 'Très très dur' },
      { value: 10, legend: 'Maximal' }
    ]
  };

  endroitsGroupsObjctif2 = [
    {id: 1, group: 'Espaces plein air', options: ['Pistes cyclables', 'Parcs', 'Sentiers pédestres']},
    {id: 2, group: 'Centre d\'entrainement', options: ['Tapis roulant', 'Vélo stationnaire', 'Elliptique', 'Escaladeur', 'Rameur']},
    {id: 3, group: 'Autravail', options: ['Utiliser les escaliers', 'Se stationner plus loin', 'Prendre une marche sur', 'La paused îner']},
  ];

  private precautionsObjctif2: string[] = [
    'Faire un échauffement long(5 minutes).',
    'Faire un retour au calme long(5 minutes).',
    'Commencer à faible intensité lors des températures froides.',
    'Avoir sa nitroglycérine sur soir lors des périodes d\'activité physique (prèsducorps, ne doit pas gelée).',
    'Utiliser des crampons l\'hiver pour la marche.',
    'Utiliser des bâtons de marche/canne pour la marche.',
    'L\'hiver, prévoir une période d\'échauffement avant de pelleter.',
    'Envisager consulter un professionnel de la santé en cas de doute (infirmière, kinésiologue, médecin, nutritionniste).',
    'Aucune précaution.'
  ];


  moyensObjctif2OptionsCheckbox = [];
  freqObjctif2OptionsSelect = [];
  endroitsObjctif2OptionsSelect = [];
  momentsObjctif2OptionsSelect = [];
  precautionsObjctif2OptionsSelect = [];

  // *************************************

  private moyensObjctif3: string[] = [
    'S\'équiper d\'équipement pour bouger confortablement (chaussure confortable, pantalonet chandailde sport).',
    'Mettre une sur le cellulaire au autre appareil afin de selever aux 30 minutes ou aux heures pour couper les périodes assises.',
    'Avoir un maximum d\'heures par jour consacré à des activités de loisirs assises (télévision, ordinateur/tablette, lecture, jeux, etc.).',
    'Ajouter une marche de loisir à un moment opportun de votre journé.'
  ];


  private precautionsObjctif3: string[] = [
    'Faire un échauffement long(5 minutes).',
    'Faire un retour au calme long(5 minutes).',
    'Commencer à faible intensité lors des températures froides.',
    'Avoir sa nitroglycérine sur soir lors des périodes d\'activité physique (prèsducorps, ne doit pas gelée).',
    'Utiliser des crampons l\'hiver pour la marche.',
    'Utiliser des bâtons de marche/canne pour la marche.',
    'L\'hiver, prévoir une période d\'échauffement avant de pelleter.',
    'Envisager consulter un professionnel de la santé en cas de doute (infirmière, kinésiologue, médecin, nutritionniste).',
    'Aucune précaution.'
  ];

  moyensObjctif3OptionsCheckbox = [];
  precautionsObjctif3OptionsSelect = [];

  objectif: Array<ObjectifModel> = new Array();

  constructor(private _snackBar : MatSnackBar, private  patientService: PatientService) {


    for (const i in this.moyensObjctif1) {
      this.moyensObjctif1OptionsCheckbox.push({name: this.moyensObjctif1[i], value: i, checked: false});
    }

    for (const i in this.freqObjctif1) {
      this.freqObjctif1OptionsSelect.push({name: this.freqObjctif1[i], value: i, checked: false});
    }

    for (const i in this.endroitsObjctif1) {
      this.endroitsObjctif1OptionsSelect.push(
        {endroit: this.endroitsObjctif1[i], value: i, checked: false, endroitLevel2: this.groupOptionEndroitsObj1}
      );
    }

    for (const i in this.momentsObjctif1) {
      this.momentsObjctif1OptionsSelect.push({name: this.momentsObjctif1[i], value: i, checked: false});
    }

    for (const i in this.precautionsObjctif1) {
      this.precautionsObjctif1OptionsSelect.push({name: this.precautionsObjctif1[i], value: i, checked: false});
    }

    // ********************

    for (const i in this.moyensObjctif2) {
      this.moyensObjctif2OptionsCheckbox.push({name: this.moyensObjctif2[i], value: i, checked: false});
    }

    for (const i in this.freqObjctif2) {
      this.freqObjctif2OptionsSelect.push({name: this.freqObjctif2[i], value: i, checked: false});
    }

    for (const i in this.endroitsObjctif2) {
      this.endroitsObjctif2OptionsSelect.push({name: this.endroitsObjctif2[i], value: i, checked: false});
    }

    for (const i in this.momentsObjctif2) {
      this.momentsObjctif2OptionsSelect.push({name: this.momentsObjctif2[i], value: i, checked: false});
    }

    for (const i in this.precautionsObjctif2) {
      this.precautionsObjctif2OptionsSelect.push({name: this.precautionsObjctif2[i], value: i, checked: false});
    }
// *******************
    for (const i in this.moyensObjctif3) {
      this.moyensObjctif3OptionsCheckbox.push({name: this.moyensObjctif3[i], value: i, checked: false});
    }

    for (const i in this.precautionsObjctif3) {
      this.precautionsObjctif3OptionsSelect.push({name: this.precautionsObjctif3[i], value: i, checked: false});
    }

  }

  ngOnInit() {
  }

  updateCheckedOptionsMoyensObj1(option, event){
    this.moyensObjctif1OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif1OptionsCheckbox.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateCheckedSelectFreqObj1(option){
    // this.freqObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.freqObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
    this.freqObj1 = option;
    console.log(option );
  }

  updateCheckedOptionsEndroitsObj1(option){
    this.endroitsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.endroitsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateCheckedOptionsEndroitsObj10(optionValue, endroitsId, optionGroupId){
    // this.endroitsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.endroitsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('optionValue', optionValue );
    console.log('endroitsId', endroitsId );
    console.log('optionGroupId', optionGroupId );
  }


  updateCheckedOptionsMomentsObj1(option, event){
    this.momentsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.momentsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }
  updateCheckedOptionsPrecautionsObj1(option, event){
    this.precautionsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateIntensiteObj1($event){
    console.log('option', $event );
  }

  // ********************

  updateCheckedOptionsMoyensObj2(option, event){
    this.moyensObjctif2OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif2OptionsCheckbox.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateCheckedSelectFreqObj2(option){
    this.freqObj2 = option;
    console.log(option );
  }

  updateCheckedOptionsEndroitsObj2(option, event){
    this.endroitsObjctif2OptionsSelect.find(element => element.value === option.value).checked = ((this.endroitsObjctif2OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateCheckedOptionsMomentsObj2(option, event){
    this.momentsObjctif2OptionsSelect.find(element => element.value === option.value).checked = ((this.momentsObjctif2OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }
  updateCheckedOptionsPrecautionsObj2(option, event){
    this.precautionsObjctif2OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif2OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  // ************************
  updateCheckedOptionsMoyensObj3(option, event){
    this.moyensObjctif3OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif3OptionsCheckbox.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  updateCheckedOptionsPrecautionsObj3(option, event){
    this.precautionsObjctif3OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif3OptionsSelect.find(element => element.value === option.value).checked === false));
    console.log('option', option );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  SaveObjectifs(){

    if (this.value1Obj1 !== 0 || this.value2Obj1 !== 0){
      if (this.value1Obj1 !== 0){
        this.parametres.push(new Parametre('Augmenter de X lenombre de pas quotidien', this.value1Obj1));
      }
      if (this.value2Obj1 !== 0){
        this.parametres.push(new Parametre('Atteindre un totalde X pas quotidien', this.value2Obj1));
      }

      this.objectif.push(new ObjectifModel(new Objectif('Nombre de pas quotidien', this.parametres),
        this.moyensObjctif1OptionsCheckbox,
        new Recommandation(
          this.freqObj2,
          new Endroit([''], [''], ['']),
          this.momentsObjctif1OptionsSelect,
          new Intensite(
            this.IntensiteOptionsObjectif1Value,
            this.IntensiteOptionsObjectif1.stepsArray.find(element => element.value === this.IntensiteOptionsObjectif1Value).legend)),
        this.precautionsObjctif1OptionsSelect));
    }

    if (this.value1Obj2 !== 0 || this.value2Obj2 !== 0){
      if (this.value1Obj2 !== 0){
        this.parametres2.push(new Parametre('Augmenter de X le nombre de minutes', this.value1Obj2));
      }
      if (this.value2Obj2 !== 0){
        this.parametres2.push(new Parametre('Atteindre un total de X minutes quotidiennes', this.value2Obj2));
      }

      this.objectif.push(new ObjectifModel(new Objectif('Minutes quotidiennes actives', this.parametres2),
        this.moyensObjctif2OptionsCheckbox,
        new Recommandation(
          this.freqObj1,
          new Endroit([''], [''], ['']),
          this.momentsObjctif2OptionsSelect,
          new Intensite(
            this.IntensiteOptionsObjectif2Value,
            this.IntensiteOptionsObjectif2.stepsArray.find(element => element.value === this.IntensiteOptionsObjectif2Value).legend)),
        this.precautionsObjctif2OptionsSelect));
    }

    if (this.value1Obj3 !== 0 || this.value2Obj3 !== 0){
      if (this.value1Obj3 !== 0){
        this.parametres3.push(new Parametre('Diminuer de X le nombre de minutes sédentaires', this.value1Obj3));
      }
      if (this.value2Obj3 !== 0){
        this.parametres3.push(new Parametre('Viser un maximum de X minutes consécutives de temps sédentaires', this.value2Obj3));
      }

      this.objectif.push(new ObjectifModel(new Objectif('Temps sédentaire', this.parametres3),
        this.moyensObjctif3OptionsCheckbox,
        null,
        this.precautionsObjctif3OptionsSelect));
    }

    console.log(this.objectif);


    const professionel = JSON.parse(localStorage.getItem('currentUser'));
    const recomm = new RecommandationDto(null, this.patient, null, JSON.stringify(this.objectif), null, null, null);
    const request = new Request(recomm);
    this.patientService.addReco(request).subscribe( reponse => {
      this.openSnackBar('Ajout reussi', 'Ok');
    }, error => {
      this.openSnackBar('Operation echoue', 'Ok');
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 500,
    });
  }
}

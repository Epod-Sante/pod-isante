import {Component, ElementRef, Inject, Input, OnInit, Optional, QueryList, ViewChildren} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {Endroit, Intensite, Objectif, ObjectifModel, Parametre, Recommandation} from './ObjectifModel';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {Request} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {NbToastrService, NbWindowRef} from '@nebular/theme';
import {Subscription} from 'rxjs';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';


@Component({
  selector: 'app-objectif-v2',
  templateUrl: './objectif-v2.component.html',
  styleUrls: ['./objectif-v2.component.css']
})
export class ObjectifV2Component implements OnInit {
  patient: PatientDto;

  parametres: Array<Parametre> = new Array();
  parametres2: Array<Parametre> = new Array();
  parametres3: Array<Parametre> = new Array();

  freqObj1 = '';
  freqObj2 = '';

// *************************************************************   Objectif
  value1Obj1 = 0;
  value2Obj1 = 0;

  value1Obj2 = 0;
  value2Obj2 = 0;

  value1Obj3 = 0;
  value2Obj3 = 0;

  // **************************************************************************** Paramètres de l'objectif

  private moyensObjctif1: string[] = [
    'Prévoir des journées et moments fixes dans l\'horaire pour pratiquer de l\'activité physique.',
    'Avoir un plan B pour remplacer une activité physique déjà plannifiée en cas d\'imprévus.',
    'S\'inscrire à un groupe de conditionnement ou de marche.',
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
    {
      id: 1, group: 'Espaces plein air', checked: false, options: [
        {id: 1, group: 'Pistes cyclables', checked: false},
        {id: 2, group: 'Parcs', checked: false},
        {id: 3, group: 'Sentiers pédestres', checked: false}]
    },
    {
      id: 2, group: 'Centre d\'entrainement', checked: false, options: [
        {id: 1, group: 'Tapis roulant', checked: false},
        {id: 2, group: 'Vélo stationnaire', checked: false},
        {id: 3, group: 'Elliptique', checked: false},
        {id: 4, group: 'Escaladeur', checked: false},
        {id: 5, group: 'Rameur', checked: false}]
    },
    {
      id: 3, group: 'Au travail', checked: false, options: [
        {id: 1, group: 'Utiliser les escaliers', checked: false},
        {id: 2, group: 'Se stationner plus loin', checked: false},
        {id: 3, group: 'Prendre une marche sur l’heure de la pause dîner', checked: false}]
    },
    {id: 4, group: 'À domicile', checked: false},
    {id: 5, group: 'Centre communautaire', checked: false},
    {id: 6, group: 'Centre d\'achat', checked: false}
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
      {value: 0, legend: 'Aucun effort'},
      {value: 1, legend: 'Très très facile'},
      {value: 2, legend: 'Très facile'},
      {value: 3, legend: 'Facile'},
      {value: 4, legend: 'Effort modéré'},
      {value: 5, legend: 'Moyen'},
      {value: 6, legend: 'Un peu dur'},
      {value: 7, legend: 'Dur'},
      {value: 8, legend: 'Très dur'},
      {value: 9, legend: 'Très très dur'},
      {value: 10, legend: 'Maximal'}
    ]
  };

  private precautionsObjctif1: string[] = [
    'Faire un échauffement long(5 minutes).',
    'Faire un retour au calme long(5 minutes).',
    'Commencer à faible intensité lors des températures froides.',
    'Avoir sa nitroglycérine sur soi lors des périodes d\'activité physique (près du corps, ne doit pas gelée).',
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
    'S\'inscrire à un groupe de conditionnement ou de marche.',
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

  groupOptionEndroitsObj2 = [{
    id: 1, group: 'Espaces plein air', checked: false, options: [
      {id: 1, group: 'Pistes cyclables', checked: false},
      {id: 2, group: 'Parcs', checked: false},
      {id: 3, group: 'Sentiers pédestres', checked: false}]
  },
    {
      id: 2, group: 'Centre d\'entrainement', checked: false, options: [
        {id: 1, group: 'Tapis roulant', checked: false},
        {id: 2, group: 'Vélo stationnaire', checked: false},
        {id: 3, group: 'Elliptique', checked: false},
        {id: 4, group: 'Escaladeur', checked: false},
        {id: 5, group: 'Rameur', checked: false}]
    },
    {
      id: 3, group: 'Au travail', checked: false, options: [
        {id: 1, group: 'Utiliser les escaliers', checked: false},
        {id: 2, group: 'Se stationner plus loin', checked: false},
        {id: 3, group: 'Prendre une marche sur l’heure de la pause dîner', checked: false}]
    },
    {id: 4, group: 'À domicile', checked: false},
    {id: 5, group: 'Centre communautaire', checked: false},
    {id: 6, group: 'Centre d\'achat', checked: false}
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
      {value: 0, legend: 'Aucun effort'},
      {value: 1, legend: 'Très très facile'},
      {value: 2, legend: 'Très facile'},
      {value: 3, legend: 'Facile'},
      {value: 4, legend: 'Effort modéré'},
      {value: 5, legend: 'Moyen'},
      {value: 6, legend: 'Un peu dur'},
      {value: 7, legend: 'Dur'},
      {value: 8, legend: 'Très dur'},
      {value: 9, legend: 'Très très dur'},
      {value: 10, legend: 'Maximal'}
    ]
  };

  private precautionsObjctif2: string[] = [
    'Faire un échauffement long(5 minutes).',
    'Faire un retour au calme long(5 minutes).',
    'Commencer à faible intensité lors des températures froides.',
    'Avoir sa nitroglycérine sur soi lors des périodes d\'activité physique (prèsducorps, ne doit pas gelée).',
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
    'S\'équiper d\'équipement pour bouger confortablement (chaussures confortables, pantalon et chandail de sport).',
    'Mettre une alarme sur le cellulaire au autre appareil afin de se lever aux 30 minutes ou aux heures pour couper les périodes assises.',
    'Avoir un maximum d\'heures par jour consacré à des activités de loisirs assises (télévision, ordinateur/tablette, lecture, jeux, etc.).',
    'Ajouter une marche de loisir à un moment opportun de votre journée.'
  ];
  moyensObjctif3OptionsCheckbox = [];
  precautionsObjctif3OptionsSelect = [];

  objectif: Array<ObjectifModel> = new Array();

  message: string;
  subscription: Subscription;

  constructor(private patientService: PatientService, @Optional() protected windowRef: NbWindowRef,
              private data: PatientDataBetweenComponentsService,
              private toastrService: NbToastrService) {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);



    // tslint:disable-next-line:forin
    for (const i in this.moyensObjctif1) {
      this.moyensObjctif1OptionsCheckbox.push({name: this.moyensObjctif1[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.freqObjctif1) {
      this.freqObjctif1OptionsSelect.push({name: this.freqObjctif1[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.momentsObjctif1) {
      this.momentsObjctif1OptionsSelect.push({name: this.momentsObjctif1[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.precautionsObjctif1) {
      this.precautionsObjctif1OptionsSelect.push({name: this.precautionsObjctif1[i], value: i, checked: false});
    }

    // ********************

    // tslint:disable-next-line:forin
    for (const i in this.moyensObjctif2) {
      this.moyensObjctif2OptionsCheckbox.push({name: this.moyensObjctif2[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.freqObjctif2) {
      this.freqObjctif2OptionsSelect.push({name: this.freqObjctif2[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.momentsObjctif2) {
      this.momentsObjctif2OptionsSelect.push({name: this.momentsObjctif2[i], value: i, checked: false});
    }

    // tslint:disable-next-line:forin
    for (const i in this.precautionsObjctif2) {
      this.precautionsObjctif2OptionsSelect.push({name: this.precautionsObjctif2[i], value: i, checked: false});
    }
// *******************
    // tslint:disable-next-line:forin
    for (const i in this.moyensObjctif3) {
      this.moyensObjctif3OptionsCheckbox.push({name: this.moyensObjctif3[i], value: i, checked: false});
    }

  }

  ngOnInit() {
  }

  updateCheckedOptionsMoyensObj1(option, event) {
    // tslint:disable-next-line:max-line-length
    this.moyensObjctif1OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif1OptionsCheckbox.find(element => element.value === option.value).checked === false));
  }

  updateCheckedSelectFreqObj1(option) {
    this.freqObj1 = option;
  }

  updateCheckedOptionsMomentsObj1(option, event) {
    // tslint:disable-next-line:max-line-length
    this.momentsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.momentsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
  }

  updateCheckedOptionsPrecautionsObj1(option, event) {
    // tslint:disable-next-line:max-line-length
    this.precautionsObjctif1OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif1OptionsSelect.find(element => element.value === option.value).checked === false));
  }

  updateCheckedOptionsMoyensObj2(option, event) {
    // tslint:disable-next-line:max-line-length
    this.moyensObjctif2OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif2OptionsCheckbox.find(element => element.value === option.value).checked === false));
  }

  updateCheckedSelectFreqObj2(option) {
    this.freqObj2 = option;
  }

  updateCheckedOptionsMomentsObj2(option, event) {
    // tslint:disable-next-line:max-line-length
    this.momentsObjctif2OptionsSelect.find(element => element.value === option.value).checked = ((this.momentsObjctif2OptionsSelect.find(element => element.value === option.value).checked === false));
  }

  updateCheckedOptionsPrecautionsObj2(option, event) {
    // tslint:disable-next-line:max-line-length
    this.precautionsObjctif2OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif2OptionsSelect.find(element => element.value === option.value).checked === false));
  }

  // ************************
  updateCheckedOptionsMoyensObj3(option, event) {
    // tslint:disable-next-line:max-line-length
    this.moyensObjctif3OptionsCheckbox.find(element => element.value === option.value).checked = ((this.moyensObjctif3OptionsCheckbox.find(element => element.value === option.value).checked === false));
  }

  updateCheckedOptionsPrecautionsObj3(option, event) {
    // tslint:disable-next-line:max-line-length
    this.precautionsObjctif3OptionsSelect.find(element => element.value === option.value).checked = ((this.precautionsObjctif3OptionsSelect.find(element => element.value === option.value).checked === false));
  }

  // ---------------------------------------------------------------------------------------------------------------------
  SaveObjectifs() {

    this.parametres.push(new Parametre('Augmenter le nombre de pas quotidien de', this.value1Obj1));
    this.parametres.push(new Parametre('Atteindre un total de pas quotidien de', this.value2Obj1));
    this.objectif.push(new ObjectifModel(new Objectif('Nombre de pas quotidien', this.parametres),
      this.moyensObjctif1OptionsCheckbox,
      new Recommandation(
        this.freqObj2,
        JSON.stringify(this.groupOptionEndroitsObj1),
        this.momentsObjctif1OptionsSelect,
        new Intensite(
          this.IntensiteOptionsObjectif1Value,
          this.IntensiteOptionsObjectif1.stepsArray.find(element => element.value === this.IntensiteOptionsObjectif1Value).legend)),
      this.precautionsObjctif1OptionsSelect,null, null));

    this.parametres2.push(new Parametre('Augmenter le nombre de minutes actives quotidiennes de', this.value1Obj2));
    this.parametres2.push(new Parametre('Atteindre un nombre de minutes actives quotidiennes totales de', this.value2Obj2));
    this.objectif.push(new ObjectifModel(new Objectif('Minutes quotidiennes actives', this.parametres2),
      this.moyensObjctif2OptionsCheckbox,
      new Recommandation(
        this.freqObj1,
        JSON.stringify(this.groupOptionEndroitsObj2),
        this.momentsObjctif2OptionsSelect,
        new Intensite(
          this.IntensiteOptionsObjectif2Value,
          this.IntensiteOptionsObjectif2.stepsArray.find(element => element.value === this.IntensiteOptionsObjectif2Value).legend)),
      this.precautionsObjctif2OptionsSelect,null, null));


    this.parametres3.push(new Parametre('Diminuer le nombre de minutes sédentaires de', this.value1Obj3));
    this.parametres3.push(new Parametre('Viser un maximum de minutes consécutives sédentaires de', this.value2Obj3));
    this.objectif.push(new ObjectifModel(new Objectif('Temps sédentaire', this.parametres3),
      this.moyensObjctif3OptionsCheckbox,
      null,
      null, null, null));


    this.patient = new PatientDto(this.message, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null);
    const recomm = new RecommandationDto(null, this.patient, null, JSON.stringify(this.objectif), null, null, null);
    const request = new Request(recomm);
    this.patientService.addReco(request).subscribe(reponse => {
      this.windowRef.close();
      this.showToast('top-right', 'success', 'Succès', 'Objectif ajoute');
    }, error => {
      this.showToast('top-right', 'danger', 'Échec', 'Operation échouée');
    });
  }

  endroitCheckboxObjectiv1(id: number) {
    this.groupOptionEndroitsObj1.at(id - 1).checked = !this.groupOptionEndroitsObj1.at(id - 1).checked;
    if (this.groupOptionEndroitsObj1.at(id - 1).checked === false){
      this.groupOptionEndroitsObj1.at(id - 1).options.forEach(elm => {
        elm.checked = false;
      });
    }
  }

  endroitOptionObjectiv1(id: number, id2: number) {
    // tslint:disable-next-line:max-line-length
    this.groupOptionEndroitsObj1.at(id - 1).options.at(id2 - 1).checked = !this.groupOptionEndroitsObj1.at(id - 1).options.at(id2 - 1).checked;

  }

  endroitCheckboxObjectiv2(id: number) {
    this.groupOptionEndroitsObj2.at(id - 1).checked = !this.groupOptionEndroitsObj2.at(id - 1).checked;
    if (this.groupOptionEndroitsObj2.at(id - 1).checked === false){
      this.groupOptionEndroitsObj2.at(id - 1).options.forEach(elm => {
        elm.checked = false;
      });
    }

  }

  endroitOptionObjectiv2(id: number, id2: number) {
    // tslint:disable-next-line:max-line-length
    this.groupOptionEndroitsObj2.at(id - 1).options.at(id2 - 1).checked = !this.groupOptionEndroitsObj2.at(id - 1).options.at(id2 - 1).checked;
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      {position, status});
  }
}

import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SchedulerEvent} from '@progress/kendo-angular-scheduler';
import {displayDate, sampleData} from './events.utc';
import {MatDialog} from '@angular/material/dialog';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {PatientService} from '../../../../_services/patient.service';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {Response} from '../../../../dto';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {AntecedentsDto} from '../../../../dto/medicalfile/AntecedentsDto';
import {RecomandationComponent} from '../recomandation/recomandation.component';
import {Router} from '@angular/router';
import {BilanLipidiqueComponent} from '../bilan-lipidique/bilan-lipidique.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {HistoireSanteComponent} from '../histoire-sante/histoire-sante.component';
import {SociodemoComponent} from '../sociodemo/sociodemo.component';
import {MatTableDataSource} from '@angular/material/table';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {LipidProfileDto} from '../../../../dto/medicalfile/LipidProfileDto';
import {CardiovascularDto} from '../../../../dto/medicalfile/clinical_examination/cardiovascular/CardiovascularDto';
import {PatientDataBetweenComponentsService} from '../../../../_services/PatientDataBetweenComponentsService';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RecommandationDto} from '../../../../dto/RecommandationDto';
import {ObjectifReadComponent} from '../objectif-read/objectif-read.component';
import {
  ExamenCliniqueBilanLipidiqueReadComponent
} from '../examen-clinique-bilan-lipidique-read/examen-clinique-bilan-lipidique-read.component';
import {RapportVisuelComponent} from '../rapport-visuel/rapport-visuel.component';
import {NbWindowControlButtonsConfig, NbWindowService} from '@nebular/theme';
import {AffectpodometreComponent} from '../affectpodometre/affectpodometre.component';
import {PatientInfosComponent} from '../patient-infos/patient-infos.component';


export interface DialogDataReport {
  patient: PatientDto;
}

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit, OnDestroy, OnDestroy, OnChanges {
  @Input() id: string;
  @ViewChild(SociodemoComponent, {static: false}) child;
  @ViewChild(ObjectifReadComponent) objectifReadChild;
  @ViewChild(ExamenCliniqueBilanLipidiqueReadComponent) examenCliniqueBilanLipidiqueReadChild;
  @ViewChild(RapportVisuelComponent) rapportVisuelComponent;
  @ViewChild(PatientInfosComponent) patientInfosComponent;
  expanded = false;
  expandedpodo = false;
  expandedAnte = false;
  expandedExam = false;
  patient: PatientDto = null;
  medicalfile: MedicalFileDto = null;
  listAnte: MedicalFileHistoryDto[];
  bilanLipidique: LipidProfileDto = null;
  antecedents: AntecedentsDto[];
  clinicalExam: ClinicalExaminationDto = null;
  displayedColumns: string[] = ['antecedants', 'mois', 'aneee', 'type', 'traitement'];
  dataSource;
  socioDemo: SocioDemographicVariablesDto = null;
  cardiovascular: CardiovascularDto = null;
  public selectedDate: Date = displayDate;
  ant: any[];
  age = null;
  weight = null;
  imc = null;
  height = null;
  listVisites: AppointmentDto[] = null;
  lastVisite: AppointmentDto = null;
  tabIndex = 0;

  mySubscription: any;
  private modals;
  public events: SchedulerEvent[] = sampleData;

  private patients: PatientDto[];

  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  clinicalExamColumns = [this.customColumn, ...this.defaultColumns];

  recommendations: RecommandationDto[] = [];

  constructor(private patientService: PatientService, private windowService: NbWindowService,
              public dialog: MatDialog, public router: Router, private snackBar: MatSnackBar,
              private data: PatientDataBetweenComponentsService) {
    this.tabIndex = 1;
    this.dataSource = new MatTableDataSource(this.antecedents);


  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getOnePatient();
    this.tabIndex = 0;
    this.getRecommendations();
  }

  ngOnDestroy() {
    this.patient = null;
  }

  tabClick(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    this.getOnePatient();
    if (tab === 'Objectifs') {
      this.objectifReadChild.onChange();
    }
    if (tab === 'Examen clinique et bilan lipidique') {
      this.examenCliniqueBilanLipidiqueReadChild.onChangeClinicalExamination();
      this.examenCliniqueBilanLipidiqueReadChild.onChangeBilanLipidique();
    }
    if (tab === 'Rapport visuel') {
      this.rapportVisuelComponent.onChange();
    }
    if (tab === 'Informations du patient') {
      this.patientInfosComponent.init(this.patient);
    }
  }

  onOpen(expanded: boolean) {
    this.expanded = expanded;
  }

  onOpenPodo(expanded: boolean) {
    this.expandedpodo = expanded;
  }

  onOpenAnte(expanded: boolean) {
    this.expandedAnte = expanded;
  }

  onOpenExam(expanded: boolean) {
    this.expandedExam = expanded;
  }

  expan($event) {
    this.expandedExam = $event;
    this.expandedAnte = $event;
    this.expanded = $event;
    this.expandedpodo = $event;
  }

  receiveMessage($event) {
    this.expan($event);
  }

  printPage(patient: any) {
    this.patient = patient;
    window.print();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,

    });
  }

  lipdProfile(patient: PatientDto) {
    const dialogRef = this.dialog.open(BilanLipidiqueComponent, {
      data: {
        patient,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.openSnackBar(result,"Ok")
    });
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }

  public getOnePatient = () => {
    this.patientService.getPatient(this.id).subscribe(patient => {
      const response = patient as Response;
      this.patient = JSON.parse(JSON.stringify(response.object)) as PatientDto;
      this.medicalfile = this.patient.medicalFile as MedicalFileDto;
      this.socioDemo = JSON.parse(this.patient.socioDemographicVariables) as SocioDemographicVariablesDto;

      if (this.medicalfile.clinicalExamination.length > 0) {
        this.clinicalExam = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1];
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.weight;
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.weight;
        this.imc = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.imc;
        this.height = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.height;
      } else {
        this.weight = null;
        this.age = null;
        this.imc = null;
        this.height = null;
      }
      if (this.medicalfile.medicalFileHistory.length > 0) {
        this.listAnte = this.medicalfile.medicalFileHistory;
        for (let i = 0; i < this.listAnte.length; i++) {
          if (i === 0) {
            this.antecedents = [JSON.parse(this.listAnte[i].antecedents)];

          } else {
            this.antecedents.push(JSON.parse(this.listAnte[i].antecedents));
          }
        }
      } else {
        this.listAnte = null;

      }
      if (this.medicalfile.lipidProfiles.length > 0) {
        this.bilanLipidique = this.medicalfile.lipidProfiles[this.medicalfile.lipidProfiles.length - 1];
      } else {
        this.bilanLipidique = null;
      }
    });
  }

  public getAppointmentsPerPatientId(patient: PatientDto) {
    this.listVisites = patient.appointments as AppointmentDto[];
    this.lastVisite = this.listVisites[this.listVisites.length - 1];
  }

  report() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/report/${this.patient.id}`])
    );

    window.open(url, '_blank');
  }


  public getRecommendations = () => {
    this.patientService.getAllReco(this.id).subscribe(response => {
      const res = response as Response;
      this.recommendations = JSON.parse(JSON.stringify(res.object));
    });
  }

  podometre() {
    const component = AffectpodometreComponent;
    const title = 'Affecter/Récupérer un podometre';
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: true,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title  , buttons: buttonsConfig} );
  }
}




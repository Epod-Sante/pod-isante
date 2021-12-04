import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SchedulerEvent} from '@progress/kendo-angular-scheduler';
import {displayDate, sampleData} from './events.utc';
import {MatDialog} from '@angular/material/dialog';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {PatientService} from '../../../../_services/patient.service';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import { Response} from '../../../../dto';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {AntecedentsDto} from '../../../../dto/medicalfile/AntecedentsDto';
import {ModalService} from '../../../_modal';
import {RecomandationComponent} from '../recomandation/recomandation.component';
import { Router} from '@angular/router';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {RapportGlobalComponent} from '../rapport-global/rapport-global.component';


export interface DialogDataReport {
  patient: PatientDto;
}

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit, OnDestroy, OnDestroy, OnChanges{
  @Input() id: string;
  expanded = false;
  expandedpodo = false;
  expandedAnte = false;
  expandedExam = false;
  @ViewChild(SociodemoComponent, {static: false}) child;
  patient: PatientDto = null;
  medicalfile: MedicalFileDto = null;
  listAnte: MedicalFileHistoryDto[];
  bilanLipidique: LipidProfileDto = null;
  antecedents: AntecedentsDto[];
  clinicalExam: ClinicalExaminationDto = null;
  displayedColumns: string[] = ['antecedants', 'mois', 'aneee', 'type', 'traitement' ];
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
  defaultColumns = [ 'size', 'kind', 'items' ];
  clinicalExamColumns = [ this.customColumn, ...this.defaultColumns ];


  constructor(private  patientService: PatientService, private modalService: ModalService,
              public dialog: MatDialog, public router: Router, private snackBar: MatSnackBar,
              private data: PatientDataBetweenComponentsService) {
    this.tabIndex = 1;
    this.dataSource = new MatTableDataSource(this.antecedents);


  }

  ngOnInit() {
    console.log('2ngOnInit');

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2ngOnChanges');
    this.getOnePatient();
    this.tabIndex = 0;
  }

  ngOnDestroy() {
    this.patient = null;
    // this.receiveMessage(this.expanded)
  }

  mattab($event){
    this.getOnePatient();
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
  expan($event){
    console.log($event);
    this.expandedExam = $event;
    this.expandedAnte = $event;
    this.expanded = $event;
    this.expandedpodo = $event;
    console.log(this.expanded);
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

    }); }
  reco(patient: PatientDto){
    const dialogRef = this.dialog.open(RecomandationComponent, {
      data: {patient }
    });

  }
  add_antecedent(id: string){
    const dialogRef = this.dialog.open(HistoireSanteComponent, {
      data: {id }
    });
  }
  add_socio(id: string){
    const dialogRef = this.dialog.open(SociodemoComponent, {
      data: {id }
    });
  }
  lipdProfile(patient: PatientDto){
    const dialogRef = this.dialog.open(BilanLipidiqueComponent, {
      data: {patient,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.openSnackBar(result,"Ok")
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public getOnePatient = () => {
    // tslint:disable-next-line:prefer-const
    let patient: PatientDto;
    this.patientService.getPatient(this.id).subscribe(patients => {


      const socio = patients as Response;
      this.patient = JSON.parse(JSON.stringify(socio.object))as PatientDto;
      this.medicalfile = this.patient.medicalFile as MedicalFileDto;
      this.socioDemo = JSON.parse(this.patient.socioDemographicVariables) as SocioDemographicVariablesDto;

      if (this.medicalfile.clinicalExamination.length > 0)
      {
        this.clinicalExam = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1];
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.weight;
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.weight;
        this.imc = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.imc;
        this.height = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length - 1].anthropometry.height;
      }
      else{
        this.weight = null;
        this.age = null;
        this.imc = null;
        this.height = null;
      }
      if (this.medicalfile.medicalFileHistory.length > 0)
      {
        this.listAnte = this.medicalfile.medicalFileHistory;
        for (let i = 0; i < this.listAnte.length; i++){
          if (i === 0){
            this.antecedents = [JSON.parse(this.listAnte[i].antecedents)];

          }else{
            this.antecedents.push(JSON.parse(this.listAnte[i].antecedents)); }
        }
      }else{
        this.listAnte = null;

      }
      if (this.medicalfile.lipidProfiles.length > 0)
      {
        this.bilanLipidique = this.medicalfile.lipidProfiles[this.medicalfile.lipidProfiles.length - 1];



      }else{
        this.bilanLipidique = null;

      }
      // this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      // console.log(this.liste_antecedants[0].antecedents)


    });
    if (patient.appointments.length !== 0) {
      this.getAppointmentsPerPatientId(patient);
    }
  }

  public getAppointmentsPerPatientId(patient: PatientDto) {
      this.listVisites = patient.appointments as AppointmentDto[];
      this.lastVisite = this.listVisites[this.listVisites.length - 1];
  }


  public printPDF(): void {
    const DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      const title = 'Rapport global-' + this.patient.firstName + ' ' + this.patient.lastName;
      PDF.save(title);
    });
  }

  report(){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/report/${this.patient.id}`])
    );

    window.open(url, '_blank');
  }

}




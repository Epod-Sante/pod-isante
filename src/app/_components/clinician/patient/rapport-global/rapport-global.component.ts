import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {DialogDataReport} from '../patient-profile/patient-profile.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {ActivatedRoute, Router} from '@angular/router';
import {Request, Response} from '../../../../dto';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';
import {SocioDemographicVariablesDto} from '../../../../dto/medicalfile/SocioDemographicVariablesDto';
import {PatientService} from '../../../../_services/patient.service';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';
import {BREQValue, QuestionnaireBREQ} from '../../../../dto/QuestionnaireBREQ';
import {GPAQValue, QuestionnaireGPAQ} from '../../../../dto/QuestionnaireGPAQ';
import {PatientDeviceDto} from '../../../../dto/PatientDeviceDto';
import {DescStats} from '../../../../_models/DescStats';
import * as ss from 'simple-statistics';
import {MatTableDataSource} from '@angular/material/table';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {StepsDto} from '../../../../dto/medicalfile/StepsDto';
import {BaseChartDirective, Label, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartPluginsOptions, ChartType} from 'chart.js';
import {NbCalendarRange, NbDateService} from '@nebular/theme';
import {ActivitiesMinutesDto} from '../../../../dto/medicalfile/ActivitiesMinutesDto';
import {Step} from '../rapport-visuel/rapport-visuel.component';
import {ActivitiesStepsDto} from '../../../../dto/medicalfile/ActivitiesStepsDto';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-rapport-global',
  templateUrl: './rapport-global.component.html',
  styleUrls: ['./rapport-global.component.css']
})
export class RapportGlobalComponent implements OnInit, OnChanges {
  private barChar: ChartDataSets[];
  private vigoureux: number;
  private moderee: number;
  private marche: number;
  private sedentaire: number;
  response: Response;
  patient: PatientDto;
  private patientId: any;
  questionnaires: QuestionnaireDto[];
  questionnaireResponse: any;
  questionnaireObj = [];
  breqScore = [];
  gpaqScore = [];
  public val: Resultat [] = [];
  questionnaireBREQ: QuestionnaireBREQ[] = [];
  questionnaireGPAQ: QuestionnaireGPAQ[] = [];
  // *************

  stats: DescStats[] = [];
  public displayedColumns: string[] = [
    'Minutes',
    'Maximum',
    'Minimum',
    'Moyenne',
    'Mediane',
    'Variance',
    'sd'
  ];
  selectedItemGpaq = 0;
  selectedItemBreq = 0;
  selectedItemMin = 0;
  selectedItemSteps = 0;
  selectedItemPD = -1;
  public dataSource = new MatTableDataSource<DescStats>();
  minuHight: number;
  minuLow: number;
  sedentary: number;
  minuMedium: number;
  datesVisites = [];
  appointments: AppointmentDto[];
  stepsData: StepsDto [] = [];
  minutesData = [];
  public minutesPieChartData: SingleDataSet = [0, 0, 0, 0];
  minutesDate: string [] = [];
  listSedentary = [];
  listLowIntensity = [];
  listHighIntensity = [];
  listMediumIntensity = [];
  appointmentsDates = [];
  private questionnairesRV: QuestionnaireDto[];
  public gpaq: QuestionnaireGPAQ[] = [];
  public breq: QuestionnaireBREQ[] = [];
  public steps: Step[] = [];
  gpaqBarChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'value',
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public travailModereVigoureuxUI = 0;
  public travailMarcheUI = 0;
  public transportPiedUI = 0;
  public transportVeloUI = 0;
  public loisirsModereVigoureuxUI = 0;
  public loisirsMarcheUI = 0;


  public introjected = 0;
  public identified = 0;
  public intrinsic = 0;
  public amotivation = 0;
  public external = 0;

  public stepsBar: ChartDataSets [];
  public pieChart: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLabelsBreq: Label[] = [
    'Amotivation',
    'Identified',
    'Introjectée',
    'Extrinsèque',
    'Intrinsèque'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      labels: {
        render: 'value',
        fontColor: '#000',
        position: 'outside'
      }
    }
  };
  public pieChartLabels: string[] = ['Intensité faible',
    'Intensité  modérée',
    'Intensité élevée',
    'sedentaires'];
  stepsChartLabels: Label[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  range: NbCalendarRange<Date>;
  public initDate: string;
  public min: Date;
  date: Date;
  public u: any[];
  datesRange = [];
  loading = true;
  private start: Date;
  private end: Date;
  private start2: Date;
  private end2: Date;
  public minutesDto: ActivitiesMinutesDto;
  pd: PatientDeviceDto[];

  constructor(public route: ActivatedRoute, private patientService: PatientService, protected dateService: NbDateService<Date>) {

    this.route.params.subscribe(params => {
      this.patientId = params.id;
    });
    this.getOnePatient();
    this.getQuestionnaires();
    this.getRecommendations();

  }

  ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }


  ngOnInit(): void {

  }


  public getOnePatient = () => {
    this.patientService.getPatient(this.patientId).subscribe(patients => {
      const p = patients as Response;
      this.patient = JSON.parse(JSON.stringify(p.object))as PatientDto;
    });
  }

  public printPDF(): void {
    document.title = 'Rapport global-' + this.patient.firstName + ', ' + this.patient.lastName;
    window.print();
  }

  public getQuestionnaires = () => {
    this.patientService.getQuiz(this.patientId).subscribe(questionnaires => {
      this.questionnaireResponse = questionnaires;
      this.response = JSON.parse(JSON.stringify(questionnaires)) as Response;
      this.questionnaireObj = this.response.object as [];
      this.questionnaires = this.response.object as QuestionnaireDto[];
      this.questionnaires.forEach(elm => {
        if (elm.type === 'GPAQ') {
          const value = JSON.parse(elm.value) as GPAQValue;
          this.questionnaireGPAQ.push(new QuestionnaireGPAQ(elm.id, elm.patientId, elm.type, value, elm.date));
        }
        if (elm.type === 'BREQ') {
          const value = JSON.parse(elm.value) as BREQValue;
          this.questionnaireBREQ.push(new QuestionnaireBREQ(elm.id, elm.patientId, elm.type, value, elm.date));
        }}
      );

      this.onChange();
      this.gpaqCalcule();
      this.gpaqBarChart();
      this.breqPieChart();

    });

  }


  public getQuiz = () => {
    this.patientService.getQuiz(this.patient.id).subscribe(quiz => {
      const response = JSON.parse(JSON.stringify(quiz)) as Response;
      const questionnaires = response.object as QuestionnaireDto[];

      for (const x of questionnaires) {
        const valeur = JSON.parse(x.value);
        if (x.type === 'GPAQ') {
          for (let i = 0; i < valeur.reponses.length; i++) {
            if ((valeur.reponses[i].hr === null || valeur.reponses[i].hr === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].hr = 0;
            }
            if ((valeur.reponses[i].minu === null || valeur.reponses[i].minu === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].minu = 0;
            }
            if ((valeur.reponses[i].jr === null || valeur.reponses[i].jr === undefined) && x.type === 'GPAQ') {
              valeur.reponses[i].jr = 0;
            }
          }
          /*  Vigoureux = (rép Q2xrép Q3) + (rép Q14xrép Q15) en minutes

      Modérée = (rép Q5xrép Q6) + (rép Q11xrép Q12) + (rép Q17xrép Q18) en minutes

      Marche = (rép Q20xrép Q21) + (rép Q8xrép Q9) en minutes

      Sédentaire = rép Q22 en minutes*/
        }

        this.val.push({date: x.date, value: valeur, id: x.id, type: x.type});

      }
    });
  }

  public show_barChart(valeur: string) {
    this.barChar = [];
    this.vigoureux = 0;
    this.moderee = 0;
    this.marche = 0;
    this.sedentaire = 0;
    const x = JSON.parse(JSON.stringify(valeur));
    this.vigoureux = (x.reponses[1].jr * (x.reponses[2].hr * 60 + x.reponses[2].minu)) +
      (x.reponses[13].jr * (x.reponses[14].hr * 60 + x.reponses[14].minu));
    this.moderee = (x.reponses[4].jr * (x.reponses[5].hr * 60 + x.reponses[5].minu)) +
      (x.reponses[10].jr * (x.reponses[11].hr * 60 + x.reponses[11].minu)) +
      (x.reponses[16].jr * (x.reponses[17].hr * 60 + x.reponses[17].minu));
    this.marche = (x.reponses[19].jr * (x.reponses[20].hr * 60 + x.reponses[20].minu)) +
      (x.reponses[7].jr * (x.reponses[8].hr * 60 + x.reponses[8].minu));
    this.sedentaire = (x.reponses[22].hr * 60 + x.reponses[22].minu);
    this.barChar = [
      {data: [this.vigoureux, 0], label: 'Vigoureux '},
      {data: [this.moderee, 0], label: 'Modérée'},
      {data: [this.marche, 0], label: 'Marche'},
      {data: [this.sedentaire, 0], label: 'Sédentaire'}
    ];
    return this.barChar;
  }

  public getRecommendations = () => {
    this.patientService.getAllReco(this.patientId).subscribe(response => {

    });
  }

  onChangePD() {
    this.stepsBarChart(new Date(this.pd.at(this.selectedItemPD).initDate), new Date(this.pd.at(this.selectedItemPD).returnedAt));
    this.minutesCalcule();

  }


  private stepsBarChart(start: Date, end: Date) {
    this.start = start;
    this.end = end;
    this.start2 = new Date(start.toISOString().slice(0, 10));
    this.end2 = new Date(end.toISOString().slice(0, 10));
    this.start.setHours(0, 0, 0, 0);
    this.end.setHours(0, 0, 0, 0);
    this.start2.setHours(0, 0, 0, 0);
    this.end2.setHours(0, 0, 0, 0);
    this.stepsBar = [];
    this.stepsChartLabels = [];
    this.stepsChartLabels.length = 0;
    this.u = [];
    this.datesRange = [];
    if (this.steps.length > 0) {
      this.steps.forEach(elm => {
        const d = new Date(elm.date);
        d.setHours(0, 0, 0, 0);
        if (elm.steps > 0 && this.start2 <= d && this.end2 >= d) {
          this.datesRange.push(elm);
        }
      });
    }
    if (this.datesRange.length > 0) {
      this.datesRange.sort((a, b) => {
        const c = new Date(a.date).getTime();
        const d = new Date(b.date).getTime();
        return c - d;
      });

      this.datesRange.forEach(item => {
        this.u.push(item.steps);
        this.stepsChartLabels.push(item.date);
      });
      this.loading = false;
    } else {
      this.u = [];
      this.stepsChartLabels = [];
      this.loading = true;
    }

    if (this.u.length > 0) {
      this.stepsBar.push({data: this.u, label: 'Nombre de pas par jour'});
    } else {
      this.stepsBar = [];
    }
  }


  minutesCalcule(){
    this.listSedentary = [];
    this.listHighIntensity = [];
    this.listMediumIntensity = [];
    this.listLowIntensity = [];
    this.stats = [];
    this.minutesPieChartData = [0, 0, 0, 0];
    this.minutesDto.minutesDtoMap.forEach(elm => {
      const d = new Date(elm.date);
      d.setHours(0, 0, 0, 0);
      if (this.start.getTime() <= d.getTime() && this.end.getTime() >= d.getTime()) {
        this.listSedentary.push(elm.sedentary);
        this.listHighIntensity.push(elm.very_active);
        this.listMediumIntensity.push(elm.fairly_active);
        this.listLowIntensity.push(elm.lightly_active);
        this.stats = [
          // tslint:disable-next-line:max-line-length
          new DescStats('Intensité faible', +ss.max(this.listLowIntensity).toFixed(2), +ss.min(this.listLowIntensity).toFixed(2), +ss.average(this.listLowIntensity).toFixed(2), +ss.median(this.listLowIntensity).toFixed(2), +ss.variance(this.listLowIntensity).toFixed(2), +ss.standardDeviation(this.listLowIntensity).toFixed(2)),
          // tslint:disable-next-line:max-line-length
          new DescStats('Intensité modérée', +ss.max(this.listMediumIntensity).toFixed(2), +ss.min(this.listMediumIntensity).toFixed(2), +ss.average(this.listMediumIntensity).toFixed(2), +ss.median(this.listMediumIntensity).toFixed(2), +ss.variance(this.listMediumIntensity).toFixed(2), +ss.standardDeviation(this.listMediumIntensity).toFixed(2)),
          // tslint:disable-next-line:max-line-length
          new DescStats('Intensité elevée', +ss.max(this.listHighIntensity).toFixed(2), +ss.min(this.listHighIntensity).toFixed(2), +ss.average(this.listHighIntensity).toFixed(2), +ss.median(this.listHighIntensity).toFixed(2), +ss.variance(this.listHighIntensity).toFixed(2), +ss.standardDeviation(this.listHighIntensity).toFixed(2)),
          // tslint:disable-next-line:max-line-length
          new DescStats('Sedentaires', +ss.max(this.listSedentary).toFixed(2), +ss.min(this.listSedentary).toFixed(2), +ss.average(this.listSedentary).toFixed(2), +ss.median(this.listSedentary).toFixed(2), +ss.variance(this.listSedentary).toFixed(2), +ss.standardDeviation(this.listSedentary).toFixed(2))
        ];
        this.dataSource.data = this.stats;
      }

    });

    this.minutesPieChartData = [
      ss.sum(this.listLowIntensity),
      ss.sum(this.listMediumIntensity),
      ss.sum(this.listHighIntensity),
      ss.sum(this.listSedentary)
    ];
  }

  handleRangeChange($event: NbCalendarRange<Date>) {
    if ($event.end !== undefined) {
      this.stepsBarChart($event.start, $event.end);
      this.minutesCalcule();
    }
  }

  onChange() {
    this.pd = [];
    this.selectedItemPD = -1;
    this.appointmentsDates = [];
    this.minutesData = [];
    this.gpaq = [];
    this.breq = [];
    this.stats = [];
    this.steps = [];
    this.stepsChartLabels = [];
    this.u = [];
    this.datesRange = [];
    this.loading = false;
    this.getAppointments();

  }

  public getAppointments = () => {
    this.patientService.getRdv(this.patientId).subscribe(patients => {
      patients = patients as Request;
      if (patients != null) {
        this.appointments = JSON.parse(JSON.stringify(patients)).object as AppointmentDto[];
        if (this.appointments.length > 0) {
          this.appointments.forEach(appointment => {
            this.appointmentsDates.push(Date.parse(appointment.appointmentDate.toString()));
          });
        }

        this.getSteps();
        this.getMinutes();
        this.getPatientDevices();

      }
    });
    return this.appointmentsDates;
  }


  public getSteps = () => {
    this.patientService.getSteps(this.patient.medicalFile.patient).subscribe(response => {
      const req = JSON.parse(JSON.stringify(response)) as Request;
      const object = req.object;

      if (object != null) {
        const stepsDto = object as ActivitiesStepsDto;
        this.initDate = stepsDto.initDate;
        this.min = this.dateService.addDay(new Date(this.initDate), 1);
        if (stepsDto.stepsDtoMap.length > 0) {
          stepsDto.stepsDtoMap.forEach(item => {
            this.steps.push(new Step(new Date(item.date).toISOString().slice(0, 10), item.steps));
          });
          this.loading = true;
        }
      }
    });
  }

  public getPatientDevices = () => {
    this.patientService.getPatientDevices(this.patient.medicalFile.patient).subscribe(response => {
      const req = JSON.parse(JSON.stringify(response)) as Request;
      const object = req.object;

      if (object !== null){
        this.pd = object as PatientDeviceDto[];

        this.pd.forEach(item => {
          item.initDateString = new Date(item.initDate).toISOString().substring(0, 10);
          if (item.returnedAt !== null){
            item.returnedAtString = new Date(item.returnedAt).toISOString().substring(0, 10);
          } else {
            item.returnedAtString = '/';
          }
        });
      }

    }, error => {

    });
  }

  public getMinutes = () => {
    this.patientService.getMinutes(this.patient.medicalFile.patient).subscribe(response => {
      const req = JSON.parse(JSON.stringify(response)) as Request;
      const object = req.object;
      // console.log(JSON.stringify(minutesDto));

      if (object != null) {
        this.minutesDto = object as ActivitiesMinutesDto;

      }
      // this.minPieChart();
    }, error => {

    });
  }


  public gpaqBarChart() {
    this.barChar = [];
    this.vigoureux = 0;
    this.moderee = 0;
    this.marche = 0;
    this.sedentaire = 0;
    if (this.gpaq.length > 0){
      this.vigoureux = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr) *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu)) +
        ((this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr) *
          ((this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr *
              60 )+
            (this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu)));
      this.moderee = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr) *
          ((this.gpaq.at(this.selectedItemGpaq).value.reponses[5].hr *
              60) +
            (this.gpaq.at(this.selectedItemGpaq).value.reponses[5].minu))) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[10].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[11].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[11].minu)) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[16].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[17].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[17].minu));
      this.marche = (this.gpaq.at(this.selectedItemGpaq).value.reponses[19].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[20].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[20].minu)) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[7].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[8].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[8].minu));
      this.sedentaire = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[22].hr *
          60 )+
        this.gpaq.at(this.selectedItemGpaq).value.reponses[22].minu);
      this.barChar = [
        {data: [this.vigoureux, 0], label: 'Vigoureux'},
        {data: [this.moderee, 0], label: 'Modérée'},
        {data: [this.marche, 0], label: 'Marche'},
        {data: [this.sedentaire, 0], label: 'Sédentaire'}
      ];
    }
  }

  gpaqCalcule() {
    if (this.gpaq.length > 0){
      this.travailModereVigoureuxUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[5].hr * 60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[5].minu) *
          this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr * 60 +
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu) *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr));
      this.transportPiedUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[8].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[8].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[7].jr));
      this.transportVeloUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[11].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[11].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[10].jr));
      this.loisirsModereVigoureuxUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[17].hr * 60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[17].minu) *
          this.gpaq.at(this.selectedItemGpaq).value.reponses[16].jr) +
        ((this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr * 60) +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu) *
        this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr;
      this.loisirsMarcheUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[20].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[20].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[19].jr));

    }
  }

  breqPieChart() {
    this.intrinsic = this.breq.at(this.selectedItemBreq).value.score.intrinsic;
    this.external = this.breq.at(this.selectedItemBreq).value.score.external;
    this.amotivation = this.breq.at(this.selectedItemBreq).value.score.amotivation;
    this.identified = this.breq.at(this.selectedItemBreq).value.score.identified;
    this.introjected = this.breq.at(this.selectedItemBreq).value.score.introjected;
    this.pieChart = [
      parseFloat(this.amotivation.toFixed(2)),
      parseFloat(this.identified.toFixed(2)),
      parseFloat(this.introjected.toFixed(2)),
      parseFloat(this.external.toFixed(2)),
      parseFloat(this.intrinsic.toFixed(2))
    ];
  }
}



export interface Resultat {
  date: string;
  value: object;
  id: string;
  type: string;
}

import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DescStats} from '../../../../_models/DescStats';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {MatTableDataSource} from '@angular/material/table';
import {Request} from '../../../../dto';
import * as ss from 'simple-statistics';
import {PatientService} from '../../../../_services/patient.service';
import {DatePipe} from '@angular/common';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {BaseChartDirective, Label, SingleDataSet} from 'ng2-charts';
import {GPAQValue, QuestionnaireGPAQ} from '../../../../dto/QuestionnaireGPAQ';
import {ChartData, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BREQValue, QuestionnaireBREQ} from '../../../../dto/QuestionnaireBREQ';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';

@Component({
  selector: 'app-rapport-visuel',
  templateUrl: './rapport-visuel.component.html',
  styleUrls: ['./rapport-visuel.component.css']
})
export class RapportVisuelComponent implements OnInit, OnChanges {
  @Input() patient: PatientDto;
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
  public dataSource = new MatTableDataSource<DescStats>();
  minuHight: number;
  minuLow: number;
  sedentary: number;
  minuMedium: number;
  datesVisites = [];
  appointments: AppointmentDto[];
  stepsData: Steps [] = [];
  minutesData: Minutes [];
  public minutesPieChartData: SingleDataSet = [0, 0, 0, 0];
  minutesDate: string [] = [];
  listSedentary = [];
  listLowIntensity = [];
  listHighIntensity = [];
  listMediumIntensity = [];
  appointmentsDates = [];
  private questionnaires: QuestionnaireDto[];
  public gpaq: QuestionnaireGPAQ[] = [];
  public breq: QuestionnaireBREQ[] = [];
  public steps: Step[] = [];
  gpaqBarChartOptions: ChartOptions = {
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{}]},
  };
  public barChartType: ChartType = 'bar';

  public travailModereVigoureuxUI = 0;
  public travailMarcheUI = 0;
  public transportPiedUI = 0;
  public transportVeloUI = 0;
  public loisirsModereVigoureuxUI = 0;
  public loisirsMarcheUI = 0;

  public vigoureux = 0;
  public moderee = 0;
  public marche = 0;
  public sedentaire = 0;

  public introjected = 0;
  public identified = 0;
  public intrinsic = 0;
  public amotivation = 0;
  public external = 0;

  public barChar: ChartDataSets [];
  public stepsBar: ChartDataSets [];
  public pieChart: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLabelsBreq: Label[] = ['Extrinsèque',
    'Introjectée',
    'Identified',
    'Intrinsic',
    'Amotivation'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Intensité faible',
    'Intensité  modérée',
    'Intensité élevée',
    'sedentaires'];
  stepsChartLabels: Label[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private patientService: PatientService, public datePipe: DatePipe) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  onChange() {
    console.log('onChange');
    this.appointmentsDates = [];
    this.minutesData = [];
    this.gpaq = [];
    this.breq = [];
    this.stats = [];
    this.steps = [];
    this.getAppointments();
    this.getQuestionnaires();

  }

  public getAppointments = () => {
    this.patientService.getRdv(this.patient.id).subscribe(patients => {
      patients = patients as Request;
      if (patients != null) {
        this.appointments = JSON.parse(JSON.stringify(patients)).object as AppointmentDto[];
        if (this.appointments.length > 0) {
          this.appointments.forEach(appointment => {
            this.appointmentsDates.push(Date.parse(appointment.appointmentDate.toString()));
          });
        }

        this.getMinutes(this.appointmentsDates);
        this.getSteps(this.appointmentsDates);
      }
    });
    return this.appointmentsDates;
  }

  public getSteps = (dates: AppointmentDto[]) => {
    const request = new Request(dates);
    this.patientService.getSteps(this.patient.medicalFile.patient, request).subscribe(response => {
      const req = JSON.parse(JSON.stringify(response)) as Request;
      const object = req.object;

      if (object != null) {
        // tslint:disable-next-line:forin
        for (const x in req.object) {
          if (req.object[x].length > 0) {
            const s = req.object[x] as Steps[];
            this.steps.push(new Step(x, s));
          }
        }
      }
      this.stepsBarChart();
    });
  }

  public getMinutes = (dates: AppointmentDto[]) => {
    const request = new Request(dates);
    this.patientService.getMinutes(this.patient.medicalFile.patient, request).subscribe(response => {
      const req = JSON.parse(JSON.stringify(response)) as Request;
      const object = req.object;

      if (object != null) {
        // tslint:disable-next-line:forin
        for (const x in req.object) {
          if (req.object[x].length > 0) {
            for (const i of req.object[x]) {
              const min = i as Minutes;
              min.appointment = x;
              const date = new Date(x);
              this.listSedentary.push(i.sedentary);
              this.listHighIntensity.push(i.very_active);
              this.listMediumIntensity.push(i.fairly_active);
              this.listLowIntensity.push(i.lightly_active);
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
              if (this.minutesData.length === 0) {
                this.minutesData.push(min);
              } else {
                let b: boolean;
                this.minutesData.forEach(elm => {
                  if (elm.appointment.toString() === min.appointment.toString()) {
                    b = true;
                  }
                });
                for (const m of this.minutesData) {
                  if (b) {
                    if (m.appointment.toString() === min.appointment.toString()) {
                      m.sedentary += min.sedentary;
                      m.fairly_active += min.fairly_active;
                      m.lightly_active += min.lightly_active;
                      m.very_active += min.very_active;
                    }
                  } else {
                    this.minutesData.push(min);
                    break;
                  }
                }
              }
            }
          }
        }
      }
      this.minPieChart();
    }, error => {

    });
  }

  public getQuestionnaires = () => {
    this.patientService.getQuiz(this.patient.id).subscribe(response => {
      const res = JSON.parse(JSON.stringify(response));
      this.questionnaires = res.object;

      for (const x of this.questionnaires) {
        if (x.type === 'GPAQ') {
          const value = JSON.parse(x.value) as GPAQValue;
          this.gpaq.push(new QuestionnaireGPAQ(x.id, x.patientId, x.type, value, x.date));
        }
        if (x.type === 'BREQ') {
          const value = JSON.parse(x.value) as BREQValue;
          this.breq.push(new QuestionnaireBREQ(x.id, x.patientId, x.type, value, x.date));
        }
      }

      this.gpaqCalcule();
      this.gpaqBarChart();
      this.breqPieChart();
    });

  }

  gpaqOnChange(i: number) {
    if (this.selectedItemGpaq !== i) {
      this.selectedItemGpaq = i;
      this.gpaqCalcule();
      this.gpaqBarChart();
    }
  }

  minutesOnChange(i: number) {
    if (this.selectedItemMin !== i) {
      this.selectedItemMin = i;
      this.minPieChart();
    }
  }

  breqOnChange(i: number) {
    if (this.selectedItemBreq !== i) {
      this.selectedItemBreq = i;
      this.breqPieChart();
    }
  }

  stepsOnChange(i: number) {
    if (this.selectedItemSteps !== i) {
      this.selectedItemSteps = i;
      this.stepsBarChart();
    }
  }

  gpaqCalcule() {
    this.travailModereVigoureuxUI = (this.gpaq.at(this.selectedItemGpaq).value.reponses[5].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[5].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr +
      (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr;
    this.transportPiedUI = (this.gpaq.at(this.selectedItemGpaq).value.reponses[8].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[8].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[7].jr;
    this.transportVeloUI = (this.gpaq.at(this.selectedItemGpaq).value.reponses[11].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[11].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[10].jr;
    this.loisirsModereVigoureuxUI = (this.gpaq.at(this.selectedItemGpaq).value.reponses[17].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[17].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[16].jr +
      (this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr;
    this.loisirsMarcheUI = (this.gpaq.at(this.selectedItemGpaq).value.reponses[20].hr * 60 +
        this.gpaq.at(this.selectedItemGpaq).value.reponses[20].minu) *
      this.gpaq.at(this.selectedItemGpaq).value.reponses[19].jr;
  }

  breqPieChart() {
    this.intrinsic = this.breq.at(this.selectedItemBreq).value.score.intrinsic;
    this.external = this.breq.at(this.selectedItemBreq).value.score.external;
    this.amotivation = this.breq.at(this.selectedItemBreq).value.score.amotivation;
    this.identified = this.breq.at(this.selectedItemBreq).value.score.identified;
    this.introjected = this.breq.at(this.selectedItemBreq).value.score.introjected;
    this.pieChart = [this.intrinsic, this.external, this.amotivation, this.identified, this.introjected];
  }

  public gpaqBarChart() {
    this.barChar = [];
    this.vigoureux = 0;
    this.moderee = 0;
    this.marche = 0;
    this.sedentaire = 0;
    this.vigoureux = (this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr *
          60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu)) +
      (this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr *
          60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu));
    this.moderee = (this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[5].hr *
          60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[5].minu)) +
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
    this.sedentaire = (this.gpaq.at(this.selectedItemGpaq).value.reponses[22].hr *
      60 +
      this.gpaq.at(this.selectedItemGpaq).value.reponses[22].minu);
    this.barChar = [
      {data: [this.vigoureux, 0], label: 'Vigoureux'},
      {data: [this.moderee, 0], label: 'Modérée'},
      {data: [this.marche, 0], label: 'Marche'},
      {data: [this.sedentaire, 0], label: 'Sédentaire'}
    ];
  }


  private minPieChart() {
    this.sedentary = this.minutesData.at(this.selectedItemMin).sedentary;
    this.minuHight = this.minutesData.at(this.selectedItemMin).very_active;
    this.minuMedium = this.minutesData.at(this.selectedItemMin).fairly_active;
    this.minuLow = this.minutesData.at(this.selectedItemMin).lightly_active;
    this.minutesPieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
  }

  private stepsBarChart() {
    this.stepsBar = [];
    this.stepsChartLabels = [];
    this.stepsChartLabels.length = 0;
    const u = [];
    this.steps.at(this.selectedItemSteps).steps.forEach(elm => {
      if (elm.steps > 0) {
        u.push(elm.steps);
        this.stepsChartLabels.push(new Date(elm.date).toLocaleDateString());
      }
    });
    if (u.length > 0) {
      this.stepsBar.push({data: u, label: 'Nombre de pas par jour'});
    }
  }
}

export class Steps {
  date: number;
  medicalFileId: string;
  steps: number;

  constructor(date: number, medicalFileId: string, steps: number) {
    this.date = date;
    this.medicalFileId = medicalFileId;
    this.steps = steps;
  }
}

export class Minutes {
  date: number;
  medicalFileId: string;
  sedentary: number;
  lightly_active: number;
  fairly_active: number;
  very_active: number;
  appointment: string;

  // tslint:disable-next-line:max-line-length
  constructor(date: number, medicalFileId: string, sedentary: number, lightly_active: number, fairly_active: number, very_active: number, appointment: string) {
    this.date = date;
    this.medicalFileId = medicalFileId;
    this.sedentary = sedentary;
    this.lightly_active = lightly_active;
    this.fairly_active = fairly_active;
    this.very_active = very_active;
    this.appointment = appointment;
  }
}

export class Step {
  date: string;
  steps: Steps[];

  constructor(date: string, steps: Steps[]) {
    this.date = date;
    this.steps = steps;
  }
}



import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BREQValue, QuestionnaireBREQ} from '../../../../dto/QuestionnaireBREQ';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';
import {NbCalendarRange, NbDateService} from '@nebular/theme';
import {StepsDto} from 'src/app/dto/medicalfile/StepsDto';
import {ActivitiesStepsDto} from '../../../../dto/medicalfile/ActivitiesStepsDto';
import {ActivitiesMinutesDto} from '../../../../dto/medicalfile/ActivitiesMinutesDto';
import {PatientDeviceDto} from '../../../../dto/PatientDeviceDto';

@Component({
  selector: 'app-rapport-visuel',
  templateUrl: './rapport-visuel.component.html',
  styleUrls: ['./rapport-visuel.component.scss']
})
export class RapportVisuelComponent implements OnInit, OnChanges {
  @Input() patient: PatientDto;
  stats: DescStats[] = [];
  public displayedColumns: string[] = [
    'Minutes',
    'Maximum',
    'Minimum',
    'Moyenne',
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
  private questionnaires: QuestionnaireDto[];
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
  public jrsAcPhyUI = 0;
  public totalUI = 0;

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
  public pieChartLabelsBreq: Label[] = [
    'Démotivation',
    'Identifiée',
    'Introjectée',
    'Extrinsèque',
    'Intrinsèque'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartOptions: ChartOptions = {
    responsive: true,
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
    'sedentaire'];
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

  constructor(private patientService: PatientService, public datePipe: DatePipe, protected dateService: NbDateService<Date>) {
    /* this.range = {
       start: this.dateService.addDay(this.monthStart, 1),
       end: this.dateService.addDay(this.monthEnd, -3),
     };*/

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
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
    this.vigoureux = 0;
    this.moderee = 0;
    this.marche = 0;
    this.sedentaire = 0;
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
      // console.log(JSON.stringify(stepsDto));

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

        /*for (const x in req.object) {
          if (req.object[x].length > 0) {
            for (const i of req.object[x]) {
              const min = i as MinutesDto;
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
        }*/
      }
      // this.minPieChart();
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

  minutesOnChange(i: number) {
    if (this.selectedItemMin !== i) {
      this.selectedItemMin = i;
      this.minPieChart();
    }
  }

  gpaqOnChange(i: number) {
    if (this.selectedItemGpaq !== i) {
      this.selectedItemGpaq = i;
      this.gpaqCalcule();
      this.gpaqBarChart();
    }
  }

  breqOnChange(i: number) {
    if (this.selectedItemBreq !== i) {
      this.selectedItemBreq = i;
      this.breqPieChart();
    }
  }

  gpaqCalcule() {
    if (this.gpaq.length > 0){
      this.travailModereVigoureuxUI = (((this.gpaq.at(this.selectedItemGpaq).value.reponses[5].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[5].minu) *
         this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr * 60 +
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu) *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr)));
      this.transportPiedUI = (((this.gpaq.at(this.selectedItemGpaq).value.reponses[8].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[8].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[7].jr)));
      this.transportVeloUI = (((this.gpaq.at(this.selectedItemGpaq).value.reponses[11].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[11].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[10].jr)));

      this.loisirsModereVigoureuxUI = (((this.gpaq.at(this.selectedItemGpaq).value.reponses[17].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[17].minu) *
        this.gpaq.at(this.selectedItemGpaq).value.reponses[16].jr) +
        (((this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr * 60) +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu) *
        this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr));
      this.loisirsMarcheUI = (((this.gpaq.at(this.selectedItemGpaq).value.reponses[20].hr * 60 +
          this.gpaq.at(this.selectedItemGpaq).value.reponses[20].minu) *
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[19].jr)));

      this.jrsAcPhyUI = this.gpaq.at(this.selectedItemGpaq).value.reponses[21].jr;


      this.totalUI = ((this.gpaq.at(this.selectedItemGpaq).value.reponses[1].jr) *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[2].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[2].minu)) +
        ((this.gpaq.at(this.selectedItemGpaq).value.reponses[13].jr) *
          ((this.gpaq.at(this.selectedItemGpaq).value.reponses[14].hr *
              60 )+
            (this.gpaq.at(this.selectedItemGpaq).value.reponses[14].minu)))+
        ((this.gpaq.at(this.selectedItemGpaq).value.reponses[4].jr) *
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
            this.gpaq.at(this.selectedItemGpaq).value.reponses[17].minu))+
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[19].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[20].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[20].minu)) +
        (this.gpaq.at(this.selectedItemGpaq).value.reponses[7].jr *
          (this.gpaq.at(this.selectedItemGpaq).value.reponses[8].hr *
            60 +
            this.gpaq.at(this.selectedItemGpaq).value.reponses[8].minu));


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

  private minPieChart() {
    this.sedentary = this.minutesData.at(this.selectedItemMin).sedentary;
    this.minuHight = this.minutesData.at(this.selectedItemMin).very_active;
    this.minuMedium = this.minutesData.at(this.selectedItemMin).fairly_active;
    this.minuLow = this.minutesData.at(this.selectedItemMin).lightly_active;
    this.minutesPieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
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

  handleRangeChange($event: NbCalendarRange<Date>) {
    if ($event.end !== undefined) {
      this.stepsBarChart($event.start, $event.end);
      this.minutesCalcule();
    }
  }

  onChangePD() {

    this.stepsBarChart(new Date(this.pd.at(this.selectedItemPD).initDate), new Date(this.pd.at(this.selectedItemPD).returnedAt));
    this.minutesCalcule();

  }
}

export class Step {
  date: string;
  steps: number;

  constructor(date: string, steps: number) {
    this.date = date;
    this.steps = steps;
  }
}



import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DescStats} from '../../../../_models/DescStats';
import {MatTableDataSource} from '@angular/material/table';
import {Patient} from '../../../../_models/patient';
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {PatientService} from '../../../../_services/patient.service';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Router} from '@angular/router';
import {Request} from '../../../../dto';
import {DatePipe} from '@angular/common';
import * as ss from 'simple-statistics';
import {ClinicalExaminationDto} from '../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto';
import {LipidProfileDto} from '../../../../dto/medicalfile/LipidProfileDto';
import {MedicalFileHistoryDto} from '../../../../dto/medicalfile/MedicalFileHistoryDto';
import {MedicalFileDto} from '../../../../dto/medicalfile/MedicalFileDto';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit, OnChanges {
  tabIndex = 0;
  @Input() patient: PatientDto;
  afficher;
  canvaData: Steps [] = [];
  minData: Minutes [] = [];
  steps: number[] = [];
  minuHight: number;
  minuLow: number;
  sedentary: number;
  minuMedium: number;
  listSedentary = [];
  listLowIntesity = [];
  listHightIntensity = [];
  listMediumIntensity = [];
  minutesDate: string [] = [];
  poddon: any;
  stepsDate: string [] = [];
  mySubscription: any;
  datess = [];
  barChar: ChartDataSets [];
  visites: AppointmentDto[];
  public patientRow: Patient[] = [];
  public quiz: any;
  public travail: number;
  public val: Resultat [] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public vigoureux = 0;
  public amotivation = 0;
  public external: 0;
  public introjected: 0;
  public identified: 0;
  public intrinsic: 0;
  public moderee = 0;

  public marche = 0;

  public sedentaire = 0;
  clinicalExamination: ClinicalExaminationDto [];
  lipidProfiles: LipidProfileDto[];
  medicalFileHistory: MedicalFileHistoryDto [] = null;
  medicalFile: MedicalFileDto;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0,255,225)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartLabelst: Label[];
  public lineChartOptionst = {
    responsive: true,
  };
  public lineChartDatat: ChartDataSets[];

  public lineChartColorst: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'blue',
    },
  ];
  public lineChartLegendt = true;
  public lineChartTypet = 'line';
  public lineChartPluginst = [];

  barChartLabels: Label[] = this.stepsDate;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  definition = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: [], label: 'Nombre de pas par jour'}
  ];

  public dataSource = new MatTableDataSource<DescStats>();

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
  public pieChartType = 'pie';
  public pieChartLabels: string[] = ['Intensité faible',
    'Intensité  modérée',
    'Intensité élevée',
    'sedentaires'];
  pieChartBreqTab: SingleDataSet [];
  public pieChartLabelsBreq: string[] = ['Extrinsèque',
    'Introjectée',
    'Identified',
    'Intrinsic',
    'Amotivation'];
  public pieChartData: SingleDataSet;
  public pieChartDataBreq: SingleDataSet = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  public barChartLabelsgpaq: Label[] = [];
  public barChartTypegpaq: ChartType = 'bar';
  public barChartLegendgpaq = true;
  public barChartPluginsgpaq = [];

  public barChartDatagpaq: ChartDataSets[] = [];
  selectedItem = 0;

  constructor(private patientService: PatientService, private router: Router, public datepipe: DatePipe) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.visites = [];
    this.steps = [];
    this.stepsDate = [];
    this.minData = [];
    this.minData = [];
    this.val = [];
    this.pieChartData = [this.minuLow, this.minuMedium, this.minuHight];
  }

  ngOnInit() {
    this.visites = [];
    this.steps = [];
    this.stats = [];
    this.datess = [];
    this.stepsDate = [];
    this.minData = [];
    this.minData = [];
    this.val = [];
    this.getAllVisites();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.visites = [];
    this.stats = [];
    this.datess = [];
    this.steps = [];
    this.stepsDate = [];
    this.minData = [];
    this.minData = [];
    this.val = [];
    this.getAllVisites();
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getSteps = () => {

    this.patientService.getSteps(this.patient.medicalFile.patient).subscribe(steps => {
      this.steps = [];
      this.stepsDate = [];
      this.canvaData = [];
      const poddon = JSON.parse(JSON.stringify(steps)) as Request;
      if (poddon.object != null) {
        for (let i = 0; i < this.visites.length; i++) {
          this.canvaData.push(poddon.object[this.datepipe.transform(this.visites[i].appointmentDate.toString(), 'yyyy-MM-dd')]);
        }

        for (const x of this.canvaData) {
          for (const i in x) {
            const date = new Date(x[i].date);
            this.stepsDate.push(date.toLocaleDateString('fr', {
              year: 'numeric', month: '2-digit', day: '2-digit',
            }));
            this.steps.push(x[i].steps);
            this.barChartData = [
              {data: this.steps, label: 'Nombre de pas par jour'}
            ];
            this.barChartLabels = this.stepsDate;
          }
        }
      } else {
        this.steps = [];
        this.stepsDate = [];
        this.barChartData = [
          {data: [], label: 'Nombre de pas par jour'}
        ];
        this.barChartLabels = this.stepsDate;
      }
    }, error => {
      this.steps = [];
      this.stepsDate = [];
      this.canvaData = [];
      this.barChartData = [
        {data: this.steps, label: 'Nombre de pas par jour'}
      ];
      this.barChartLabels = this.stepsDate;
    });
  }

  public getQuiz = () => {
    this.patientService.getQuiz(this.patient.id).subscribe(quiz => {
      quiz = JSON.parse(JSON.stringify(quiz));
      this.quiz = quiz;

      for (const x of this.quiz.object) {
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
      this.val.forEach(elm => this.show_barChart(elm.value.toString()));
    });


  }

  public show_pieChart(val: object) {
    let pieChart: SingleDataSet = [];
    const x = JSON.parse(JSON.stringify(val));
    this.intrinsic = x.score.intrinsic;
    this.external = x.score.external;
    this.amotivation = x.score.amotivation;
    this.identified = x.score.identified;
    this.introjected = x.score.introjected;

    pieChart = [this.intrinsic, this.external, this.amotivation,
      this.identified, this.introjected];
    return pieChart;
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

  public getMinutes = () => {

    const request = new Request(this.datess);
    this.patientService.getMinutes(this.patient.medicalFile.patient).subscribe(minutes => {
      this.minuHight = 0;
      this.minuMedium = 0;
      this.minuLow = 0;
      this.sedentary = 0;
      const min = JSON.parse(JSON.stringify(minutes)) as Request;
      if (min.object != null) {

        for (let i = 0; i < this.visites.length; i++) {
          this.minData.push(min.object[this.datepipe.transform(this.visites[i].appointmentDate.toString(), 'yyyy-MM-dd')]);
        }
        for (const x of this.minData) {
          for (const i in x) {
            const date = new Date(x[i].date);
            this.listSedentary.push(x[i].sedentary);
            this.listHightIntensity.push(x[i].very_active);
            this.listMediumIntensity.push(x[i].fairly_active);
            this.listLowIntesity.push(x[i].lightly_active);
            this.stats = [
              new DescStats('Intensité faible', +ss.max(this.listLowIntesity).toFixed(2), +ss.min(this.listLowIntesity).toFixed(2), +ss.average(this.listLowIntesity).toFixed(2), +ss.median(this.listLowIntesity).toFixed(2), +ss.variance(this.listLowIntesity).toFixed(2), +ss.standardDeviation(this.listLowIntesity).toFixed(2)),
              new DescStats('Intensité modérée', +ss.max(this.listMediumIntensity).toFixed(2), +ss.min(this.listMediumIntensity).toFixed(2), +ss.average(this.listMediumIntensity).toFixed(2), +ss.median(this.listMediumIntensity).toFixed(2), +ss.variance(this.listMediumIntensity).toFixed(2), +ss.standardDeviation(this.listMediumIntensity).toFixed(2)),
              new DescStats('Intensité elevée', +ss.max(this.listHightIntensity).toFixed(2), +ss.min(this.listHightIntensity).toFixed(2), +ss.average(this.listHightIntensity).toFixed(2), +ss.median(this.listHightIntensity).toFixed(2), +ss.variance(this.listHightIntensity).toFixed(2), +ss.standardDeviation(this.listHightIntensity).toFixed(2)),
              new DescStats('Sedentaires', +ss.max(this.listSedentary).toFixed(2), +ss.min(this.listSedentary).toFixed(2), +ss.average(this.listSedentary).toFixed(2), +ss.median(this.listSedentary).toFixed(2), +ss.variance(this.listSedentary).toFixed(2), +ss.standardDeviation(this.listSedentary).toFixed(2))
            ];

            this.dataSource.data = this.stats;
            this.minutesDate.push(date.toLocaleDateString('fr', {
              year: 'numeric', month: '2-digit', day: '2-digit',
            }));
            this.minuHight = x[i].very_active + this.minuHight;
            this.minuLow = x[i].lightly_active + this.minuLow;
            this.minuMedium = x[i].fairly_active + this.minuMedium;
            this.sedentary = x[i].sedentary + this.sedentary;
          }
        }
        this.pieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
      } else {
        this.minuHight = 0;
        this.minuMedium = 0;
        this.minuLow = 0;
        this.sedentary = 0;
        this.pieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
      }
    }, error => {
      this.minuHight = 0;
      this.minuMedium = 0;
      this.minuLow = 0;
      this.sedentary = 0;
      this.pieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
    });
  }

  public getAllVisites = () => {
    this.datess = [];
    this.getQuiz();
    const poids: number [] = [];
    const trtaille: number [] = [];
    const dates: string[] = [];
    let i = 0;
    while (i < this.patient.medicalFile.clinicalExamination.length) {
      poids.push(+this.patient.medicalFile.clinicalExamination[i].anthropometry.weight.toFixed(2));
      trtaille.push(+this.patient.medicalFile.clinicalExamination[i].anthropometry.waist.toFixed(2));
      dates.push(this.patient.medicalFile.clinicalExamination[i].date);
      i++;
    }
    this.lineChartData = [
      {data: poids, label: 'Poids'},
    ];
    this.lineChartDatat = [
      {data: trtaille, label: 'Tour de taille'},
    ];
    this.lineChartLabels = dates;
    this.patientService.getRdv(this.patient.id).subscribe(patients => {
      this.visites = JSON.parse(JSON.stringify(patients)).object as AppointmentDto[];
      if (this.visites.length > 0) {
        for (let i = 0; i < this.visites.length; i++) {
          this.datess.push(Date.parse(this.visites[i].appointmentDate + ''));
        }
        this.getSteps();
        this.getMinutes();
      } else {
        this.steps = [];
        this.stepsDate = [];
        this.minData = [];
        this.minData = [];
        this.pieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
        this.barChartData = [
          {data: this.steps, label: 'Nombre de pas par jour'}
        ];
      }

      }, error => {
      this.visites = [];
      this.steps = [];
      this.stepsDate = [];
      this.minData = [];
      this.minData = [];
    });
  }

  onChange() {

  }
}

export interface Steps {
  date: number;
  medicaleFileId: string;
  steps: number;
}

export interface Minutes {
  date: number;
  medicaleFileId: string;
  sedentary: number;
  lightly_active: number;
  fairly_active: number;
  very_active: number;
}

export interface Resultat {
  date: string;
  value: object;
  id: string;
  type: string;
}

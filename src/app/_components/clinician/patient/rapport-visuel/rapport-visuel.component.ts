import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DescStats} from '../../../../_models/DescStats';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {MatTableDataSource} from '@angular/material/table';
import {Request} from '../../../../dto';
import * as ss from 'simple-statistics';
import {PatientService} from '../../../../_services/patient.service';
import {DatePipe} from '@angular/common';
import {AppointmentDto} from '../../../../dto/AppointmentDto';
import {SingleDataSet} from 'ng2-charts';

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
  selectedItem = 0;
  public dataSource = new MatTableDataSource<DescStats>();
  minuHight: number;
  minuLow: number;
  sedentary: number;
  minuMedium: number;
  datesVisites = [];
  appointments: AppointmentDto[];
  stepsData: Steps [] = [];
  minutesData: Minutes [];
  public minutesPieChartData: SingleDataSet;
  minutesDate: string [] = [];
  listSedentary = [];
  listLowIntensity = [];
  listHighIntensity = [];
  listMediumIntensity = [];
  appointmentsDates = [];
  private questionnaires: any;
  public gpaq: Resultat [] = [];
  public breq: Resultat [] = [];


  constructor(private patientService: PatientService, public datePipe: DatePipe) {

  }

  ngOnInit() {
    console.log('ngOnInit1');
    this.getAppointments();
    this.getQuestionnaires();

  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  onChange() {
    console.log('onChange');
    this.appointmentsDates = [];
    this.minutesData = [];
    this.gpaq = [];
    this.breq = [];
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
      }
    });
    return this.appointmentsDates;
  }

  public getMinutes = (dates: AppointmentDto[]) => {
    const request = new Request(dates);
    this.patientService.getMinutes(this.patient.medicalFile.patient, request).subscribe(response => {
      this.minuHight = 0;
      this.minuMedium = 0;
      this.minuLow = 0;
      this.sedentary = 0;
      const req = JSON.parse(JSON.stringify(response)) as Request;

      if (req.object != null) {
        // tslint:disable-next-line:forin
        for (const x in req.object) {
          if (req.object[x].length > 0) {
            for (const i of req.object[x]) {

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
              this.minutesDate.push(date.toLocaleDateString('fr', {
                year: 'numeric', month: '2-digit', day: '2-digit',
              }));
              this.minuHight = i.very_active + this.minuHight;
              this.minuLow = i.lightly_active + this.minuLow;
              this.minuMedium = i.fairly_active + this.minuMedium;
              this.sedentary = i.sedentary + this.sedentary;
            }
          }
        }
      }
      this.minutesPieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
    }, error => {
      this.minuHight = 0;
      this.minuMedium = 0;
      this.minuLow = 0;
      this.sedentary = 0;
      this.minutesPieChartData = [this.minuLow, this.minuMedium, this.minuHight, this.sedentary];
    });
  }


  public getQuestionnaires = () => {
    this.patientService.getQuiz(this.patient.id).subscribe(response => {
      this.questionnaires = JSON.parse(JSON.stringify(response));

      for (const x of this.questionnaires.object) {
        const valeur = JSON.parse(x.value);
        if (x.type === 'GPAQ') {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < valeur.reponses.length; i++) {
            if ((valeur.reponses[i].hr === null || valeur.reponses[i].hr === undefined)) {
              valeur.reponses[i].hr = 0;
            }
            if ((valeur.reponses[i].minu === null || valeur.reponses[i].minu === undefined)) {
              valeur.reponses[i].minu = 0;
            }
            if ((valeur.reponses[i].jr === null || valeur.reponses[i].jr === undefined)) {
              valeur.reponses[i].jr = 0;
            }
          }
        }

        if (x.type === 'GPAQ'){
          this.gpaq.push(new Resultat(x.id, x.date, x.type, valeur));
        } else if (x.type === 'BREQ') {
          this.breq.push(new Resultat(x.id, x.date, x.type, valeur));
        }
      }
      this.gpaq.forEach(elm => console.log(elm));
      // this.val.forEach(elm => this.show_barChart(elm.value.toString()));
    });


  }

  gpaqOnChange(i: number){
    this.selectedItem = i;
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

export class Resultat {
  id: string;
  date: string;
  type: string;
  value: object;


  constructor(id: string, date: string, type: string, value: object) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.value = value;
  }
}

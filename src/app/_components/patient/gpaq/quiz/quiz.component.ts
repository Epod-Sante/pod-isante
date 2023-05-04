import {Component, Inject, Input, OnInit} from '@angular/core';

import {QuizService} from '../services/quiz.service';
import {HelperService} from '../services/helper.service';
import {Option, Question, Quiz, QuizConfig} from '../models';
import {Reponse} from '../models/reponse';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';
import {Request} from '../../../../dto';
import {PatientService} from '../../../../_services/patient.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-gpaqquiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class GpaqQuizComponent implements OnInit {
  @Input() patient: PatientDto;
  obj;
  quizes: any[];
  value: any;
  comfirmer = false;
  patientId = '';
  regulations: any [];
  rep: Reponse[] = [];
  data = require('../data/gpaq.json');
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  jours;
  minutes;
  heures;
  quizName: string;
  saut = 0;
  questionnaireToken: string;


  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: true,  // if true, it will move to next question automatically when answered.
    duration: 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    requiredAll: false,  // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  btnSuivDisabled = true;
  btnPrecDisabled = true;
  init = true;

  constructor(private quizService: QuizService, private http: HttpClient, private route: ActivatedRoute,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<GpaqQuizComponent>,
              private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.questionnaireToken = localStorage.getItem('currentPatientToken');
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  ngOnInit() {

    this.loadQuiz(this.quizName);
    this.getCodeFromURI();

  }

  loadQuiz(quizName: string) {

    this.quiz = new Quiz(this.data);
    this.pager.count = this.quiz.questions.length;
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
    this.duration = this.parseTime(this.config.duration);

    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.mode = 'result';
      // this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onSelect(question: Question, option: Option) {
    this.saut = 0;
    if (question.questionTypeId === 2 || question.questionTypeId === 3 || question.questionTypeId === 4) {
      // question.options.forEach((x) => {
      if (option.poids === 1) {

        this.rep.push(new Reponse(
          question.id, this.quiz.id,
          option.poids, 0, 0, 0, question.questionPere));
        for (let i = 0; i < this.quiz.questions.length; i++) {
          if (this.quiz.questions[i].questionPere === question.id && this.quiz.questions[i].questionPere != 0) {
            this.rep.push(new Reponse(
              this.quiz.questions[i].id, this.quiz.id,
              null, 0, 0, 0, this.quiz.questions[i].questionPere));
          }
        }

        this.goTo(this.pager.index + 3);
        this.btnSuivDisabled=true;
        this.btnPrecDisabled=false;
      } else {
        let exist = false;

        for (let j = 0; j < this.rep.length; j++) {
          if (this.rep[j].questionId === question.id) {
            exist = true;
            const rep = new Reponse(
              question.id, this.quiz.id,
              null, question.min, question.hr, question.nbJour, question.questionPere);
            this.rep[j] = rep;
          }
        }

        if (exist === false) {
          this.rep.push(new Reponse(
            question.id, this.quiz.id,
            null, question.min, question.hr, question.nbJour, question.questionPere));
        }
        if (question.questionTypeId === 2) {
          this.goTo(this.pager.index + 1);
          this.btnSuivDisabled=true;
          this.btnPrecDisabled=false;
        }
        if (question.questionTypeId === 3 || question.questionTypeId === 4 && this.rep.length !== 23){
          this.btnSuivDisabled=false;
          this.btnPrecDisabled=false;
        }
        console.log(this.rep.length)
        if (this.rep.length >= 23) {
          this.btnSuivDisabled=true;
        }

      }


      // });


    }
    if (this.config.autoMove) {
      this.goTo(this.pager.index + this.saut);
    }
    console.log(this.rep)
  }


  goTo(index: number) {
    //this.onSelect(question, option)

    if (this.rep.length == 23) {
      this.comfirmer = true;
    }
    if (index >= 0 && index < this.pager.count) {
      this.ellapsedTime = '00:00';
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  reponse(question: Question) {
    return question.options.find(x => x.selected) ? 'repondu' : 'non repondu';
  }

  onSubmit() {
    this.value = { reponses: this.rep};

    const breq = new QuestionnaireDto(null, this.patientId, 'GPAQ', JSON.stringify(this.value), null);
    const request = new Request(breq);
    this.patientService.addQuiz(request).subscribe(reponse => {
      this.openSnackBar(' AJOUT REUSSI', 'Ok');
      //window.location.reload();
    }, error => {
      this.openSnackBar(' Erreur !! Assurez-vous que le formulaire est bien rempli', 'Ok');
    });

  }

  goBack(index: number) {
    this.ellapsedTime = '00:00';
    this.mode = 'quiz';
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  goSuiv(index: number){
    if (this.quiz.questions.at(index).questionTypeId == 2){
      this.btnSuivDisabled=true;
      this.btnPrecDisabled=false;
    }
    if (this.quiz.questions.at(index).questionTypeId == 2 ||
        this.quiz.questions.at(index).questionTypeId == 3 ||
        this.quiz.questions.at(index).questionTypeId == 4){
      this.btnSuivDisabled=true;
      this.btnPrecDisabled=false;
    }
    if (this.rep.length == 23) {
      this.comfirmer = true;
    }
    if (index >= 0 && index < this.pager.count) {
      this.ellapsedTime = '00:00';
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  goPrec(index: number, question: Question) {
    if (((index+1)%3)===1){
      for (let i = 1; i < 3; i++) {
        this.quiz.questions.at(index-i).nbJour = 0;
        this.quiz.questions.at(index-i).hr = 0;
        this.quiz.questions.at(index-i).min = 0;
      }
      index -= 3;
      this.quiz.questions.at(index).options.at(1).selected = false;
      this.quiz.questions.at(index).options.at(0).selected = false;
      this.rep = this.rep.slice(0, this.rep.length-3)
    }else{
      this.quiz.questions.at(index).nbJour = 0;
      this.quiz.questions.at(index).hr = 0;
      this.quiz.questions.at(index).min = 0;
      index -= 1;
      this.rep = this.rep.slice(0, this.rep.length-1)
      this.quiz.questions.at(index).options.at(0).selected = false;
      this.quiz.questions.at(index).nbJour = 0;
      this.quiz.questions.at(index).hr = 0;
      this.quiz.questions.at(index).min = 0;

    }
    if (this.rep.length == 23) {
      this.comfirmer = true;
    }else {
      this.comfirmer = false;

    }
    if (index >= 0 && index < this.pager.count) {
      this.ellapsedTime = '00:00';
      this.pager.index = index;
      this.mode = 'quiz';
    }

    if (this.rep.length == 0){
      this.btnSuivDisabled=true;
      this.btnPrecDisabled=true;
    }else {
      this.btnSuivDisabled=true;
      this.btnPrecDisabled=false;
    }

    console.log(this.rep)
  }

  getCodeFromURI() {

    this.patientService.recup_token(this.questionnaireToken).subscribe(
      response => {
        this.obj = JSON.parse(JSON.stringify(response));
        this.patient = this.obj.object;
        if (this.patient != null) {
          this.patientId = this.obj.object.id;
        } else {

        }
        if (this.obj.error != null) {
          this.questionnaireToken = null;
        }
      },
      error => {

      }
    );


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  score(question: Question, option: Option) {

    if (question.questionTypeId === 3 || question.questionTypeId === 4) {

      if (question.questionTypeId === 4) {

      } else {

      }
    }
  }

  fermer() {
    this.dialogRef.close();
  }
}

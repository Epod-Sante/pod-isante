import {Component, Inject, Input, OnInit} from '@angular/core';

import {QuizService} from '../services/quiz.service';
import {HelperService} from '../services/helper.service';
import {Option, Question, Quiz, QuizConfig} from '../models';
import {Reponse} from '../models/reponse';
import *  as  data from '../data/breq.json';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {QuestionnaireDto} from "../../../../dto/QuestionnaireDto";
import {ActivatedRoute} from "@angular/router";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {Patient} from "../../../../_models/patient";
import {PatientService} from "../../../../_services/patient.service";
import {Request} from "../../../../dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  @Input () patient : PatientDto
  quizes: any[];
  obj
  comfirmer : boolean = false;
   data  = require('../data/breq.json');
  regulations: any [];
  rep: Reponse[] = [];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string = 'breq.json';
  value : any
  patientId : string =""
  poid = 0;
  poid1 = 0;
  poid2 = 0;
  poid3 = 0;
  poid4 = 0;
  introjected_regulation = 0;
  amotivation_regulation = 0;
  identified_regulation = 0;
  external_regulation = 0;
  intrinsic_regulation = 0;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 20,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  questionnaireToken: string;

  constructor(private quizService: QuizService, private http :HttpClient,private  route : ActivatedRoute,
              private patientService : PatientService,
              public dialogRef: MatDialogRef<QuizComponent>,
              private _snackBar : MatSnackBar
              ) {
    this.questionnaireToken = localStorage.getItem("currentPatientToken")
  }

  ngOnInit() {
    console.log(this.data)
     this.getCodeFromURI()

   /* this.quizName = this.quizes[0].id;*/
   // console.log(this.quizName)
    this.loadQuiz();

  }
  fermer(){
    this.dialogRef.close()
  }

  loadQuiz() {
   // this.quizService.get(this.quizName).subscribe(res => {
      this.quiz = new Quiz(this.data);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
      this.duration = this.parseTime(this.config.duration);
    //});
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.mode = 'result';
      //this.onSubmit();
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

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1 ) {
      question.options.forEach((x) => {
        if (x.id !== option.id) {
          x.selected = false;
        } else {

          let exist = false;
          for(let i=0 ; i< this.rep.length; i++){
            if(this.rep[i].questionId ===question.id){
              exist = true;
              this.rep[i] =  new Reponse(
                question.id,
                option.poids)        }
          }
          if(exist == false)
          {
          this.rep.push(new Reponse(
            question.id,
            option.poids));

          console.log(this.rep);
          this.score(question, option);
          if(this.rep.length === 19){
            this.comfirmer = true
          }
        }}
      });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goBack(index: number) {
    this.ellapsedTime = '00:00';
    this.mode = 'quiz';

    console.log(this.mode);
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz();
  }

  goTo(index: number) {

    if (index >= 0 && index < this.pager.count) {
      this.ellapsedTime = '00:00';
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  reponse(question: Question) {
    return question.options.find(x => x.selected) ? 'repondu' : 'non repondu';

  }

  score(question: Question, option: Option) {

  if (question.regulation.id === 1) {

      this.amotivation_regulation = this.amotivation_regulation + 1;
      this.poid = option.poids + this.poid;
      console.log(this.poid);
      console.log(this.amotivation_regulation);
    } else if (question.regulation.id === 2) {
      this.external_regulation = this.external_regulation + 1;
      this.poid1 = option.poids + this.poid1;
      console.log(this.poid1);
      console.log(this.external_regulation);
    } else if (question.regulation.id === 3) {
      this.introjected_regulation = this.introjected_regulation + 1;
      this.poid2 = option.poids + this.poid2;
      console.log(this.poid2);
      console.log(this.introjected_regulation);
    } else if (question.regulation.id === 4) {
      this.identified_regulation = this.identified_regulation + 1;
      this.poid3 = option.poids + this.poid3;
      console.log(this.poid3);
      console.log(this.identified_regulation);
    } else if (question.regulation.id === 5) {
      this.intrinsic_regulation = this.intrinsic_regulation + 1;
      this.poid4 = option.poids + this.poid4;
      console.log(this.poid4);
      console.log(this.intrinsic_regulation);
    }
    console.log(question.regulation.name);


  }

  onSubmit() {
    console.log(this.rep);
    const moy_amotivation = this.poid / this.amotivation_regulation;
    const moy_external = this.poid1 / this.external_regulation;
    const moy_introjected = this.poid2 / this.introjected_regulation;
    const moy_identified = this.poid3 / this.identified_regulation;
    const moy_intrinsic = this.poid4 / this.intrinsic_regulation;
    console.log(' score moyen Amotivation :' + moy_amotivation);
    console.log('  score moyen external_regulation : ' + moy_external);
    console.log(' score moyen introjected_regulation : ' + moy_introjected);
    console.log(' score moyen identified_regulation : ' + moy_identified);
    console.log(' score moyen intrinsic_regulation : ' + moy_intrinsic);
    this.value = {
      reponses : this.rep,
      score : {
        amotivation : moy_amotivation,
        external : moy_external,
        introjected : moy_introjected,
        identified : moy_identified,
        intrinsic : moy_intrinsic
      }

    }

      let breq = new QuestionnaireDto(null, this.patientId, "BREQ", JSON.stringify(this.value), null)
    let request = new Request(breq)
    this.patientService.addQuiz(request).subscribe( reponse =>{
      this.openSnackBar(" AJOUT REUSSI","Ok")
      this.dialogRef.close()

    }, error => {
      this.openSnackBar(" Erreur !! Assurez-vous que le formulaire est bien rempli","Ok")

    })
      console.log(breq)


  }
  getCodeFromURI() {




        this.patientService.recup_token(this.questionnaireToken).subscribe(
          response => {
            this.obj = JSON.parse(JSON.stringify(response))
            this.patient = this.obj.object
            if(this.patient!=null) {



              this.patientId = this.obj.object.id
              console.log(this.obj)
            }else{

            }
            if(this.obj.error != null){
              this.questionnaireToken = null
            }


          },
          error => {

          }
        );




  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    })}
}

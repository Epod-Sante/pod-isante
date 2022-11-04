import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from '../services/quiz.service';
import {Option, Question, Quiz, QuizConfig} from '../models';
import {Reponse} from '../models/reponse';
import {HttpClient} from '@angular/common/http';
import {QuestionnaireDto} from '../../../../dto/QuestionnaireDto';
import {ActivatedRoute} from '@angular/router';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {PatientService} from '../../../../_services/patient.service';
import {Request} from '../../../../dto';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  @Input() patient: PatientDto;
  quizes: any[];
  obj;
  comfirmer = false;
  data = require('../data/breq.json');
  regulations: any [];
  rep: Reponse[] = [];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName = 'breq.json';
  value: any;
  patientId = '';
  poid = 0;
  poid1 = 0;
  poid2 = 0;
  poid3 = 0;
  poid4 = 0;
  introjectedRegulation = 0;
  amotivationRegulation = 0;
  identifiedRegulation = 0;
  externalRegulation = 0;
  intrinsicRegulation = 0;
  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false,  // if true, it will move to next question automatically when answered.
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
    size: 20,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  questionnaireToken: string;

  constructor(private quizService: QuizService, private http: HttpClient, private route: ActivatedRoute,
              private patientService: PatientService,
              private toastrService: NbToastrService) {
    this.questionnaireToken = localStorage.getItem('currentPatientToken');
  }

  ngOnInit() {
    this.getCodeFromURI();

    /* this.quizName = this.quizes[0].id;*/
    // console.log(this.quizName)
    this.loadQuiz();

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
    // });
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

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) {
          x.selected = false;
        } else {

          let exist = false;
          for (let i = 0; i < this.rep.length; i++) {
            if (this.rep[i].questionId === question.id) {
              exist = true;
              this.rep[i] = new Reponse(
                question.id,
                option.poids);
            }
          }
          if (exist === false) {
            this.rep.push(new Reponse(
              question.id,
              option.poids));

            this.score(question, option);
            if (this.rep.length === 19) {
              this.comfirmer = true;
            }
          }
        }
      });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goBack(index: number) {
    this.ellapsedTime = '00:00';
    this.mode = 'quiz';

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

      this.amotivationRegulation = this.amotivationRegulation + 1;
      this.poid = option.poids + this.poid;
    } else if (question.regulation.id === 2) {
      this.externalRegulation = this.externalRegulation + 1;
      this.poid1 = option.poids + this.poid1;
    } else if (question.regulation.id === 3) {
      this.introjectedRegulation = this.introjectedRegulation + 1;
      this.poid2 = option.poids + this.poid2;
    } else if (question.regulation.id === 4) {
      this.identifiedRegulation = this.identifiedRegulation + 1;
      this.poid3 = option.poids + this.poid3;
    } else if (question.regulation.id === 5) {
      this.intrinsicRegulation = this.intrinsicRegulation + 1;
      this.poid4 = option.poids + this.poid4;
    }


  }

  onSubmit() {
    const moyAmotivation = this.poid / this.amotivationRegulation;
    const moyExternal = this.poid1 / this.externalRegulation;
    const moyIntrojected = this.poid2 / this.introjectedRegulation;
    const moyIdentified = this.poid3 / this.identifiedRegulation;
    const moyIntrinsic = this.poid4 / this.intrinsicRegulation;
    this.value = {
      reponses: this.rep,
      score: {
        amotivation: moyAmotivation,
        external: moyExternal,
        introjected: moyIntrojected,
        identified: moyIdentified,
        intrinsic: moyIntrinsic
      }

    };

    const breq = new QuestionnaireDto(null, this.patientId, 'BREQ', JSON.stringify(this.value), null);
    const request = new Request(breq);
    this.patientService.addQuiz(request).subscribe(reponse => {
      this.showToast('top-right', 'success', 'Succès', 'Ajout reussi');
      window.location.reload();
    }, error => {
      this.showToast('top-right', 'info', 'Échec', 'Assurez-vous que le formulaire est bien rempli');

    });
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

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      {position, status});
  }
}

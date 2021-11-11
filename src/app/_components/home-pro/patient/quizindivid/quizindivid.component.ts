import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";


@Component({
  selector: 'app-quizindivid',
  templateUrl: './quizindivid.component.html',
  styleUrls: ['./quizindivid.component.css']
})
export class QuizindividComponent implements OnInit {
  antecedants : MedicalFileHistoryDto [] = []
  constructor() { }

  ngOnInit() {
    let mdh = new MedicalFileHistoryDto([""],'Angine')
    this.antecedants.push(mdh);

  }

}

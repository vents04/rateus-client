import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.scss']
})
export class AnswerQuestionnaireComponent implements OnInit {

  constructor() { }

  questions = [
    {
      "title": 'Test',
      "input": 1,
    },
    {
      "title": 'Test 2',
      "input": 0,
    }
  ];

  answers = [
    {
      "answer": null
    },
    {
      "answer": null
    }
  ]

  currentQuestion = 0;

  range = 5;

  ngOnInit(): void {
  }

  selecteQuestion(index: number): void {
    if(index < 0) {
      this.currentQuestion = 0;
    } else if (index >= this.questions.length) {
      this.currentQuestion = this.questions.length - 1;
    } else {
      this.currentQuestion = index;
    }
    this.range = 5;
  }

  updateRange(range): void {
    this.range = range/10;
    this.answers[this.currentQuestion].answer = parseInt(range);
  }

  updateText(text): void {
    this.answers[this.currentQuestion].answer = text;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.scss']
})
export class EditQuestionnaireComponent implements OnInit {

  constructor() { }

  questions = [
    {
      "title": 'Test',
      "input": 1
    }
  ];

  currentQuestion = 0;

  ngOnInit(): void {

  }

  addQuestion(): void {
    this.questions.push({'title': null, 'input': 0});
    this.currentQuestion = this.questions.length - 1;
  }

  selecteQuestion(index: number): void {
    this.currentQuestion = index;
  }

  updateQuestion(title: string, input: string): void {
    const inputNumber = parseInt(input, 10);
    this.questions[this.currentQuestion].title = title;
    this.questions[this.currentQuestion].input = inputNumber;
  }

  deleteQuestion(): void {
    if(this.questions.length > 1) {
      this.questions.splice(this.currentQuestion, 1);
      this.currentQuestion = this.questions.length - 1;
    }
  }
}

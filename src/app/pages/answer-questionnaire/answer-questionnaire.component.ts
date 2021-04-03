import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { QuestionnaireService } from 'src/app/services/questionnaire-service/questionnaire.service';

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.scss']
})
export class AnswerQuestionnaireComponent implements OnInit {

  constructor(private questionnaireService: QuestionnaireService, 
              private businessService: BusinessService, 
              private activatedRoute: ActivatedRoute,
              private answerService: AnswerService) { }

  questionnaireId: string = undefined;
  questionnaireTitle: string = undefined;
  businessId: string = undefined;

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
  color: string = '#90d977';

  answers = [];

  currentQuestion = 0;

  range = 5;

  error: boolean = false;
  success: boolean = false;
  errorSubmission: boolean = false;
  successSubmission: boolean = false;

  ngOnInit(): void {
    this.questionnaireId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getQuestionnaire();
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

  getQuestionnaire(): void {
    this.questionnaireService.getQuestionnaire(this.questionnaireId).pipe(
      catchError((err: any) => {
        this.error = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      if (response.body.questionnaire) {
        this.success = true;
        this.questions = response.body.questionnaire.questions;
        this.questionnaireTitle = response.body.questionnaire.title;
        this.businessId = response.body.questionnaire.businessId;

        for (let question of this.questions) {
          this.answers.push({'answer': '', input: question.input});
        }

        this.getColor();
      } else {
        this.error = true;
      }
    })
  }

  getColor(): void {
    this.businessService.getColor(this.businessId).subscribe((response: HttpResponse<any>) => {
      this.color = response.body.color;
    })
  }

  submit(): void {
    this.errorSubmission = false;
    this.successSubmission = false;
    this.answerService.createAnswer(this.answers, this.questionnaireId).pipe(
      catchError((err: any) => {
        this.errorSubmission = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.successSubmission = true;
    })
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { QuestionnaireService } from 'src/app/services/questionnaire-service/questionnaire.service';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.scss']
})
export class EditQuestionnaireComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService, private businessService: BusinessService) { }

  questionnaireId: string = undefined;
  questionnaireTitle: string = undefined;
  businessId: string = undefined;

  questions = [
    {
      "title": 'Test',
      "input": 1
    }
  ];
  currentQuestion = 0;
  color: string = "#90d977";

  error: boolean = false;
  success: boolean = false;

  errorUpdate: boolean = false;
  successUpdate: boolean = false;

  ngOnInit(): void {
    this.questionnaireId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getQuestionnaire();
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
      } else {
        this.error = true;
      }
    })
  }

  updateTitle(title: string): void {
    this.questionnaireTitle = title;
  }

  submitData(): void {
    this.errorUpdate = false;
    this.successUpdate = false;
    this.questionnaireService.updateQuestionnaire(this.questionnaireId, 
      this.questions, this.questionnaireTitle).pipe(
        catchError((err: any) => {
          this.errorUpdate = true;
          return throwError(err);
        })
      ).subscribe((response: HttpResponse<any>) => {
      this.successUpdate = true;
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }) 
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { QuestionnaireService } from 'src/app/services/questionnaire-service/questionnaire.service';
import { SubscriptionService } from 'src/app/services/subscription-service/subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, 
              private businessService: BusinessService, 
              private router: Router, 
              private answerService: AnswerService,
              private questionnaireService: QuestionnaireService,
              private languageService: LanguageService,
              private subscriptionService: SubscriptionService) { }

  authenticated: boolean = false;
  loadPage: boolean = false;

  business: any = null;
  color: string = "#90d977";
  dashboard: any = null;
  selectedQuestionnaire: any;

  showColorSelector : boolean = false;
  showAnswers: boolean = false;

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  activeSubscription: any = null;

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(): void {
    this.authService.checkToken().pipe(
      catchError((err: any) => {
        this.loadPage = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.authenticated = response.body.valid;
      if(!this.authenticated) this.router.navigate(['/']);
      this.loadPage = true;
      this.getBusiness();
      this.getLanguage();
      this.getLanguageData();
      this.getActiveSubscription();
    })
  }

  logOut(): void {
    this.authService.removeSession();
    this.router.navigate(['/']);
  }

  getBusiness(): void {
    this.businessService.getBusiness().pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.business = response.body.business;
      this.getColor();
      this.getDashboard();
    })
  }

  getColor(): void {
    this.businessService.getColor(this.business._id).subscribe((response: HttpResponse<any>) => {
      this.color = response.body.color;
    })
  }

  getDashboard(): void {
    this.businessService.getDashboard().subscribe((response: HttpResponse<any>) => {
      this.dashboard = response.body;
    })
  }

  updateColor(color: string): void {
    this.businessService.updateColor(color).subscribe((response: HttpResponse<any>) => {
      window.location.reload();
    })
  }

  redirectToQuestionnaire(id: string): void {
    this.router.navigate([`/edit-questionnaire/${id}`]);
  }

  getAnswers(): void {
    this.answerService.getAnswers(this.selectedQuestionnaire._id).pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.selectedQuestionnaire.answers = response.body.answers;
      this.selectedQuestionnaire.questionsCount = response.body.questionsCount;
      this.getQuestionnaire();
      
      for(let answer of this.selectedQuestionnaire.answers) {
        answer.dt = new Date(answer.dt).toLocaleString();
      }

      console.log(this.selectedQuestionnaire);
    })
  }

  getQuestionnaire(): void {
    this.questionnaireService.getQuestionnaire(this.selectedQuestionnaire._id).pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.selectedQuestionnaire.questions = response.body.questionnaire.questions;
    })
  }

  counter(i: number) {
    return new Array(i);
  }

  updateLanguage(language: string): void {
    this.languageService.updateLanguage(language);
    this.showLanguageSelector = false;
    this.getLanguage();
    window.location.reload();
  }

  getLanguage(): void {
    this.language = this.languageService.getLanguage();
  }

  getLanguageData(): void {
    this.languageService.getLanguageData('dashboard').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

  getActiveSubscription(): void {
    this.subscriptionService.getActiveSubscription().pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.activeSubscription = response.body.activeSubscription
    })
  }
}

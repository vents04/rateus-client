import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { SubscriptionService } from 'src/app/services/subscription-service/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private authService: AuthService, private languageService: LanguageService, private subscriptionService: SubscriptionService) { }

  loadPage: boolean = false;
  logged: boolean = false;

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;
  activeSubscription: any = undefined;
  activePlan: any = undefined;
  selectedPlan: string = undefined;

  showLoading: boolean = false;
  showSubscriptionField: boolean = false;

  ngOnInit(): void {
    this.checkToken();
    this.getLanguage();
    this.getLanguageData();
    this.getActiveSubscription();
  }

  checkToken(): void {
    this.authService.checkToken().pipe(
      catchError((err) => {
        this.loadPage = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.logged = response.body.valid;
      this.loadPage = true;
    })
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
    this.languageService.getLanguageData('subscriptions').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

  activateSubscription(): void {
    this.showLoading = true;
    this.subscriptionService.createSubscription(this.selectedPlan).pipe(
      catchError((err) => {
        this.showLoading = false;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.showLoading = false;
      window.location.replace(`${response.body.subscription.links[0].href}`);
    })
  }

  getActiveSubscription(): void {
    this.subscriptionService.getActiveSubscription().pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.activeSubscription = response.body.activeSubscription;
      this.activeSubscription.from = new Date(this.activeSubscription.from).toLocaleString();
      this.activePlan = response.body.plan;
      this.showSubscriptionField = true;
    })
  }

}

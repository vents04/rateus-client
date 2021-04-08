import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language-service/language.service';

@Component({
  selector: 'app-subscription-result',
  templateUrl: './subscription-result.component.html',
  styleUrls: ['./subscription-result.component.scss']
})
export class SubscriptionResultComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private languageService: LanguageService) { }

  status: string = undefined;
  loadPage: boolean = false;

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.status = params['type'];
      this.loadPage = true;
    });
    this.getLanguage();
    this.getLanguageData();
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
    this.languageService.getLanguageData('subscription-result').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

}

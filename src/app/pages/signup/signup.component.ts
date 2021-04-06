import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service/language.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private languageService: LanguageService) { }

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  showFirstPage: boolean = true;
  showSecondPage: boolean = false;
  showThirdPage: boolean = false;

  ngOnInit(): void {
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
    this.languageService.getLanguageData('signup').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

  signup(names: string, email: string, phoneNumber: string, password: string): void {
    if(this.showThirdPage) {
      
    } else {
      if(this.showFirstPage) {
        this.showFirstPage = false;
        this.showSecondPage = true;
        this.showThirdPage = false;
      } else if (this.showSecondPage) {
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.showThirdPage = true;
      }
    }
  }

  goBackPage(): void {
    if(this.showSecondPage) {
      this.showFirstPage = true;
      this.showSecondPage = false;
      this.showThirdPage = false;
    } else if (this.showThirdPage) {
      this.showFirstPage = false;
      this.showSecondPage = true;
      this.showThirdPage = false;
    }
  }

}

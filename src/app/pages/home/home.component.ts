import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LanguageService } from 'src/app/services/language-service/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private languageService: LanguageService) { }

  authenticated: boolean = false;
  loadPage: boolean = false;

  language: string = undefined;
  languageData: any = undefined;

  showLanguageSelector: boolean = false;

  ngOnInit(): void {
    this.checkToken();
    this.getLanguage();
    this.getLanguageData();
  }

  checkToken(): void {
    this.authService.checkToken().pipe(
      catchError((err: any) => {
        this.loadPage = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.authenticated = response.body.valid;
      if(this.authenticated) this.router.navigate(['/dashboard']);
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
    this.languageService.getLanguageData('home').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

}

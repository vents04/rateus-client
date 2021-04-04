import { HttpResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LanguageService } from 'src/app/services/language-service/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private languageService: LanguageService) { }

  error: boolean = false;
  errorMessage: string = null;

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  ngOnInit(): void {
    this.getLanguage();
    this.getLanguageData();
  }

  login(email: string, password: string): void {
    this.authService.login(email, password).pipe(
      catchError((err: any) => {
        this.error = true;
        this.errorMessage = err.error;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.router.navigate(['/dashboard']);
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
    this.languageService.getLanguageData('login').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

}

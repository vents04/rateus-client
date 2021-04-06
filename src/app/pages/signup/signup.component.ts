import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LanguageService } from 'src/app/services/language-service/language.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private languageService: LanguageService, private authService: AuthService, private router: Router) { }

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  showFirstPage: boolean = true;
  showSecondPage: boolean = false;
  showThirdPage: boolean = false;

  showSuccess: boolean = false;

  errorMessage: string = undefined;

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

  signup(name: string, email: string, phone: string, password: string): void {
    if(this.showThirdPage) {
      if (password.length >= 8) {
        this.authService.signup(name, email, phone, password).pipe(
          catchError((err: any) => {
            this.errorMessage = err.error;
            if(this.errorMessage == "An account with that email already exists!") {
              this.errorMessage = this.languageData.emailExistsError;
            } else if (this.errorMessage == "\"email\" must be a valid email") {
              this.errorMessage = this.languageData.emailInvalidError;
            }
            return throwError(err);
          })
        ).subscribe((response: HttpResponse<any>) => {
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000)
        })
      } else {
        this.errorMessage = this.languageData.passwordError;
      }
    } else {
      if(this.showFirstPage) {
        this.showFirstPage = false;
        this.showSecondPage = true;
        this.showThirdPage = false;
      } else if (this.showSecondPage) {
        if (password.length >= 8) {
          this.showFirstPage = false;
          this.showSecondPage = false;
          this.showThirdPage = true;
          this.errorMessage = null;
        } else {
          this.errorMessage = this.languageData.passwordError;
        }
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

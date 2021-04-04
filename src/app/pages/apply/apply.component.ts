import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private webRequestsService: WebRequestsService, private router: Router, private languageService: LanguageService) { }

  success: boolean = false;
  error: boolean = false;

  showLanguageSelector: boolean = false;
  language: string = undefined;
  languageData: any = undefined;

  ngOnInit(): void {
    this.getLanguage();
    this.getLanguageData();
  }

  apply(address: string, emailOrPhone: string): void {
    this.webRequestsService.apply(address, emailOrPhone).pipe(
      catchError((err: any) => {
        this.error = true;
        this.success = false;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.error = false;
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000)
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
    this.languageService.getLanguageData('apply').subscribe((response: HttpResponse<any>) => {
      this.languageData = response.body.languageData;
    })
  }

}

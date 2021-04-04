import { Injectable } from '@angular/core';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private webRequestsService: WebRequestsService) { }

  languages: Array<string> = ["BG", "EN"];

  setDefaultLanguage(): void {
    if(!localStorage.getItem('language') || !this.languages.includes(localStorage.getItem('language'))) {
      localStorage.setItem('language', 'BG');
    }
  }

  updateLanguage(language: string): void {
    if(this.languages.includes(language)) {
      localStorage.setItem('language', language);
    }
  }

  getLanguage(): string {
    return localStorage.getItem('language');
  }

  getLanguageData(page: string) {
    const language = this.getLanguage();
    return this.webRequestsService.getLanguageData(language, page);
  }
}

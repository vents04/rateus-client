import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

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
}

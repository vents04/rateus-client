import { Component } from '@angular/core';
import { LanguageService } from './services/language-service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.setDefaultLanguage();
  }
}

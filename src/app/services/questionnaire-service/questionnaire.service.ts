import { Injectable } from '@angular/core';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private webRequestsService: WebRequestsService) { }

  getQuestionnaire(id: string) {
    return this.webRequestsService.getQuestionnaire(id);
  }

  updateQuestionnaire(id: string, questions: any, title: string) {
    return this.webRequestsService.updateQuestionnaire(id, questions, title);
  }

  createQuestionnaire(title: string) {
    return this.webRequestsService.createQuestionnaire(title);
  }
}

import { Injectable } from '@angular/core';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private webRequestsService: WebRequestsService) { }

  createAnswer(answers: any, questionnaireId: string) {
    return this.webRequestsService.createAnswer(answers, questionnaireId);
  }

  getAnswers(questionnaireId: string) {
    return this.webRequestsService.getAnswers(questionnaireId);
  }
}

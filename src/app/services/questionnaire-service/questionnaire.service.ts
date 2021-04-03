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
}

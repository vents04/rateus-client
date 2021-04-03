import { Injectable } from '@angular/core';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private webRequestsService: WebRequestsService) { }

  getBusiness() {
    return this.webRequestsService.getBusiness();
  }

  getColor(id: string) {
    return this.webRequestsService.getColor(id);
  }
}

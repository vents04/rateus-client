import { Injectable } from '@angular/core';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private webRequestsService: WebRequestsService) { }

  getActiveSubscription() {
    return this.webRequestsService.getActiveSubscription();
  }
}

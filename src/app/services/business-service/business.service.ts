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

  getDashboard() {
    return this.webRequestsService.getDashboard();
  }

  updateColor(color: string) {
    return this.webRequestsService.updateColor(color);
  }

  checkIsActive(businessId: string) {
    return this.webRequestsService.checkBusinessActive(businessId);
  }

  updatePassword(currentPassword: string, newPassword: string) {
    return this.webRequestsService.updatePassword(currentPassword, newPassword);
  }
}

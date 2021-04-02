import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  constructor(private http: HttpClient) { }

  login(emailOrPhone: string, password: string) {
    return this.http.post(`${ROOT_URL}/business/login`, 
    { emailOrPhone: emailOrPhone, password: password }, 
    { observe: 'response', responseType: 'json' });
  }

  apply(address: string, emailOrPhone: string) {
    return this.http.post(`${ROOT_URL}/waitlist/`,
    { emailOrPhone: emailOrPhone, address: address },
    { observe: 'response', responseType: 'json'});
  }
}

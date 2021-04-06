import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${ROOT_URL}/business/login`, 
    { email: email, password: password }, 
    { observe: 'response', responseType: 'json' });
  }

  signup(name: string, email: string, phone: string, password: string) {
    return this.http.post(`${ROOT_URL}/business/signup`,
    { name: name, email: email, phone: phone, password: password },
    { observe: 'response', responseType: 'json' });
  }

  apply(address: string, emailOrPhone: string) {
    return this.http.post(`${ROOT_URL}/waitlist/`,
    { emailOrPhone: emailOrPhone, address: address },
    { observe: 'response', responseType: 'json' });
  }

  checkToken() {
    return this.http.post(`${ROOT_URL}/business/check-token`,
    {},
    { observe: 'response', responseType: 'json' });
  }

  getBusiness() {
    return this.http.get(`${ROOT_URL}/business`,
    { observe: 'response', responseType: 'json' });
  }

  getQuestionnaire(id: string) {
    return this.http.get(`${ROOT_URL}/questionnaire/${id}`,
    { observe: 'response', responseType: 'json' });
  }

  getColor(id: string) {
    return this.http.get(`${ROOT_URL}/business/${id}/color`,
    { observe: 'response', responseType: 'json' });
  }

  getDashboard() {
    return this.http.get(`${ROOT_URL}/business/dashboard`,
    { observe: 'response', responseType: 'json' });
  }

  updateColor(color: string) {
    return this.http.put(`${ROOT_URL}/business/color`,
    { color: color },
    { observe: 'response', responseType: 'json' });
  }

  updateQuestionnaire(id: string, questions: any, title: string) {
    return this.http.put(`${ROOT_URL}/questionnaire`,
    { _id: id, questions: questions, title: title },
    { observe: 'response', responseType: 'json' });
  }

  createAnswer(answers: any, questionnaireId: string) {
    return this.http.post(`${ROOT_URL}/answer`,
    { answers: answers, questionnaireId: questionnaireId },
    { observe: 'response', responseType: 'json' });
  }

  getAnswers(questionnaireId: string) {
    return this.http.get(`${ROOT_URL}/answer/by-questionnaire-id/${questionnaireId}`,
    { observe: 'response', responseType: 'json' });
  }

  getLanguageData(language: string, page: string) {
    return this.http.get(`${ROOT_URL}/language/${language}/${page}`,
    { observe: 'response', responseType: 'json' });
  }
}


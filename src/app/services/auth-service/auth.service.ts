import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { WebRequestsService } from '../web-requests-service/web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestsService) { }

  login(email: string, password: string){
    return this.webService.login(email, password).pipe(
      shareReplay(), tap((res: HttpResponse<any>) => {
        this.setSession(res.headers.get('x-auth-token'));
      })
    )
  }

  setSession(authToken: string){
    localStorage.setItem("x-auth-token", authToken);
  }

  getSession(){
    return localStorage.getItem('x-auth-token');
  }

  removeSession(){
    localStorage.removeItem("x-auth-token");
  }

}

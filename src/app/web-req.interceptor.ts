import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor  implements HttpInterceptor { 

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
    if(request.url.indexOf("/users/signup") < 0){  
      request = this.addAuthHeader(request);
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
    } else{
      return next.handle(request);
    }
  }

  addAuthHeader(request: HttpRequest<any>){
    const token = this.authService.getSession();
    if(token){
      return request.clone({
        setHeaders: {
          'x-auth-token': token
        }
      })
    }
    return request;
  }
}

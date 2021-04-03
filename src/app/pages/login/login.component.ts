import { HttpResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  error: boolean = false;
  errorMessage: string = null;

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
    this.authService.login(email, password).pipe(
      catchError((err: any) => {
        this.error = true;
        this.errorMessage = err.error;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.router.navigate(['/dashboard']);
    })
  }

}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  authenticated: boolean = false;
  loadPage: boolean = false;

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(): void {
    this.authService.checkToken().pipe(
      catchError((err: any) => {
        this.loadPage = true;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.authenticated = response.body.valid;
      if(!this.authenticated) this.router.navigate(['/']);
      this.loadPage = true;
    })
  }

}

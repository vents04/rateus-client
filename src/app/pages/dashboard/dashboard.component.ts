import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { BusinessService } from 'src/app/services/business-service/business.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private businessService: BusinessService, private router: Router) { }

  authenticated: boolean = false;
  loadPage: boolean = false;

  business: any = null;
  color: string = "#90d977";
  dashboard: any = null;

  showColorSelector : boolean = false;

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
      this.getBusiness();
    })
  }

  logOut(): void {
    this.authService.removeSession();
    this.router.navigate(['/']);
  }

  getBusiness(): void {
    this.businessService.getBusiness().pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.business = response.body.business;
      this.getColor();
      this.getDashboard();
    })
  }

  getColor(): void {
    this.businessService.getColor(this.business._id).subscribe((response: HttpResponse<any>) => {
      this.color = response.body.color;
    })
  }

  getDashboard(): void {
    this.businessService.getDashboard().subscribe((response: HttpResponse<any>) => {
      this.dashboard = response.body;
    })
  }

  updateColor(color: string): void {
    this.businessService.updateColor(color).subscribe((response: HttpResponse<any>) => {
      window.location.reload();
    })
  }

  redirectToQuestionnaire(id: string): void {
    this.router.navigate([`/edit-questionnaire/${id}`]);
  }
}

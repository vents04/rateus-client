import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private webRequestsService: WebRequestsService, private router: Router) { }

  success: boolean = false;
  error: boolean = false;

  ngOnInit(): void {

  }

  apply(address: string, emailOrPhone: string): void {
    this.webRequestsService.apply(address, emailOrPhone).pipe(
      catchError((err: any) => {
        this.error = true;
        this.success = false;
        return throwError(err);
      })
    ).subscribe((response: HttpResponse<any>) => {
      this.error = false;
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000)
    })
  }

}

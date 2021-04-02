import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private webRequestsService: WebRequestsService, private router: Router) { }

  success: boolean = false;

  ngOnInit(): void {

  }

  apply(address: string, emailOrPhone: string): void {
    /*
    this.webRequestsService.apply(address, emailOrPhone).subscribe((response: HttpResponse<any>) => {
      this.success = true;
    })
    */
   this.success = true;
   setTimeout(() => {
     this.router.navigate(['/']);
   }, 4000)
  }

}

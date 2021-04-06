import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire.component';
import { WebReqInterceptor } from './web-req.interceptor';
import { AnswerQuestionnaireComponent } from './pages/answer-questionnaire/answer-questionnaire.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplyComponent,
    EditQuestionnaireComponent,
    AnswerQuestionnaireComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

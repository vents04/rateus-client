import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuestionnaireComponent } from './pages/answer-questionnaire/answer-questionnaire.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SubscriptionResultComponent } from './pages/subscription-result/subscription-result.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'edit-questionnaire/:id', component: EditQuestionnaireComponent},
  {path: 'answer-questionnaire/:id', component: AnswerQuestionnaireComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'subscription-result', component: SubscriptionResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

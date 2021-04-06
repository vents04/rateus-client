import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuestionnaireComponent } from './pages/answer-questionnaire/answer-questionnaire.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'apply', component: ApplyComponent},
  {path: 'edit-questionnaire/:id', component: EditQuestionnaireComponent},
  {path: 'answer-questionnaire/:id', component: AnswerQuestionnaireComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuestionnaireComponent } from './pages/answer-questionnaire/answer-questionnaire.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'apply', component: ApplyComponent},
  {path: 'edit-questionnaire/:id', component: EditQuestionnaireComponent},
  {path: 'answer-questionnaire/:id', component: AnswerQuestionnaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

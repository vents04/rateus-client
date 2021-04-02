import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionnaireComponent } from './answer-questionnaire.component';

describe('AnswerQuestionnaireComponent', () => {
  let component: AnswerQuestionnaireComponent;
  let fixture: ComponentFixture<AnswerQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizindividComponent } from './quizindivid.component';

describe('QuizindividComponent', () => {
  let component: QuizindividComponent;
  let fixture: ComponentFixture<QuizindividComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizindividComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizindividComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

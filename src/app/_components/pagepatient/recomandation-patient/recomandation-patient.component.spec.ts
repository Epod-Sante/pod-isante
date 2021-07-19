import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomandationPatientComponent } from './recomandation-patient.component';

describe('RecomandationPatientComponent', () => {
  let component: RecomandationPatientComponent;
  let fixture: ComponentFixture<RecomandationPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomandationPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomandationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

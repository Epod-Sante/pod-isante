import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfosComponent } from './patient-infos.component';

describe('PatientInfosComponent', () => {
  let component: PatientInfosComponent;
  let fixture: ComponentFixture<PatientInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociodemoComponentPatient } from './sociodemo-component-patient.component';

describe('SociodemoComponent', () => {
  let component: SociodemoComponentPatient;
  let fixture: ComponentFixture<SociodemoComponentPatient>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociodemoComponentPatient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociodemoComponentPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

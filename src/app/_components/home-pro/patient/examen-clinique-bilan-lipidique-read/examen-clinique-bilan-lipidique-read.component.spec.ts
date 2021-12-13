import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenCliniqueBilanLipidiqueReadComponent } from './examen-clinique-bilan-lipidique-read.component';

describe('ExamenCliniqueBilanLipidiqueReadComponent', () => {
  let component: ExamenCliniqueBilanLipidiqueReadComponent;
  let fixture: ComponentFixture<ExamenCliniqueBilanLipidiqueReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenCliniqueBilanLipidiqueReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenCliniqueBilanLipidiqueReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

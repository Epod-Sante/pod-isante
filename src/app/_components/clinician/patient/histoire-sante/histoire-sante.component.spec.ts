import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoireSanteComponent } from './histoire-sante.component';

describe('HistoireSanteComponent', () => {
  let component: HistoireSanteComponent;
  let fixture: ComponentFixture<HistoireSanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoireSanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoireSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

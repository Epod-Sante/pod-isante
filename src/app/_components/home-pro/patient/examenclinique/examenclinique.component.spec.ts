import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamencliniqueComponent } from './examenclinique.component';

describe('ExamencliniqueComponent', () => {
  let component: ExamencliniqueComponent;
  let fixture: ComponentFixture<ExamencliniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamencliniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamencliniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

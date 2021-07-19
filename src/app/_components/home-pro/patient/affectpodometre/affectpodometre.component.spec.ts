import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectpodometreComponent } from './affectpodometre.component';

describe('AffectpodometreComponent', () => {
  let component: AffectpodometreComponent;
  let fixture: ComponentFixture<AffectpodometreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectpodometreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectpodometreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

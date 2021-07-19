import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedantsComponent } from './antecedants.component';

describe('AntecedantsComponent', () => {
  let component: AntecedantsComponent;
  let fixture: ComponentFixture<AntecedantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanLipidiqueComponent } from './bilan-lipidique.component';

describe('BilanLipidiqueComponent', () => {
  let component: BilanLipidiqueComponent;
  let fixture: ComponentFixture<BilanLipidiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilanLipidiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanLipidiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociodemoComponent } from './sociodemo.component';

describe('SociodemoComponent', () => {
  let component: SociodemoComponent;
  let fixture: ComponentFixture<SociodemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociodemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociodemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

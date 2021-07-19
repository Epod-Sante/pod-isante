import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaqComponent } from './gpaq.component';

describe('GpaqComponent', () => {
  let component: GpaqComponent;
  let fixture: ComponentFixture<GpaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

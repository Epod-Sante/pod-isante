import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommmComponent } from './recommm.component';

describe('RecommmComponent', () => {
  let component: RecommmComponent;
  let fixture: ComponentFixture<RecommmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

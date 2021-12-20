import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomandationComponent } from './recomandation.component';

describe('RecomandationComponent', () => {
  let component: RecomandationComponent;
  let fixture: ComponentFixture<RecomandationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomandationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

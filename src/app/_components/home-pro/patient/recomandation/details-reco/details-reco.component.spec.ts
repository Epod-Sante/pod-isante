import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecoComponent } from './details-reco.component';

describe('DetailsRecoComponent', () => {
  let component: DetailsRecoComponent;
  let fixture: ComponentFixture<DetailsRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

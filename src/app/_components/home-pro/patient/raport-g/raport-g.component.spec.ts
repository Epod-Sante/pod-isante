import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportGComponent } from './raport-g.component';

describe('RaportGComponent', () => {
  let component: RaportGComponent;
  let fixture: ComponentFixture<RaportGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

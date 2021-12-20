import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifV2Component } from './objectif-v2.component';

describe('ObjectifV2Component', () => {
  let component: ObjectifV2Component;
  let fixture: ComponentFixture<ObjectifV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifReadComponent } from './objectif-read.component';

describe('ObjectifReadComponent', () => {
  let component: ObjectifReadComponent;
  let fixture: ComponentFixture<ObjectifReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectifReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

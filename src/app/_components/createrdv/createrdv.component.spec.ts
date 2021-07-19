import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterdvComponent } from './createrdv.component';

describe('CreaterdvComponent', () => {
  let component: CreaterdvComponent;
  let fixture: ComponentFixture<CreaterdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
